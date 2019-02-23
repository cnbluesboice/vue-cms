<template>
  <div class="shopcar-container">
    <div class="mui-card" v-for="(item) in shopCarList" :key="item.id">
      <!--内容区-->
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
  <!-- 按钮开关 -->
        <mt-switch 
        :value="$store.getters.goodsSelected[item.id]" 
        @change="changeSelectStatus(item.id,$store.getters.goodsSelected[item.id])"
        ></mt-switch>
        <!-- 图片 -->
        <div class="pic">
          <img :src="item.thumb_path" alt>
        </div>
        <!-- 商品信息 -->
        <div class="goodsInfo">
          <p class="title">{{item.title}}</p>
          <div class="info">
            <div class="price">￥{{item.sell_price}}</div>
            <div class="count">
              <input type="button" value="-" @click="reduce(item.id)">
              <input type="text" v-model="goodsCount[item.id]">
              <input type="button" value="+" @click="increase(item.id)">
            </div>
            <div class="del" @click="remove(item.id,index)">删除</div>
          </div>
        </div>
        </div>
      
      </div>
    </div>

    <!-- 价格卡片 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span class="red">{{ $store.getters.allGoodsCountAndAmount.allCounts }}</span> 件， 
              总价<span class="red">￥{{ $store.getters.allGoodsCountAndAmount.amount }}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return {
          goodsCount:this.$store.getters.goodsCount,
          shopCarList: []
        }
    },
    created(){
        this.getShopCarList()
    },
    methods:{
        getShopCarList(){
            let idArr=[]
            // console.log(this.$store.state.car)
            this.$store.state.car.forEach(item=>{
                idArr.push(item.id)
            })
            if(idArr.length<=0) return
            this.$http.get("api/goods/getshopcarlist/"+idArr.join(",")).then(result=>{
                console.log(result)
                this.shopCarList=result.body.message
            })
        },
        // 减少数量 将当前的商品的id和数量传到vuex的updateCount方法中
        reduce(id){
          // 这里的this.goodsCount是一个对象，以id的值为键，商品数量为值
          // 易错点：this.goodsCount[id] this.goodsCount是一个对象，只有this.goodsCount[id]才是我们要修改的商品数量值
          this.goodsCount[id]>1 && this.goodsCount[id]--
          this.$store.commit("updateCount",{'id':id,'count':this.goodsCount[id]})
        },
        // 增加与减少相同
        increase(id){
          // console.log(id)
          // console.log(this.goodsCount[id])
          // 一般要结合库存做判断，这里接口没有返回库存
          this.goodsCount[id]++
          this.$store.commit("updateCount",{id,count:this.goodsCount[id]})
        },
        // 删除商品
        remove(id,i){
          this.shopCarList.splice(i,1)
          this.$store.commit("removeGoods",id)
        },
        // 改变勾选状态
        changeSelectStatus(id,selected){
          console.log("我被触发了")
          this.$store.commit("updateSelected",{id,selected})
        }
        
    }
};
</script>
<style lang="scss" scoped>
.shopcar-container {
    background-color: #eee;
    .mui-card{
        margin: 15px;
    }
  .mui-card-content-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding: 10px;
    background-color: #fff;
    .pic {
      img {
        width: 60px;
      }
    }
    .info {
        display: flex;
        justify-content: space-around;
        align-items: center;
      .price {
          color: red;
          font-size: 16px;
          font-weight: bold;
      }
      .count{
          input{
              padding: 0;
              margin: 0;
              width: 30px;
              height: 30px;
              text-align: center;
          }
      }
      .del{
          color: red;
      }
    }
    
  }
  .jiesuan {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .red {
        color: red;
        font-weight: bold;
        font-size: 16px;
      }
      .left{
        margin-right: 10px;
      }
    }
}
</style>