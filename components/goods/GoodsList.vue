<template>

	<view class="container">
		<!-- #ifdef MP -->
		<view v-for='(item,index) in list.left' class="goods" :key='index'>
			<view class="goodsitem" @click="itemClick(item.iid)">
				<img :src="item.show.img" alt="">
				<!-- @load="imgLoad" -->
				<view class="info">
					<view class="info1">
						<p>{{item.title}}</p>
						<span class="price">{{'￥'+item.price}}</span>
						<text class="o-price">{{item.orgPrice}}</text>
						<!-- <span class="cfav">{{item.cfav}}</span> -->
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
		</view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<u-waterfall v-model="flowList" ref="uWaterfall">
			<template v-slot:left="{leftList}">
				<view class="demo-warter" v-for="(item, index) in list.left" :key="index" @click="itemClick(item.iid)">
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
					<text class="demo-price">
						{{item.price}}元
					</text>
					<text class="o-price">{{item.orgPrice}}</text>
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
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view class="demo-warter" v-for="(item, index) in list.right" :key="index" @click="itemClick(item.iid)">
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
				</view>
			</template>
		</u-waterfall>
		<!-- #endif -->
	</view>
</template>

<script>
	import GoodsItem from './GoodsItem.vue'
	export default {
		name: 'GoodsList',
		props: {
			goods: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		computed: {
			list() {
				if (this.type === 'pop') {
					return this.pops
				} else if (this.type === 'new') {
					return this.new
				} else {
					return this.sell
				}
			}
		},
		data() {
			return {
				flowList: [],
				pops: {},
				new: {},
				sell: {},
				type: ''
			}
		},
		methods: {
			itemClick(id) {
				uni.navigateTo({
					url: '/pages/detail/Detail?id=' + id
				})
			},
			init(type, data) {
				this.type = type
				if (type === 'pop') {
					this.pops = data
				} else if (type === 'new') {
					this.new = data
				} else {
					this.sell = data
				}
			}
		}
	}
</script>


<style lang="scss" scoped>
	/* #ifdef H5 */
	.container {
		background-color: #f2f5f8;
	}

	/* #endif */
	/* #ifdef MP */
	.container {
		background-color: #f2f5f8;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}

	.goods {
		width: 47% !important;
		border: 22rpx solid #fff;
		border-radius: 15px;
		margin: 10rpx;
	}

	/* #endif */
	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.o-price {
		font-size: 10px;
		margin-left: 5px;
		color: #9C9C9C;
		text-decoration: line-through;
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
		width: 155px;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
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
