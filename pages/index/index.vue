<template>
	<view class="home">
		<my-swiper class="swiper" :banners='banners'></my-swiper>
		<recommend-view :recommends="recommend"></recommend-view>
		<view class="feature">
			<a href="https://act.mogujie.com/zzlx67">
				<img :src='SRC' alt="123">
			</a>
		</view>
		<view>
			<tab-control class="tab-control" v-if="activeTab" :titles="title" @tabClick='tabClick' ref='tab'></tab-control>
			<tab-control class="tab-control-fixed" v-else :titles="title" @tabClick='tabClick'></tab-control>
			<view :class="{'view_height':!activeTab}"></view>
		</view>
		<goods-list :goods="showGoods"></goods-list>
	</view>
</template>

<script>
	import MySwiper from '../../components/swiper/MySwiper.vue'
	import GoodsList from '../../components/goods/GoodsList.vue'

	import RecommendView from './children/RecommendView.vue'
	import tabControl from './children/tabControl.vue'
	export default {
		onLoad() {
			this.getHomeGoods('pop',1)
			this.getHomeGoods('new',1)
			this.getHomeGoods('sell',1)
		},
		data() {
			return {
				banners: null,
				recommend: null,
				goods: {
					'pop': {
						page: 1,
						list: []
					},
					'new': {
						page: 1,
						list: []
					},
					'sell': {
						page: 1,
						list: []
					},
				},
				title: [],
				currentType: 'pop',
				activeTab: true,
			}
		},
		mounted() {
			this.getSwiper()
			this.getHomeGoods(this.currentType, this.goods[this.currentType].page)
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
				const {
					data: res
				} = await this.$http({
					url: '/home/data',
					data: {
						type,
						page
					}
				})
				this.goods[type].list.push(...res.data.list)
				this.title = [res.data.filter.list[0].title, res.data.filter.list[1].title, res.data.filter.list[2].title]
			},

			// 方法
			tabClick(index) {
				let top
				this.currentIndex = index
				uni.pageScrollTo({
					duration: 100, //过渡时间
					scrollTop: 626, //到达距离顶部的top值
				})
				console.log(top)
				switch (index) {
					case 0:
						this.currentType = 'pop'
						return
					case 1:
						this.currentType = 'new'
						return
					case 2:
						this.currentType = 'sell'
						return
				}

			},
			onPageScroll(res) {
				let tabControl = res.scrollTop
				console.log(tabControl)
				// #ifdef H5
				if (tabControl >= 626) {
					this.activeTab = false
				}
				// #endif 
				// #ifdef MP
				if (tabControl >= 589) {
					this.activeTab = false
				}
				// #endif 
				else {
					this.activeTab = true
				}
			}

		},
		onReachBottom() {
			// console.log('1')
			this.goods[this.currentType].page++
			this.getHomeGoods(this.currentType, this.goods[this.currentType].page)
			// console.log(this.goods[this.currentType].page)
		},

		components: {
			MySwiper,
			RecommendView,
			tabControl,
			GoodsList
		},
		computed: {
			showGoods() {
				return this.goods[this.currentType].list
			},
			SRC() {
				return '../../static/img/home/recommend_bg.png'
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		height: 100%;
	}

	.feature a img {
		width: 100%;
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
</style>
