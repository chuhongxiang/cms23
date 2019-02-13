<template>
  <div class="newsInfo-container">
    <h3 class="title">{{ newsInfo.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{ newsInfo.add_time | dateFormat }}</span>
      <span>点击：{{ newsInfo.click }}次</span>
    </p>

    <hr>

    <!-- 内容区域 -->
    <div class="content" v-html="newsInfo.content"></div>

    <!-- 评论区 -->
    <comment :id="id"></comment>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsInfo:{},
      id: this.$route.params.id
    };
  },
  created() {
    this.getnewsInfo();
  },
  methods: {
    getnewsInfo() {
      this.$http.get("getnew/" + this.id).then(result => {
        this.newsInfo = result.body.message[0];
      });
    }
  }
};
</script>

<style lang="less">
    .newsInfo-container{
        padding: 0 5px;
        .title{
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
            color: red;
        }
        .subtitle{
            color: #226aff;
            display:flex;
            justify-content: space-between;
        }
        .content{
            img{
                width: 100%;
            }
        }
    }
</style>

