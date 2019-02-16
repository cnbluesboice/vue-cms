<template>
  <div class="goods-info-container">
    <!-- 卡片视图区 -->
    <!-- 轮播图区域 -->
    <div class="mui-card">
      <!--内容区-->
      <div class="mui-card-content">
        <mt-swipe  :auto="4000">
          <mt-swipe-item v-for="(item) in goodsPic" :key="item.src">
              <img :src="item.src" alt="">
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>

    <div class="mui-card">
      <!--页眉，放置标题-->
      <div class="mui-card-header">{{ goodsInfo.title }}</div>
      <!--内容区-->
      <div class="mui-card-content">
        <p class="price">
          市场价：
          <del>￥{{ goodsInfo.market_price }}</del>
          销售价：
          <span class="sell_price">￥{{ goodsInfo.sell_price }}</span>
        </p>
        <p class="bugCount">购买数量：</p>
        <p class="buttons">
          <mt-button type="primary" size="small">立即购买</mt-button>
          <mt-button type="danger" size="small">加入购物车</mt-button>
        </p>
      </div>
    </div>

    <div class="mui-card">
      <!--页眉，放置标题-->
      <div class="mui-card-header">
        <span class="title">产品参数</span>
      </div>
      <!--内容区-->
      <div class="mui-card-content">
        <p>商品货号：{{ goodsInfo.goods_no }}</p>
        <p>库存情况：{{ goodsInfo.stock_quantity }}件</p>
        <p>上架时间：{{ goodsInfo.add_time | dateFormat }}</p>
      </div>
      <!--页脚，放置补充信息或支持的操作-->
      <div class="mui-card-footer">
        <div>
          <mt-button type="primary" size="large" plain @click="goGoodsIntro(goodsInfo.id)">图文介绍</mt-button>
        </div>
        <div>
          <mt-button type="danger" size="large" plain @click="goGoodsComments(goodsInfo.id)">商品评论</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      goodsInfo: {},
      goodsPic:[]
    };
  },
  created() {
    this.getGoodsInfo()
    this.getGoodsSwipe()
  },
  methods: {
    getGoodsSwipe() {
        this.$http.get("api/getthumimages/"+this.id).then(result=>{
            console.log(result)
            this.goodsPic=result.body.message;
        })
    },
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        console.log(result);
        this.goodsInfo = result.body.message[0];
      });
    },
    // 点击利用编程式导航跳转到图文详情页面
    goGoodsIntro(id){
        this.$router.push("/home/goodsIntro/"+id)
    },
    // 点击进入商品评论组件
    goGoodsComments(id){
        this.$router.push("/home/goodsComments/"+id)
    }
  }
};
</script>
<style lang="scss" scoped>
.mui-card-content {
  padding: 15px;
  .sell_price {
    color: red;
    font-weight: bold;
    font-size: 16px;
  }
  .mui-card-header {
    .title {
      font-size: 18px;
    }
  }
  .mint-swipe{
      height: 200px;
      img{
          width: 100%;
      }
  }
}
</style>
