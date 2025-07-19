<template>
  <view class="grid-item-wrap" :style="{'width':`${width ? width : ''}rpx`,
    'margin-top':`${random.height}rpx`, 'margin-left':`${random.width}rpx`, 'transform': `rotate(${random.rotate}deg)`}">
    <text id="gridItemSmall" class="small-text">{{small}}</text>
    <text id="gridItemLarge" class="large-text">{{large}}</text>
  </view>
</template>

<script lang="ts">
  import adm from '../sdk/adm';
  export default {
    name:"admGridItem",
    props: {
			index: {
				type: Number,
				required: true
			},
			large: {
				type: String,
				default: '還剩5片',
				required: false
			},
			small: {
				type: String,
				default: '6個月前被取出',
				required: false
			},
			isRandom: {
				type: Boolean,
				default: true,
				required: false
			}
    },
    data() {
      return {
        width: 0,
        gap: {
          width: 0,
          height: 0
        },
        random: {
          width: 0,
          height: 0,
          rotate: 0
        }
      };
    },
		async mounted() {
      if(!adm.grid.item.height) this.initDom()
      if(this.isRandom) {
        await this.$nextTick()
        this.initGap()
        this.initRandom()
      }
		},
    methods: {
      initDom() {
        const item = adm.grid.item
        const query = uni.createSelectorQuery().in(this)
        query.select('#gridItemSmall').boundingClientRect()
        query.select('#gridItemLarge').boundingClientRect()
        query.exec((res) => {
          const [smallRect, largeRect] = res
          item.height = smallRect.height + largeRect.height
          item.smallWidth = smallRect.width / this.small.length
          item.largeWidth = largeRect.width / this.large.length
        })       
      },
      initGap() {
        const smallWidth = adm.grid.item.smallWidth * this.small.length
        const largeWidth = adm.grid.item.largeWidth * this.large.length
        const itemWidth = smallWidth > largeWidth ? smallWidth : largeWidth
        const itemColumn = Math.trunc((this.index) / 2)
        this.gap.width = adm.grid.width - adm.item.wrap.width - itemWidth
        this.gap.height = adm.grid.height[itemColumn] - adm.item.wrap.width - adm.grid.item.height
      },
      initRandom() {
        const maxWidth = adm.px2rpx(this.gap.width)
        const maxHeight = adm.px2rpx(this.gap.height)
        this.width = adm.px2rpx(adm.grid.width)
        this.random.width = adm.getSingleRandom(0, maxWidth)
        this.random.height = adm.getSingleRandom(0, maxHeight)
        this.random.rotate = adm.getSingleRandom(-5, 5)
      }
    }
  }
</script>

<style lang="scss">
.grid-item-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .small-text {
    font-family: adm-thin;
    font-size: $adm-font-size-sm;
    color: $adm-primary-light;
  }

  .large-text {
    font-family: pss-main;
    font-size: $adm-font-size-md;
    color: $adm-primary-light;
  }
}
</style>
