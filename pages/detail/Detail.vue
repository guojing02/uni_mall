<template>
	<view id="detail">
		<!-- <detail-nav-bar :class="[active?'detail-nav':'false-nav']" @itemClick='itemClick' ref="nav" />
		 -->
		<view class="titles" :class="[active?'detail-nav':'false-nav']">
			<view v-for="(item,index) in titles" :key="index" class="title-item" @click="itemClick(index)">
			{{item}}
				<view :class="{actives:index === currentIndex}"></view>
			</view>
		</view>
		<view>
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="imgHeight">
				<swiper-item v-for="(item,index) in topImages" :key='index'>
					<image :src="item" class="image"></image>
				</swiper-item>
			</swiper>
		</view>
		<detail-base-info :goods='goods'></detail-base-info>
		<detail-shop-info :shop='shop'></detail-shop-info>
		<detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad' />
		<detail-param-info ref="param" class="param" :param-info='paramInfo'></detail-param-info>
		<detail-comment-info ref="comment" class='comment' :commentInfo="commentInfo"></detail-comment-info>
		<goods-list ref="recomment" class="recomment" />
		<detail-bottom-bar @addCar='addCar' @click-buy='clickBuy'/>
	</view>
</template>

<script>
	import DetailNavBar from './chidComps/DetailNavBar.vue'
	import DetailBaseInfo from './chidComps/DetailBaseInfo'
	import DetailShopInfo from './chidComps/DetailShopInfo'
	import DetailGoodsInfo from './chidComps/DetailGoodsInfo'
	import DetailParamInfo from './chidComps/DetailParamInfo'
	import DetailCommentInfo from './chidComps/DetailCommentInfo'
	import DetailBottomBar from './chidComps/DetailBottomBar'

	import GoodsList from '../../components/goods/GoodsList.vue'

	import {
		Goods,
		Shop,
		GoodsParam
	} from '../../common/detail.js'
	import {
		debounce
	} from '../../common/debounce.js'
	import {
		mapActions
	} from 'vuex'

	export default {
		name: 'Detail',
		data() {
			return {
				topImages: [],
				active: false,
				goods: {},
				shop: {},
				iid: null,
				detailInfo: {},
				paramInfo: {},
				commentInfo: {},
				recommendList: {
					new: {
						page: 3,
						list: {
							left: [],
							right: []
						}
					}
				},
				themeTops: [],
				currentIndex: 0,
				titles: ['商品', '参数', '评论', '推荐'],
			}
		},
		onLoad() {
			this.getHomeGoods('new', 3)
		},
		mounted() {
			// 图片加载完的事件监听
			// this.imageLoad()
		},
		onLoad(options) {
			this.getSwiper(options.id)
			// console.log(options)
		},

		methods: {
			...mapActions(['addCart']),
			async getSwiper(iid) {
				this.iid = iid
				const {
					data: res
				} = await this.$http({
					url: '/detail',
					data: {
						iid
					}
				})
				// console.log(res)
				const data = res.result
				this.topImages = data.itemInfo.topImages
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
				// 3.创建店铺信息
				this.shop = new Shop(data.shopInfo)
				// 4.保存商品的详情数据
				this.detailInfo = data.detailInfo
				console.log(this.detailInfo)
				// 5.获取参数的信息
				this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
				if (data.rate.list) {
					this.commentInfo = data.rate.list[0];
				}
			},
			async getHomeGoods(type, page) {
				const {
					data: res
				} = await this.$http({
					url: '/home/data',
					data: {
						type,
						page
					}
				})
				let list = res.data.list
				let left = []
				let right = []
				list.forEach((item, index) => {
					if (index % 2 !== 0) {
						left.push(item)
					} else {
						right.push(item)
					}
				})
				this.recommendList.new.list.left.push(...left)
				this.recommendList.new.list.right.push(...right)
				this.$refs.recomment.init(type, this.recommendList.new.list)
			},


			itemClick(i) {
				uni.pageScrollTo({
					duration: 100, //过渡时间
					scrollTop: this.themeTops[i], //到达距离顶部的top值
				})
			},
			imageLoad() {
				// #ifdef H5
					this.themeTops = [0,
						this.$refs.param.$el.offsetTop,
						this.$refs.comment.$el.offsetTop,
						this.$refs.recomment.$el.offsetTop,
						Number.MAX_VALUE
					]
				// #endif
				//#ifdef MP
					this.themeTops[0] = 0
					uni.createSelectorQuery().select('.param').boundingClientRect((rect) => {
						this.themeTops[1] = rect.top
					}).exec()
					uni.createSelectorQuery().select('.comment').boundingClientRect((rect) => {
						this.themeTops[2] = rect.top
					}).exec()
					uni.createSelectorQuery().select('.recomment').boundingClientRect((rect) => {
						this.themeTops[3] = rect.top
					}).exec()
					this.themeTops[4] = Number.MAX_VALUE
				// #endif
				// console.log(this.themeTops)
			},
			addCar() {
				const cart = {}
				cart.image = this.topImages[0];
				cart.title = this.goods.title;
				cart.desc = this.goods.desc;
				cart.price = this.goods.realPrice;
				cart.iid = this.iid
				// console.log(cart)
				this.addCart(cart).then(res => {
					uni.showToast({
						title: res
					})
				})
			},
			clickBuy(){	
				let commodity = [
					{
						logo:this.shop.logo,
						name:this.shop.name,
						image:this.topImages[0],
						title:this.goods.title,
						price:this.goods.realPrice,
						id:this.iid,
						number:1,
						satisfy:2
					}
				]
				commodity = JSON.stringify(commodity)
				uni.navigateTo({
					url:`/pages/payment/payment?data=${commodity}`,
				})
			},
			onPageScroll(res) {
				// console.log(res.scrollTop)
				let top = res.scrollTop
				if (top >= 50) {
					this.active = true
				} else {
					this.active = false
				}
				for (let i = 0; i < this.themeTops.length - 1; i++) {
					if (this.currentIndex !== i &&
						(top >= this.themeTops[i] - 4 &&
							top < this.themeTops[i + 1])) {
						this.currentIndex = i
					}
				}
			}
		},
		onReachBottom() {
			let pages = ++this.recommendList.new.page
			this.getHomeGoods('new', pages)
		},
		components: {
			DetailNavBar,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			GoodsList,
			DetailBottomBar
		},
		computed: {
			showGoods() {
				console.log(this.recommendList.new.list)
				return this.recommendList.new.list
			}
		}

	}
</script>

<style scoped lang="scss">
	.titles {
		display: flex;

		.title-item {
			margin: auto;
			color: #fff;
		}
	}

	.actives {
		height: 2px;
		background: #fff;
	}

	#detail {
		position: relative;
		background-color: #fff;
		z-index: 10;
		height: 50%;
	}

	.imgHeight {
		height: 600upx;
	}

	.image {
		width: 800upx;
		height: 800upx;
	}

	.detail-nav {
		background-color: #fff;
		position: fixed;
		z-index: 11;
		height: 80upx;
		width: 102%;
		background: -webkit-linear-gradient(right, #949494 0%, #b350cc 100%);
		background: -webkit-linear-gradient(rgb(255, 105, 156), rgba(255, 176, 255, 0.2));
		background: linear-gradient(rgb(255, 105, 156), rgba(255, 0, 255, 0.2));
		border-bottom-right-radius: 30px;
		border-bottom-left-radius: 30px;
		filter: drop-shadow(2px 4px 6px #ceced0);
		margin-left: -4px;
		padding: 4px;
	}

	.false-nav {
		display: none;
	}
</style>
