<template>
  <view>
      <view class="titles">
        <view v-for="(item,index) in titles" 
        :key="index" class="title-item"
        @click="itemClick(index)"
        >{{item}}
				<view :class="{active:index === currentIndex}"></view>
				</view>
      </view>

  </view>
</template>

<script>

export default {
  name:'DetailNavBar',
  data(){
    return{
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
      this.$emit('itemClick',index)
    }
  }
}
</script>

<style scoped lang="scss">
  .titles{
    display: flex;
	margin-top: 15upx;
		.title-item{
		  margin: auto;
			color: #fff;
		}
  }
  .active{
		height: 2px;
		background: #fff;
  }

</style>