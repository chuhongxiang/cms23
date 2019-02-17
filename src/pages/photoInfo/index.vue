<template>
  <div class="newsinfo-container">
    <h3 class="title">{{getphotoInfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{getphotoInfo.add_time | dateFormat}}</span>
      <span>点击:{{getphotoInfo.click}}次</span>
    </p>

    <hr>


    <!-- 缩略图 -->
    <div class="thumbs">
      <img
        class="preview-img"
        v-for="(item, index) in list"
        :key="index"
        :src="item.src"
        height="100"
        @click="$preview.open(index, list)"
      >
    </div>

    <div class="content" v-html="getphotoInfo.content"></div>

    <!-- 评论 -->
    <comment :id="id"></comment>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      getphotoInfo: [],
      list:[]
    };
  },
  created() {
    this.getNewsInfo();
    this.getThumbs()
  },
  methods: {
    getNewsInfo() {
      this.$http.get("getnew/" + this.id).then(result => {
        this.getphotoInfo = result.body.message[0];
      });
    },
    getThumbs(){
        this.$http.get("getthumimages/" + this.id).then(result=>{
            result.body.message.forEach(item=>{
                item.w=600;
                item.h=400;
            })
            this.list= result.body.message;
        })
    }
  }
};
</script>

<style lang="less" scoped>
.newsinfo-container {
  padding: 0 5px;
  .title {
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
    color: #226aff;
  }
  .subtitle {
    font-size: 13px;
    display: flex;
    justify-content: space-between;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  .thumbs{
      img{
          width: 49%;
          margin:1px;
          box-shadow: 0 0 8px #999;
      }
  }
}
</style>


