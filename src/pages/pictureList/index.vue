<template>
  <div class="pic-container">
      <!-- scroll 部分 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item', {'mui-active':item.id===0}]" v-for="(item) in categories" :key="item.id" @click="getPicList(item.id)">{{item.title}}</a>
        </div>
      </div>
    </div>
    <!-- 列表图片懒加载部分 -->
    <ul class="picList">
        <router-link :to="'/home/picDetail/'+item.id" v-for="item in picList" :key="item.id" tag="li">
            <img v-lazy="item.img_url" >
            <div class="desc">
                <div class="title">{{item.title}}</div>
                <div class="content">{{item.zhaiyao}}</div>
            </div>
        </router-link>
    </ul>
  </div>
</template>
<script>
// 使用mui的滑动组件，有几个注意事项
// 1.初始化scroll控件要在页面渲染完毕后
// 2.使用此控件之后底部tabbar点击之后页面无法跳转，更改tabbar中的.mui-tab-item类名就可以解决


// 使用mui的懒加载时，必须在main.js中使用全局引入mui，不能使用按需引入，不然会报错
import mui from "@/../lib/mui/js/mui.js"
export default {
    data(){
        return {
            categories:[],
            picList:[],
            cateId:""
        }
    },
    created(){
        this.getCategories()
        this.getPicList(0)
    },
    mounted(){
        // 在页面DOM渲染完成后初始化 scroll控件
        mui('.mui-scroll-wrapper').scroll({
	        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods:{
        getCategories(){
            this.$http.get("api/getimgcategory").then(result=>{
                // console.log(result)
                this.categories=result.body.message
                this.categories.unshift({id:0,title:"全部"})
            })
        },
        getPicList(cateId){
            this.$http.get("api/getimages/"+cateId).then(result=>{
                console.log(result)
                this.picList=result.body.message
            })
        }
    }
};
</script>
<style lang="scss">
    *{
        touch-action:pan-y
    }
    .pic-container{
        .picList{
            padding:5px; 
            list-style: none;
            margin: 0;
            li{
                padding: 5px 0;
                position: relative;
                img{
                    width:100%;
                    display: block;
                }

                .desc{
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    padding: 5px;
                    color: #fff;
                    background-color:rgba(0,0,0,.4);
                    .title{
                        font-size: 14px;
                    }
                    .content{
                        font-size: 13px;
                    }
                }
            }
            
        }
  }  
</style>