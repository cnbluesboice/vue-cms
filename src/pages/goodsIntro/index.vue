<template>
<div class="goods-info-intro">
    <h1>{{goodsIntro.title}}</h1>
    <div class="content" v-html="goodsIntro.content"></div>
</div>
</template>
<script>
export default {
    data(){
        return {
            id: this.$route.params.id,
            goodsIntro:{}
        }
    },
    created(){
        this.getIntro()
    },
    methods:{
        getIntro(){
            this.$http.get("api/goods/getdesc/"+this.id).then(result=>{
                console.log(result)
                this.goodsIntro=result.body.message[0]
            })
        }
    }
}
</script>
<style lang="scss">
.goods-info-intro{
    h1{
        font-size: 16px;
        color: #22adff;
        text-align: center;
        padding: 15px 0;
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>
