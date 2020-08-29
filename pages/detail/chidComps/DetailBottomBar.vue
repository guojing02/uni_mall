<template>
  <view class="bottomBar">
     <view class="bar-item bar-left">
      <view>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </view>
      <view>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </view>
      <view>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </view>
    </view>
    <view class="bar-item bar-right" @click="addCarClick">
      <view class="cart">加入购物车</view>
      <view class="buy">购买</view>
    </view>
  </view>
</template>

<script>
export default {
  name:'DetailBottomBar',
  methods:{
    addCarClick(){
      this.$emit('addCar')
    }
  }
}
</script>

<style scoped>
  .bottomBar{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    display: flex;
    text-align: center;
  }
  
  .bar-item {
    flex: 1;
    display: flex;
  }
  .bar-item>view {
    flex: 1;
  }
  .bar-left .text {
    font-size: 13px;
  }
  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 10px auto 3px;
    background: url("../../../static/img/detail/detail_bottom.png") 0 0/100%;
  }
  .bar-left .service {
    background-position:0 -54px;
  }
  .bar-left .shop {
    background-position:0 -98px;
  }
  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 58px;
  }
  .bar-right .cart {
	font-weight: bold;
    background-color: #ffe817;
    color: #333;
  }
  .bar-right .buy {
    background-color: #f69;
  }
</style>