<template>
  <div class="goods-container">
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
    <mt-button type="danger" size="large" @click="getMore" v-show="flag">加载更多</mt-button>
  </div>
</template>
<script>
// 引入mint-ui的Toast提示
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      number: 1,
      goodsList: [],
      flag:true
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      this.$http.get("api/getgoods?pageindex=" + this.number).then(result => {
        // console.log(result);
        if(result.body.message.length===0){
            this.flag=false
            return Toast("没有更多数据了")
        }
        this.goodsList = this.goodsList.concat(result.body.message);
      });
    },
    getMore(){
        this.number++
        this.getGoodsList()
    },
    goGoodsInfo(id){
      this.$router.push("/home/goodsInfo/"+id)
    }
  }
};
</script>
<style lang="scss" scoped>
.goods-container {
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
    .now_price{
        color: red;
        font-weight: bold;
        font-size: 16px;
    }
    .old_price{
        text-decoration: line-through;
        margin-left: 10px;
    }
    .extra{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
  }
}
</style>