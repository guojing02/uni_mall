<template>
  <!-- <div class="goods">
    <goods-item v-for='(item,index) in goods' :key='index'
    :goodsitem='item'></goods-item>
  </div> -->
 <u-waterfall v-model="flowList" ref="uWaterfall">
 			<template v-slot:left="{leftList}">
 				<view class="demo-warter" v-for="(item, index) in goods.left" :key="index" @click="itemClick(item.iid)">
 					<!-- 警告：微信小程序不支持嵌入lazyload组件，请自行如下使用image标签 -->
 					<!-- #ifndef MP-WEIXIN -->
 					<u-lazy-load threshold="-450" border-radius="10" :image="item.show.img" :index="index"></u-lazy-load>
 					<!-- #endif -->
 					<!-- #ifdef MP-WEIXIN -->
 					<view class="demo-img-wrap">
 						<image class="demo-image" :src="item.show.img" mode="widthFix"></image>
 					</view>
 					<!-- #endif -->
 					<view class="demo-title">
 						{{item.title}}
 					</view>
 					<view class="demo-price">
 						{{item.price}}元
 					</view>
 					<view class="demo-tag">
 						<view class="demo-tag-owner">
 							自营
 						</view>
 						<view class="demo-tag-text">
 							放心购
 						</view>
 					</view>
 					<view class="demo-shop">
 						{{item.shop}}
 					</view>
 					<!-- 微信小程序无效，因为它不支持在template中引入组件 -->
 					<u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close" @click="remove(item.id)"></u-icon>
 				</view>
 			</template>
 			<template v-slot:right="{rightList}">
 				<view class="demo-warter" v-for="(item, index) in goods.right" :key="index" @click="itemClick(item.iid)">
 					<!-- #ifndef MP-WEIXIN -->
 					<u-lazy-load threshold="-450" border-radius="10" :image="item.show.img" :index="index"></u-lazy-load>
 					<!-- #endif -->
 					<!-- #ifdef MP-WEIXIN -->
 					<view class="demo-img-wrap">
 						<image class="demo-image" :src="item.show.img" mode="widthFix"></image>
 					</view>
 					<!-- #endif -->
 					<view class="demo-title">
 						{{item.title}}
 					</view>
 					<view class="demo-price">
 						{{item.price}}元
 					</view>
 					<view class="demo-tag">
 						<view class="demo-tag-owner">
 							自营
 						</view>
 						<view class="demo-tag-text">
 							放心购
 						</view>
 					</view>
 					<view class="demo-shop">
 						{{item.shop}}
 					</view>
 					<!-- 微信小程序无效，因为它不支持在template中引入组件 -->
 					<u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close" @click="remove(item.id)"></u-icon>
 				</view>
 			</template>
 		</u-waterfall>
</template>

<script>
// import GoodsItem from './GoodsItem.vue'
export default {
  name:'GoodsList',
  props:{
    goods:{
      type:Object,
      default(){
        return{}
      }
    }
  },
  components:{
    // GoodsItem
  },
  data(){
	  return{
		  flowList:null
	  }
  },
  created(){
	console.log(this.goods)  
  },
  mounted(){
	  console.log(this.goods)
  },
  methods:{
	  itemClick(id){
		  uni.navigateTo({
		  	url:'/pages/detail/Detail?id='+id
		  })
	  }
  },
}
</script>

<style scoped>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
	}
</style>

<style lang="scss" scoped>
	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}
	
	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}
	
	.demo-image {
		width: 100%;
		border-radius: 4px;
	}
	
	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}
	
	.demo-tag {
		display: flex;
		margin-top: 5px;
	}
	
	.demo-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}
	
	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}
	
	.demo-price {
		font-size: 30rpx;
		color: $u-type-error;
		margin-top: 5px;
	}
	
	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}
</style>