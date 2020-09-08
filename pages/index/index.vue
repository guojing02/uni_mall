<template>
	<view class="home">
		<my-swiper class="swiper" :banners='banners'></my-swiper>
		<recommend-view :recommends="recommend" class="bgc"></recommend-view>
		<view class="feature">
			<a href="https://act.mogujie.com/zzlx67">
				<img :src='SRC' alt="123">
			</a>
		</view>
		<view>
			<tab-control class="tab-control bgc" v-if="activeTab" :titles="title" @tab-click='tabClick' ref='tab'></tab-control>
			<tab-control class="tab-control-fixed" v-else :titles="title" @tab-click='tabClick'></tab-control>
			<view :class="{'view_height':!activeTab}"></view>
		</view>
		<goods-list ref='goods'></goods-list>
	</view>
</template>

<script>
	import MySwiper from '../../components/swiper/MySwiper.vue'
	import GoodsList from '../../components/goods/GoodsList.vue'

	import RecommendView from './children/RecommendView.vue'
	import tabControl from './children/tabControl.vue'
	export default {
		onLoad() {
			this.getSwiper()
			this.getHomeGoods('sell', 1)
			setTimeout(() => {
				this.getHomeGoods('pop', 1)
			}, 50)
			this.getHomeGoods('new', 1)
			// console.log(this.getHomeGoods('new',1))
		},
		data() {
			return {
				banners: [],
				recommend: null,
				goods: {
					'pop': {
						page: 1,
						list: {
							left: [],
							right: []
						}
					},
					'new': {
						page: 1,
						list: {
							left: [],
							right: []
						}
					},
					'sell': {
						page: 1,
						list: {
							left: [],
							right: []
						}
					},
				},
				title: [],
				currentType: 'pop',
				activeTab: true,
			}
		},
		methods: {
			// 网络请求
			async getSwiper() {
				const {
					data: res
				} = await this.$http({
					url: '/home/multidata'
				})
				this.banners = res.data.banner.list
				this.recommend = res.data.recommend.list
			},
			async getHomeGoods(type, page) {
				const {data: res} = await this.$http({
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
				this.goods[type].list.left.push(...left)
				this.goods[type].list.right.push(...right)
				this.title = [res.data.filter.list[0].title, res.data.filter.list[1].title, res.data.filter.list[2].title]
					this.$refs.goods.init(type,this.goods[type].list)
			},

			// 方法
			tabClick(index) {
				uni.pageScrollTo({
					duration: 100, //过渡时间
					scrollTop: 626, //到达距离顶部的top值
				})
				switch (index) {
					case 0:
						this.currentType = 'pop'
						break
					case 1:
						this.currentType = 'new'
						break
					case 2:
						this.currentType = 'sell'
						break
				}
				this.getHomeGoods(this.currentType, 1)
			},

			onPageScroll(res) {
				let tabControl = res.scrollTop
				// console.log(tabControl)
				// #ifdef H5
				if (tabControl >= 623) {
					this.activeTab = false
				}
				// #endif 
				// #ifdef MP
				if (tabControl >= 614) {
					this.activeTab = false
				}
				// #endif 
				else {
					this.activeTab = true
				}
			}

		},
		onReachBottom() {
			this.goods[this.currentType].page++
			this.getHomeGoods(this.currentType, this.goods[this.currentType].page)
		},

		components: {
			MySwiper,
			RecommendView,
			tabControl,
			GoodsList
		},
		computed: {
			showGoods() {
				// console.log(this.goods[this.currentType].list)
				return this.goods[this.currentType].list
			},
			SRC() {
				return '../../static/img/home/recommend_bg.png'
			}
		},
	}
</script>

<style scoped lang="scss">
	page {
		height: 100%;
	}

	.feature a img {
		width: 101%;
	}

	.swiper {
		height: 100%;
	}

	.home {
		height: 38%;
		position: relative;
	}

	// .tab-control {
	// 	position: sticky;
	// 	top: 42upx;
	// 	z-index: 100;
	// 	background-color: #fff;
	// 	color: #000;
	// }
	.tab-control-fixed {
		position: fixed;
		/*#ifdef H5 */
		top: 44px;
		/*#endif */
		/*#ifdef MP */
		top: 0px;
		/*#endif */
		z-index: 100;
		background-color: #fff;
		color: #000;
		width: 100%;
	}

	.view_height {
		height: 80rpx;
		width: 375rpx;
	}

	.bgc {
		background-color: #fff;
		position: relative;
		top: -3px;
	}
</style>
