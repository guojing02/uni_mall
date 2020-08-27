<template>
  <div class="goodsitem" @click="itemClick(goodsitem.iid)">
      <img :src="showImage" alt=""  >
			<!-- @load="imgLoad" -->
      <div class="info">
        <div class="info1">
        <p>{{goodsitem.title}}</p>
        <span class="price">{{'￥'+goodsitem.price}}</span>
        <span class="cfav">{{goodsitem.cfav}}</span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
name:'GoodsItem',
props:{
  goodsitem:{
    type:Object,
    default(){
      return{}
    }
  } 
},
methods:{
    // imgLoad(){
    //   // 第一种方法有bug首页滑不动
    // //  if(this.$route.path.indexOf('/home')){
    // //     this.$bus.$emit('itemimgload')
    // //  }else if(this.$route.path.indexOf('/detail')){
    // //     this.$bus.$emit('imageLoad')
    // //  }
    // this.$bus.$emit('itemimgload')
    // },

    itemClick(id){
      	uni.navigateTo({
      		url:'/pages/detail/Detail?id='+id
      	})
    }
  },
  computed:{
    showImage(){
      return this.goodsitem.image || this.goodsitem.show.img
    }
  }
}
</script>

<style scoped>
/*  #ifdef MP */
.goodsitem{
  padding-bottom: 40px;
  position: relative;
}
.goodsitem img{
  width:11em;
  border-radius: 5px;
}
/* #endif */
/* #ifdef H5 */
.goodsitem{
  padding-bottom: 40px;
  position: relative;
	width: 48%;
}
.goodsitem img{
  width:100%;
	height: 100%;
  border-radius: 5px;
}
/* #endif */
.info{
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  right: 0;
  left:0;
  overflow: hidden;
  text-align: right;
}
.info1{
  position: relative;
}
.info1 p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.info1 .price{
  color: $uni-text-color;;
  position: absolute;
  left: 5%;
}
.info1 .cfav{
  position: relative;
  right: 5%;
}
.info1 .cfav::before{
  content:'';
  position: absolute;
  left: -15px;
  top: 2px;
  width: 14px;
  height: 14px;
  background: url("../../static/img/common/collect.png") 0 0/14px 14px;
}
</style>