<template>
  <div class="news-list-container">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newsInfo/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
              <h1 class="title">{{item.title}}</h1>
            <p class="mui-ellipsis">
                <span>发表时间：{{ item.add_time | dateFormat }}</span>
                <span>点击：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
    data(){
        return {
            newsList:[]
        }
    },
    created(){
        this.getNewsList()
    },
    methods:{
        getNewsList(){
            this.$http.get("api/getnewslist").then(result=>{
                console.log(result)
                this.newsList=result.body.message
            })
        }
    }
};
</script>
<style lang="scss" scoped>
.mui-media-body{
    .title{
        font-size: 14px;
    }
    .mui-ellipsis{
        display: flex;
        justify-content: space-between;
        color: #226aff;
        font-size: 13px;
    }
}
</style>