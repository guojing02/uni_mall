<template>
  <view class="recommend">
    <view v-for="(item,index) in recommends" :key='index'>
      <a :href="item.link">
        <img :src="item.image" alt="">
        <view>{{item.title}}</view>
      </a>
    </view>
  </view>

</template>

<script>
export default {
	name:"RecommendView",
  props:{
    recommends:{
      typr:Array,
      default(){
        return []
      }
    }
  },
  methods:{

  }
}
</script>

<style scoped lang="scss">
.recommend{
  width: 100%;
  display:flex;
  align-items: center;
  text-align: center;
  font-size:16px;
  padding: 20rpx 0 40rpx;
  border-bottom:#eee solid 10px;
	view {
		flex: 1 !important;
		a{
			text-decoration: none !important;
			img{
			  width:80%;
				height: 75px;
			}
			view{
			  padding-top: 15px;
				color: black;
			}
		}
	}
}
</style>