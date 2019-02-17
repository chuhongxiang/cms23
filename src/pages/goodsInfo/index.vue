<template>
  <div class="goodsinfo-container">
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
        <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    
    
    <div class="bobble"></div>
    <!-- 头部轮播图 -->
    <div class="mui-card image">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in photograph" :key="index">
          <a :href="item.url">
            <img :src="item.img||item.src">
          </a>
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <!-- 加入购物车 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsInfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
              市场价:&nbsp;&nbsp;<del>￥{{goodsInfo.market_price}}</del>
              销售价:&nbsp;&nbsp;<span class="now_price">￥{{ goodsInfo.sell_price}}</span>
          </p>
          <div class="amount">
              <span class="title">购买数量：</span>
              <input type="button" value="-" @click="buyCount>=2&&buyCount--" :disabled="buyCount == 1">
              <input type="text" v-model="buyCount" @change="change">
              <input type="button" value="+" @click="buyCount<goodsInfo.stock_quantity&&buyCount++" :disabled="buyCount == goodsInfo.stock_quantity">
          </div>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品详情 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:&nbsp;{{goodsInfo.goods_no }}</p>
          <p>库存情况:&nbsp;{{goodsInfo.stock_quantity}}件</p>
          <p>上架时间:&nbsp;{{goodsInfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
       <mt-button type="primary" size="large" plain @click="intro(id)">图文介绍</mt-button>
       <mt-button type="danger" size="large" plain @click="goodsComment(id)">商品评论</mt-button>
      </div>
      </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            id:this.$route.params.id,
            //图片
            photograph:[],
            //商品详情
            goodsInfo:[],
            //购买数量
            buyCount: 1,
            //小球显示隐藏
            ballFlag:false
        }
    },
    created(){
        this.getphoto()
        this.getgoodsInfo()
    },
    methods:{
        // 获取轮播图
        getphoto(){
            this.$http.get('getthumimages/'+this.id).then(result=>{
                this.photograph=result.body.message
            })
        },
        //获取商品详情信息
        getgoodsInfo(){
            this.$http.get('goods/getinfo/'+this.id).then(result=>{
                this.goodsInfo=result.body.message[0]
            })
        },
        //输入框变化
        change(){
            if (this.buyCount > this.goodsInfo.stock_quantity) {
        this.buyCount = this.goodsInfo.stock_quantity;
      }
        },
    //点击图文介绍
    intro(id){
        this.$router.push('/home/goodsDesc/'+id)
    },
    //商品评论
    goodsComment(id){
         this.$router.push("/home/goodsComment/" + id);
    },
    //小球显示隐藏
    addToShopCar(){
      this.ballFlag = !this.ballFlag;
    },
    //小球动画钩子函数
    beforeEnter(el){
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done){
      el.offsetWidth;
      //获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取 徽标 在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    //动画执行完毕后的钩子函数
    afterEnter(el){
      this.ballFlag = !this.ballFlag;
    }
  }
}
</script>

<style lang="less">
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;
    .mint-swipe {
    height: 200px;
    .mint-swipe-item {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .image{
     padding: 15px;
  }
  .price{
      .now_price{
          color:red;
          font-weight: 700;
          font-size: 16px;
      }
  }
   .amount {
    display: flex;
    height: 50px;
    align-items: center;
    margin-bottom: 10px;
    input {
      width: 40px;
      height: 40px;
      padding: 0;
      margin: 0;
      text-align: center;

      &[type="number"] {
        border-left: 0;
        border-right: 0;
        font-size: 12px;
        color: gray;
      }
    }
  }
  .mui-card-footer{
      display: block;
      button{
          margin: 15px 0;
      }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 146px;
  }
}
</style>

