<template>
  <div class="home-container">
    <!-- 轮播图部分 -->
    <div class="banner">
      <mt-swipe :auto="2000">
        <mt-swipe-item v-for="item in bannerList" :key="item.img">
          <router-link :to="item.url">
            <img :src="item.img">
          </router-link>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 九宫格部分 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img src="@/assets/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="@/assets/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="@/assets/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="@/assets/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="@/assets/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="@/assets/menu5.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bannerList: []
    };
  },
  created() {
    this.getBanner();
  },
  methods: {
    getBanner() {
      this.$http.get("api/getlunbo").then(result => {
        if (result.body.status == 0) {
          this.bannerList = result.body.message;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.home-container {
  .banner {
    height: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .mui-table-view{
      img{
          width: 60%;
      }
  }
  .mui-grid-view.mui-grid-9{
      background-color: #fff;
  }
}
</style>
