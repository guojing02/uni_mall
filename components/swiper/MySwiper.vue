<template>
	<view>
		<swiper class="swiper" autoplay circular :nterval='1000' indicator-dots indicator-active-color='#fff'>
			<swiper-item v-for="(item,index) in banners" :key='index'>
				<a :href="item.link">
				<img :src="item.image||item" alt="">
				</a>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default{
		props:{
			banners:{
				type:Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	view{
		height: 100%;
	}
	.swiper{
		height: 100%;
		width: 750rpx;
			a img{
				height: 82vw;
				width: 750rpx;
		}
	}
</style>
