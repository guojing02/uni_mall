<template>
  <view v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <view class="info-desc clear-fix">
      <view class="start">
      </view>
      <view class="desc">{{detailInfo.desc}}</view>
      <view class="end"></view>
    </view>
    <view class="info-key">{{detailInfo.detailImage[0].key}}</view>
    <view class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" 
      :key="index" :src="item" alt="" @load="imageLoad(item)">
    </view>
  </view>
</template>

<script>
	import {debounce} from '../../../common/debounce.js'
	export default {
		name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object
      }
    },
    data(){
      return{
        counter:0,
        imageLength:0,
		load:false
      }
    },
    methods:{
      imageLoad(){
				if(!this.load){
					setTimeout(()=>{
						this.$emit('imageLoad',this.load)
					},1000)
				 this.load = true
				 }
      }
    },
    watch:{
        detailInfo(){
          this.imageLength = this.detailInfo.detailImage[0].list.length
        }
      }
	}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-desc {
    padding: 0 15px;
  }
  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }
  .info-desc .start {
    float: left;
  }
  .info-desc .end {
    float: right;
  }
  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }
  .info-desc .end::after {
    right: 0;
  }
  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }
  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }
  .info-list img {
    width: 100%;
  }
</style>