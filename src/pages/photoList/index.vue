<template>
  <div>
    <!-- 头部tab -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',{'mui-active':item.id==0}]"
            v-for="item in categories"
            :key="item.id"
            @click="getPhotoList(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <!-- 懒加载 -->
    <ul class="photo-list">
      <router-link tag="li" v-for="item in photoList" :key="item.id" :to="'/home/photoInfo/'+item.id">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body" v-html="item.zhaiyao"></div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import mui from "@/libs/mui/js/mui.min.js";
export default {
  data() {
    return {
      categories: [],
      photoList: []
    };
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  created() {
    this.getCategories();
    this.getPhotoList(0);
  },
  methods: {
    getCategories() {
      this.$http.get("getimgcategory").then(result => {
        this.categories = result.body.message;
        this.categories.unshift({
          id: 0,
          title: "全部"
        });
      });
    },
    getPhotoList(cateId) {
      this.$http.get("getimages/" + cateId).then(result => {
        if (result.body.status == 0) {
          this.photoList = result.body.message;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
* {
  touch-action: pan-x;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
      background-color: #ccc;
      text-align: center;
      margin-bottom: 10px;
      box-shadow: 0 0 10px #999;
      position: relative;
    img {
      width: 100%;
      display: block;
    }
    img[lazy="loading"] {
    width: 40px;
    height: 300px;
    margin: auto;
  }
  .info{
      color: #fff;
      max-height: 80px;
      position: absolute;
      bottom: 0;
      text-align: left;
      background-color:rgba(0 ,0 ,0 ,0.4);
      overflow: hidden;
      .info-title{
          font-size: 14px;
      }
      .info-body{
          font-size:12px;
          color:rgb(212, 206, 206);
      }
  }
  }
}
</style>
