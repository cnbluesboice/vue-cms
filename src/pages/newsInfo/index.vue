<template>
    <div class="news-info-container">
        <h1 class="title">{{ newsInfo.title }}</h1>
        <p class="subtitle">
            <span>发表时间：{{ newsInfo.add_time }}</span>
            <span>点击：{{ newsInfo.click }}</span>
        </p>

        <hr>

        <div v-html="newsInfo.content"></div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            id: this.$route.params.id,
            newsInfo:{}
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            this.$http.get("api/getnew/"+this.id).then(result=>{
                // console.log(result)
                this.newsInfo=result.body.message[0]
            })
        }
    }
}
</script>
<style lang="scss">
.news-info-container{
    padding: 0 5px;
    .title{
        font-size: 16px;
        text-align: center;
        padding: 5px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        color:#22adff;
    }
}
    
</style>
