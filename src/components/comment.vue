<template>
  <div class="comment-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入你要瞎逼逼的(最多逼120字)" maxlength="120" v-model="content"></textarea>
    <mt-button size="large" type="primary" @click="addComment">发表评论</mt-button>

    <!-- 评论列表 -->
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time+Math.ceil(Math.random()*10000000000000000)">
        <div
          class="cmt-title"
        >第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}</div>
        <div class="cmt-body">{{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}</div>
      </div>
    </div>

    <mt-button size="large" type="danger" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
            pageIndex:1,
            comments:[],
            content:''
        }
    },
    created(){
        this.getcomments()
    },
    methods:{
        getcomments(){
            this.$http.get('getcomments/'+this.id+"?pageindex="+this.pageIndex).then(result=>{
                this.comments=this.comments.concat(result.body.message)
            })
        },
        //加载更多
        getMore(){
            this.pageIndex++;
            this.getcomments()
        },
        // 添加评论
        addComment(){
            if(this.content.trim().length===0) return Toast("评论内容不能为空")
             this.$http.post("postcomment/"+this.id,{
                content:this.content 
             }).then(result=>{
                if(result.body.status==0){
                    // this.getcomments()
                    let cmt={
                        user_name:"匿名用户",
                        add_time:Date.now(),
                        content:this.content.trim()
                    }
                    this.comments.unshift(cmt)

                    this.content=''
                   
                }
            })
        }
    },
    // 父组件向子组件传值
    props:["id"]
};
</script>

<style lang="less" scoped>
    .comment-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
