<template>
	<view class="goodsitem" @click="itemClick(goodsitem.iid)">
		<img :src="showImage" alt="">
		<!-- @load="imgLoad" -->
		<view class="info">
			<view class="info1">
				<p>{{goodsitem.title}}</p>
				<span class="price">{{'￥'+goodsitem.price}}</span>
				<text class="o-price">{{goodsitem.orgPrice}}</text>
				<!-- <span class="cfav">{{goodsitem.cfav}}</span> -->
			</view>
			<view class="demo-tag">
				<view class="demo-tag-owner">
					自营
				</view>
				<view class="demo-tag-text">
					放心购
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'GoodsItem',
		props: {
			goodsitem: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		methods: {
			// imgLoad(){
			//   // 第一种方法有bug首页滑不动
			// //  if(this.$route.path.indexOf('/home')){
			// //     this.$bus.$emit('itemimgload')
			// //  }else if(this.$route.path.indexOf('/detail')){
			// //     this.$bus.$emit('imageLoad')
			// //  }
			// this.$bus.$emit('itemimgload')
			// },

			itemClick(id) {
				uni.navigateTo({
					url: '/pages/detail/Detail?id=' + id
				})
			}
		},
		computed: {
			showImage() {
				return this.goodsitem.image || this.goodsitem.show.img
			}
		}
	}
</script>

<style scoped  lang="scss">
	/*  #ifdef MP */
	.goodsitem {
		padding-bottom: 64px;
		position: relative;
		background-color: #fff;
	}

	.goodsitem img {
		width: 11em;
		border-radius: 5px;
	}

	/* #endif */

	.info {
		font-size: 12px;
		position: absolute;
		bottom: 5px;
		right: 0;
		left: 0;
		/* overflow: hidden; */
	}

	.info1 {
		position: relative;
	}

	.info1 p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 3px;
	}

	.info1 .price {
		font-size: 15px;
		color: #fa3534;
		margin-top: 5px;
	}
	.info1 .o-price {
		font-size: 10px;
		margin-left: 5px;
		color: #9C9C9C;
		text-decoration: line-through;
	}
	.info1 .cfav {
		position: relative;
		right: 5%;
	}

	.info1 .cfav::before {
		content: '';
		position: absolute;
		left: -15px;
		top: 2px;
		width: 14px;
		height: 14px;
		background: url("../../static/img/common/collect.png") 0 0/14px 14px;
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
</style>
