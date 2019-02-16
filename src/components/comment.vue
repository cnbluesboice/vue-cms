<template>
    <div class="comment-container">
        <h1>发表评论</h1>
        <hr>
        <textarea placeholder="请输入评论内容(最多120字)" maxlength="120" v-model="postContent"></textarea>
        <mt-button type="primary" size="large" @click="postComments">提交评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in commentList" :key="i">
                <div class="cmt-title">第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}</div>
                <p class="time"></p>
                <div class="cmt-body">{{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}</div>
            </div>
        </div>
        <div class="loadMore">
            <mt-button type="default" size="large" @click="getMoreComments">加载更多</mt-button>
        </div>
    </div>
</template>
<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return {
            pageindex:1,
            commentList:[],
            postContent:""
        }
    },
    created(){
        this.getComments(this.pageindex)
    },
    methods:{
        getComments(){
            this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageindex).then(result=>{
                // console.log(result)
                // this.commentList=result.body.message
                this.commentList=this.commentList.concat(result.body.message)
            })
        },
        // 加载更多
        getMoreComments(){
            this.pageindex++
            this.getComments()
        },
        // 提交评论
        postComments(){
            if(this.postContent.trim()=="") return Toast("请输入评论内容！")
            this.$http.post("api/postcomment/"+this.id,{"content": this.postContent.trim()})
            .then(result=>{
                this.commentList.unshift({"user_name":"匿名用户","add_time":Date.now(),"content":this.postContent.trim()})
                this.postContent=""
            })
        }
    },
    // 父组件传过来的id
    props:["id"]
}
</script>
<style lang="scss" scoped>
    .comment-container{
        h1{
            font-size:16px;
        }
        textarea{
            height: 100px;
            font-size: 14px;
            margin: 0;
        }
        .cmt-list{
            margin-top: 10px;
        }
        .cmt-item{
            margin-bottom:10px;
            .cmt-title{
                font-size: 14px;
                background-color: #ccc;
            }
        }
        .cmt-body{
            font-size: 13px;
            margin: 0;

        }
        .loadMore{
            text-align: center;
            margin-bottom: 10px;
        }
    }
</style>