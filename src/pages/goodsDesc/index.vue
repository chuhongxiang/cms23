<template>
    <div class="goodsdesc-container">
        <h3>{{getgoodsDesc.title}}</h3>
        <hr>
        <div class="content" v-html="getgoodsDesc.content"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            id:this.$route.params.id,
            getgoodsDesc:{}
        }
    },
    created(){
        this.getDesc()
    },
    methods:{
        getDesc(){
            this.$http.get('goods/getdesc/'+this.id).then(result=>{
                this.getgoodsDesc=result.body.message[0]
            })
        }
    }

}
</script>


<style lang="less">
    .goodsdesc-container{
        padding: 0 5px;
        h3{
            font-size: 16px;
            color:#226aff;
            text-align: center;
            margin: 15px 0; 
        }
        .content{
            font-size:14px;
            margin-top:0;
            margin-bottom: 10px;
            color:#8f8f94;
            img{
                width: 100%;
            }
        }
    }
</style>
