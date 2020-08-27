<template>
  <view class="param-info" v-if="Object.keys(paramInfo).length !== 0">

    <view v-for="(table, index) in paramInfo.sizes"
           class="info-size info-display" :key="index">
      <view v-for="(tr, indey) in table" :key="indey">
        <view v-for="(td, indez) in tr" :key="indez">{{td}}</view>
      </view>
    </view>
    <view class="info-param">
      <view v-for="(info, index) in paramInfo.infos" :key="index" class="info-param-display">
        <view class="info-param-key">{{info.key}}</view>
        <view class="param-value">{{info.value}}</view>
      </view>
    </view>
    <view class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="">
    </view>
  </view>
</template>

<script>
export default {
  name:'DetailParamInfo',
  props:{
    paramInfo:{
      type:Object,
      default(){
        return{}
      }
    }
  }
}
</script>

<style scoped>
  .param-info {
		overflow: auto;
		display: flex;
		flex-wrap: wrap;
		height: 1320rpx;
    padding: 2px 15px;
    /* font-size: 14px; */
    border-bottom: 5px solid #f2f5f8;
  }
  .param-info view {
    width: 100%;
		margin-top: 8px;
    border-collapse: collapse;
  }
  .param-info view view {
    flex: 1;
  }
  .param-info view view view {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .info-param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }
  .info-param {
		display: flex;
		flex-direction: column;
  }
  .param-value {
    color: #eb4868
  }
  .info-img img {
    width: 100%;
  }
	.info-display{
		display: flex;
	}
	.info-param-display{
		display: flex;
	}
</style>