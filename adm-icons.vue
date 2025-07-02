<template>
	<view class="icon" :style="{'transform': `rotate(${angle + random[0]}deg)`}">
		<text :class="[`text ${this.isSelect ? 'select' : 'normal'}`]">
			<slot></slot>
		</text>
	</view>
</template>

<script lang="ts">
	import adm from "../sdk/adm"
	export default {
		name: "admIcons",
		props: {
			isRow: {
				type: Boolean,
				default: true,
				required: false
			},
			isSelect: {
				type: Boolean,
				default: true,
				required: false
			},
			isRandom: {
				type: Boolean,
				default: true,
				required: false
			},
			fontSize: {
				type: Number,
				required: false
			}
		},
		data() {
			return {
				angle: this.isRow ? 90 : 0,
				size: adm.px2rpx(this.fontSize as number),
				random: this.isRandom ? adm.getRandom(1, -10, 10) : [0]
			};
		}
	}
</script>

<style lang="scss">
	.icon {
		align-items: center;

		.text {
			width: $adm-font-size-lg;
			font-size: $adm-font-size-lg;
			/* 更换字体后将line-height删除 */
			line-height: $adm-font-height-lg;
		}

		.select {
			color: $adm-primary-dark;
		}

		.normal {
			color: $adm-secondary-light;
		}
	}
</style>
