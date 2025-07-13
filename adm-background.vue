<template>
  <view class="background-wrap"
  :style="{'transform': `rotate(${position.deg}deg)`, 'margin-top':`-${position.top}rpx`, 'margin-left':`-${position.left}rpx`}">
    <view id="backgroundText" :class="[`${font} ${theme}`]">
       <slot></slot>
    </view>
  </view>
</template>

<script lang="ts">
  import adm from '../sdk/adm';
  export default {
    name:"admBackground",
    props: {
			isRev: {
				type: Boolean,
				default: false,
				required: false
			},
			isThin: {
				type: Boolean,
				default: false,
				required: false
			},
			minRan: {
				type: Number,
				default: -10,
				required: false
			},
			maxRan: {
				type: Number,
				default: 10,
				required: false
			}
    },
    data() {
      return {
        theme: this.isRev ? 'dark' : 'light',
        font: this.isThin ? 'thin' : 'normal',
        position: {
          deg: adm.getRandom(1, this.minRan, this.maxRan),
          // TODO: 将20改为经dom计算的数值
          top: adm.getRandom(1, 0, 20),
          left: adm.getRandom(1, 0, 20)
        }
      };
    }
  }
</script>

<style lang="scss">
.background-wrap {
  position: absolute;
  /* z-index: 0; */
  height: 100%;
  width: 120%;
  overflow: hidden;

  .normal {
    font-family: adm-icon;
    font-size: $adm-font-size-bg;
  }

  .thin {
    font-family: adm-thin;
    font-size: $adm-font-size-md;
    letter-spacing: 17.545rpx;
    line-height: 70.18rpx;
  }

  .light {
    color: $adm-bg-light;
  }

  .dark{
    color: $adm-bg-color;
  }
}
</style>
