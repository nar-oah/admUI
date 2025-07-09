<template>
	<view id="fillWrap" :class="[isRow ? 'wrap row' : 'wrap']">
		<slot></slot>
		<view class="fill" :style="{'height': `${fill.height}rpx`}">
			<text id="fillText" class="text" :style="{'margin-top':`-${fill.random[0]}rpx`}">
				{{fillText.repeat(fill.repeat)}}
			</text>
		</view>
	</view>
</template>

<script lang="ts">
	import adm from "../sdk/adm"
	export default {
		name: "admFill",
		props: {
			isRow: {
				type: Boolean,
				default: false,
				required: false
			},
			fillText: {
				type: String,
				default: '委员会',
				required: false
			},
			height: {
				type: Number,
				default: 0,
				required: false
			}
		},
		data() {
			return {
				fill: {
					height: 0,
					repeat: 1,
					random: [0]
				},
			};
		},
		async mounted() {
			await this.$nextTick()
			adm.getScreendata()
			this.initDom()
			this.getFill()
		},
		methods: {
			initDom() {
				if (!adm.fill.width || !adm.fill.bottom || !adm.fill.text) {
          const query = uni.createSelectorQuery().in(this)
          query.select('#fillWrap').boundingClientRect()
          query.select('#fillText').boundingClientRect()
          query.exec((res) => {
            const [fillRect, textRect] = res
            adm.fill.width = fillRect.width
            adm.fill.bottom = fillRect.bottom
            adm.fill.text = adm.px2rpx(this.isRow ? textRect.width : textRect.height)
          })
				}
			},
			getFill() {
				var height: number
				if (this.height) {
					height = this.isRow ? this.height - adm.fill.width : this.height - adm.fill.bottom
				} else {
					height = this.isRow ? adm.screenData.width - adm.fill.width : adm.screenData.height - adm.fill.bottom
				}
				//若item已填满整页，则仅象征性增加一小段fill空间
				height <= 0 ? height = 50 : height

				this.fill.height = adm.px2rpx(height)
				this.fill.random = adm.getRandom(1, 0, adm.fill.text)
				this.fill.repeat = Math.ceil(this.fill.height / adm.fill.text) + 1
			}
		}
	}
</script>

<style lang="scss">
	.wrap {
		width: $adm-pss-width-base;
		background-color: $adm-primary-light;
	}

	.row {
		transform: rotate(-90deg);
		transform-origin: math.div($adm-pss-width-base, 2) math.div($adm-pss-width-base, 2);
	}

	.fill {
		width: $adm-pss-width-base - $adm-font-spacing-fill;
		left: $adm-font-spacing-fill;

		.text {
      display: flex;
      overflow: hidden;
			color: $adm-primary-dark;
			font-size: $adm-font-size-sm;
			letter-spacing: $adm-font-spacing-fill;
			line-height: $adm-font-height-sm;
		}
	}
</style>
