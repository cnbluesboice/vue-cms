<template>
  <div class="goods-info-container">

    <!-- 卡片视图区 -->
    <!-- 轮播图区域 -->
    <div class="mui-card">
      <!--内容区-->
      <div class="mui-card-content">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item) in goodsPic" :key="item.src">
            <img :src="item.src" alt>
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
        <p class="bugCount">
          购买数量：
          <input type="button" value="-" @click="count>=2 && count--">
          <input type="text" v-model="count">
          <input type="button" value="+" @click="count<goodsInfo.stock_quantity && count++">
        </p>
        <p class="buttons">
          <mt-button type="primary" size="small">立即购买</mt-button>
          <mt-button type="danger" size="small" @click="addGoods">加入购物车</mt-button>
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

    <!-- 小球 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="flag" ref="ball"></div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      goodsInfo: {},
      goodsPic: [],
      count: 1,
      flag: false
    };
  },
  created() {
    this.getGoodsInfo();
    this.getGoodsSwipe();
  },
  methods: {
    //   半程动画钩子
    beforeEnter(el) {
        // 动画进入时从原来的位置进入，没有任何偏移
        el.style.transform="translate(0,0)"
    },
    enter(el, done) {
        // 必须要加此行代码，动画才会执行，原因不明
        el.offsetWidth
        // console.log(this)
        // 获取小球在页面的位置
        // getBoundingClientRect()方法返回一个矩形对象，
        // top,bottom,left,right四个属性的值是该元素距离页面边缘的距离
        // 这里要使用$refs.ball来操作dom，必须在ball盒子上面加上ref="ball"
        const ballPosition=this.$refs.ball.getBoundingClientRect();
        // console.log(ballPosition)
        const badgePosition=document.getElementById("badge").getBoundingClientRect();
        // console.log(badgePosition)
        const distanceX=badgePosition.left-ballPosition.left
        const distanceY=badgePosition.top-ballPosition.top
        // console.log(distanceX,"X")
        // console.log(distanceY,"Y")
        el.style.transform=`translate(${distanceX}px,${distanceY}px)`
        el.style.transition="all .5s cubic-bezier(.4,-0.3,1,.68)"

        done()
    },
    afterEnter(el) {
        this.flag=!this.flag
    },
    getGoodsSwipe() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        // console.log(result);
        this.goodsPic = result.body.message;
      });
    },
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        // console.log(result);
        this.goodsInfo = result.body.message[0];
      });
    },
    // 点击利用编程式导航跳转到图文详情页面
    goGoodsIntro(id) {
      this.$router.push("/home/goodsIntro/" + id);
    },
    // 点击进入商品评论组件
    goGoodsComments(id) {
      this.$router.push("/home/goodsComments/" + id);
    },
    // 点击加入购物车小球动画和商品添加到购物车
    addGoods(){
        this.flag=!this.flag
        // 调用Vuex中mutations中的addTocar方法
        // 第一个参数是方法名，第二个参数是出入的商品信息，多个信息包装成对象
        this.$store.commit("addToCar",{
          id:this.id,
          count:this.count,
          price:this.goodsInfo.sell_price,
          selected: true
        })

    }
  }
};
</script>
<style lang="scss" scoped>
.goods-info-container {
  position: relative;
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
    .mint-swipe {
      height: 200px;
      img {
        width: 100%;
      }
    }
    .bugCount {
      input {
        width: 35px;
        height: 35px;
        text-align: center;
        padding: 0;
        margin: 0;
        font-size: 14px;
      }
    }
  }
  .ball {
      position: absolute;
      width: 15px;
      height: 15px;
      background-color: red;
      border-radius: 50%;
      left: 148px;
      top: 358px;
      z-index: 999;
    }
}
</style>
