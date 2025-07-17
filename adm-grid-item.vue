<template>
  <!-- <view class="grid-item-wrap"> -->
  <!--   <text id="gridItemSmall" class="small-text">管理局</text> -->
  <!--   <text id="gridItemLarge" class="large-text">管理局</text> -->
  <!-- </view> -->
  <view class="grid-item-wrap" :style="{'width':`${width}rpx`,
    'margin-top':`${random.row[0]}rpx`, 'margin-left':`${random.colmn[0]}rpx`, 'transform': `rotate(${random.rotate[0]}deg)`}">
    <text class="small-text">{{small}}</text>
    <text class="large-text">{{large}}</text>
  </view>
</template>

<script lang="ts">
  import adm from '../sdk/adm';
  export default {
    name:"admGridItem",
    props: {
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
			},
			width: {
				type: Number,
				required: true
			},
			height: {
				type: Number,
				required: true
			}
    },
    data() {
      return {
        width: 0,
        random: {
          row: [] as number[],
          colmn: [] as number[],
          rotate: [] as number[]
        }
      };
    },
		async mounted() {
      // this.initDom()
      // FIX: 当前random并非按照grid减去item后的长宽余量来随机的
      // FIX: 因为width的默认值为0因此dom读取到的width始终为0，需尝试通过width ? `${width}rpx` : ''解决
      // FIX: dom获取的值需存入adm.grid.item中
			await this.$nextTick()
      this.initRandom()
		},
    methods: {
      initDom() {
        const query = uni.createSelectorQuery().in(this)
        query.select('#gridItemSmall').boundingClientRect()
        query.select('#gridItemLarge').boundingClientRect()
        query.exec((res) => {
          const [smallRect, largeRect] = res
          console.log(smallRect, largeRect);
        })       
      },
      initRandom() {
        if(this.isRandom) {
          const itemWidth = adm.px2rpx(adm.item.wrap.width)
          this.width = adm.px2rpx(adm.grid.width)
          this.random.row = adm.getRandom(1, 0, itemWidth)
          this.random.colmn = adm.getRandom(1, 0, itemWidth)
          this.random.rotate = adm.getRandom(1, -5, 5)
        }
      }
    }
  }
</script>

<style lang="scss">
.grid-item-wrap {
  display: flex;
  flex-direction: column;

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
