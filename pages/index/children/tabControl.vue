<template>
	<view>
		<view></view>
  <view class="tabControl">
     <view v-for="(item, index) in titles"  
     :key="index" :class="{active:index == currentIndex}"
     @click='itemClick(index)'>
       <span>{{item}}</span>
     </view>
  </view>
	</view>
</template>

<script>
export default {
  name:'TabControl',
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
      this.$emit('tab-click',index)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabControl{
  display: flex;
  text-align: center;
  line-height: 80rpx;
  font-size: 40rpx;
}
.tabControl view{
  flex:1
}
.active span{
  color:$uni-bg-color;
  border-bottom: 3px solid $uni-bg-color;
  padding: 5px;
}
</style>