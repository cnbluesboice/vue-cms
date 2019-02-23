<template>
    <!-- scroller是上拉加载下拉刷新组件 -->
    <scroller 
    ref="scroller"
    :on-refresh="refresh" 
    :on-infinite="infinite"
    :refreshText="'拉一下试试看'"
    :noDataText="'没有更多数据了'"
    :refreshLayerColor="'#0094ff'"
    :loadingLayerColor="'#0094ff'"
    >
      <!-- content goes here -->
      <ul class="goods-box">
        <li v-for="item in goodsList" :key="item.id" @click="goGoodsInfo(item.id)">
          <img :src="item.img_url" alt>
          <p class="title">{{ item.title }}</p>
          <div class="bottom">
            <p class="subtitle">
              <span class="now_price">￥{{ item.sell_price }}</span>
              <span class="old_price">￥{{ item.market_price }}</span>
            </p>
            <p class="extra">
              <span>热卖中</span>
              <span>剩余{{ item.stock_quantity }}件</span>
            </p>
          </div>
        </li>
      </ul>
    </scroller>
    <!-- <mt-button type="danger" size="large" @click="getMore" v-show="flag">加载更多</mt-button> -->
  
</template>
<script>
// 引入mint-ui的Toast提示
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      pageIndex: 1,
      goodsList: [],
      flag: true
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList(refesh) {
      return this.$http.get("api/getgoods?pageindex=" + this.pageIndex).then(result => {
        // console.log(result);
        // if (result.body.message.length === 0) {
        //   this.flag = false;
        //   return Toast("没有更多数据了");
        // }
        // 如果是刷新就只显示一页的数据
        if(refesh){
          this.goodsList=result.body.message
        }else{
          // 如果不是就拼接数据
          this.goodsList = this.goodsList.concat(result.body.message);
        }
      });
    },
    // getMore() {
    //   this.pageIndex++;
    //   this.getGoodsList();
    // },
    goGoodsInfo(id) {
      this.$router.push("/home/goodsInfo/" + id);
    },
    // 下拉刷新
    refresh(){
      this.pageIndex=1
      setTimeout(()=>{
        this.getGoodsList(true).then(()=>this.$refs.scroller.finishPullToRefresh())
      },1500)
    },
    // 上拉加载
    infinite(){
      setTimeout(()=>{
        this.pageIndex++
        // this.goodsList.length===15这里是由于后台没有返回总库存，所以用假数据15，一般后台会返回总数
        this.getGoodsList().then(()=>this.$refs.scroller.finishInfinite(this.goodsList.length===15))
        
      },1500)
    }
  }
};
</script>
<style lang="scss">
  ._v-container{
    overflow: hidden;
    padding-top: 40px;
    padding-bottom: 50px;
    
  }
  ._v-container>._v-content>.loading-layer{
      height: 90px !important;
    }
  .goods-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 8px;
    margin: 0;
  }
  li {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 4px;
    width: 49%;
    list-style: none;
    box-shadow: 0 0 2px 2px #ddd;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
      font-weight: bold;
      color: #333;
    }
    .now_price {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
    .old_price {
      text-decoration: line-through;
      margin-left: 10px;
    }
    .extra {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
    }
  }
</style>