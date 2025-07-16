<template>
	<view id="fillWrap" :class="[isRow ? 'wrap row' : 'wrap']">
		<slot></slot>
		<view class="fill">
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
				default: '委員會',
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
          bottom: 0,
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
        const query = uni.createSelectorQuery().in(this)
				if (!adm.fill) {
          query.select('#fillText').boundingClientRect((textRect : any) => {
            adm.fill = adm.px2rpx(this.isRow ? textRect.width : textRect.height)
          }).exec()
				}
        query.select('#fillWrap').boundingClientRect((fillRect : any) => {
          this.fill.bottom = this.isRow ? fillRect.width : fillRect.height 
        }).exec()
			},
			getFill() {
        const screenHeight = this.isRow ? adm.screenData.width : adm.screenData.height
        const height = this.height ? this.height - this.fill.bottom : screenHeight - this.fill.bottom

				//若item已填满整页，则仅象征性增加一小段fill空间
				this.fill.height = adm.px2rpx(height <= 0 ? 50 : height)
				this.fill.random = adm.getRandom(1, 0, adm.fill)
				this.fill.repeat = Math.ceil(this.fill.height / adm.fill) + 1
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
		margin-left: $adm-font-spacing-fill;

		.text {
      display: flex;
      overflow: hidden;
			color: $adm-primary-dark;
      font-family: pss-main;
			font-size: $adm-font-size-sm;
			letter-spacing: $adm-font-spacing-fill;
			line-height: $adm-font-height-sm;
		}
	}
</style>
