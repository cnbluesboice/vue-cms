<template>
    <div class="pic-detail-container">
        <h3>{{picDetail.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{picDetail.add_time | dateFormat}}</span>
            <span>点击：{{picDetail.click}}次</span>
        </p>

        <hr>

        <!-- 缩略图区域 -->
        <div class="thumbs">
            <img class="preview-img" v-for="(item, index) in thumbsList" :key="item.index" :src="item.src" height="100" @click="$preview.open(index, thumbsList)">
        </div>

        <div class="content" v-html="picDetail.content"></div>

        <!-- 发表评论组件 -->
        <comment :id='id'></comment>
    </div>
</template>
<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            picDetail:{},
            thumbsList:[]
        }
    },
    created(){
        this.getPicDetail()
        this.getThumbs()
    },
    methods:{
        // 获得图片详情
        getPicDetail(){
            this.$http.get("api/getimageInfo/"+this.id).then(result=>{
                console.log(result)
                this.picDetail=result.body.message[0]
            })
        },
        // 获得缩略图
        getThumbs(){
            this.$http.get("api/getthumimages/"+this.id).then(result=>{
                console.log(result)
                this.thumbsList=result.body.message
            })
        }
    }
}
</script>
<style lang="scss">
.pic-detail-container{
    padding: 0 5px;
    h3{
        font-size: 15px;
        text-align: center;
        color: #22adff;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
    }
    .content{
        font-size: 14px;
        line-height: 25px;
    }
}
</style>
