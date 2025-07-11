<template>
  <view class="grop-li" :style="{'margin-left': `${tab}rpx`}">
		<slot></slot>
	</view>
</template>

<script lang="ts">
	import adm from "../sdk/adm"
	export default {
		name: "admGropLi",
		props: {
			minRandom: {
				type: Number,
				default: -5,
				required: false
			},
			maxRandom: {
				type: Number,
				default: 5,
				required: false
			}
		},
		data() {
			return {
        tab: 0 
			};
		},
		mounted() {
      this.tab = adm.tab ? adm.px2rpx(adm.item.wrap.width) : 0
			if (this.minRandom || this.maxRandom) {
				const ranArr = adm.getRandom(1, this.minRandom, this.maxRandom)
				adm.grop.pssRandom = ranArr[0]
			}
		}
	}
</script>

<style lang="scss">
	.grop-li {
    display: flex;
		flex-wrap: wrap;
	}
</style>
