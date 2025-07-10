<template>
	<view id="itemWrap" :class="[`item-wrap item-wrap-${theme}`]">
		<view class="border">
			<text id="itemBorder" :class="[`text text-${theme}`]" :style="{'margin-left':`${border.random[0]}rpx`}">{{border.text.repeat(border.repeat)}}</text>
		</view>
		<view id="itemLeft" :style="{ 'height':`${left.height?left.height:''}rpx`,'position':'absolute', 'overflow':'hidden'}">
			<view class="left" v-for="n in left.repeat" :key="n" :style="{'top':`${left.random[0]}rpx`}">
				<text :class="[`text text-${theme}`]">{{leftText}}</text>
				<view :class="[`seal seal-${theme}`]">封</view>
			</view>
		</view>
		<view id="itemMain" :class="[`${main.row} main-${theme}`]" :style="{'height':`${main.height?main.height:''}rpx`}">
			<view v-if="isJustify && height" v-for="(item,index) in main.justify" :key="index">
				{{item}}
			</view>
			<view v-else>
				<slot>管理局</slot>
			</view>
		</view>
		<view class="border">
			<text :class="[`text text-${theme}`]" :style="{'margin-left':`${border.random[1]}rpx`}">{{border.text.repeat(border.repeat)}}</text>
		</view>
	</view>
</template>

<script lang="ts">
	import adm from "../sdk/adm"
	export default {
		name: "admItem",
		props: {
			borderText: {
				type: String,
				default: '委員會',
				required: false
			},
			leftText: {
				type: String,
				default: '管理局委員會',
				required: false
			},
			isRev: {
				type: Boolean,
				default: false,
				required: false
			},
			isRow: {
				type: Boolean,
				default: false,
				required: false
			},
			isJustify: {
				type: Boolean,
				default: false,
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
				theme: this.isRev ? 'dark' : 'light',
				border: {
					text: `${this.borderText}-`,
					repeat: 1,
					random: [0]
				},
				left: {
					repeat: 1,
					height: 0,
					random: [0]
				},
				main: {
					height: 0,
					row: this.isRow ? 'main-row' : 'main',
					justify: [...this.$slots.default()[0].children]
				}
			};
		},
		mounted() {
			adm.getScreendata()
			this.initDom()
			this.initBorder()
			this.initMain()
			this.initLeft()
		},
		beforeUpdate() {
			this.initMain()
			this.initLeft()
			this.theme = this.isRev ? 'dark' : 'light'
		},
		methods: {
			initDom() {
				if (adm.item.updated != adm.screenData.width) {
          const query = uni.createSelectorQuery().in(this)
          query.select('#itemWrap').boundingClientRect()
          query.select('#itemBorder').boundingClientRect()
          query.select('#itemLeft').boundingClientRect()
          query.select('#itemMain').boundingClientRect()
          query.exec((res) => {
            const [wrapRect, borderRect, leftRect, mainRect] = res
  					const borderWidth = this.isRow ? borderRect.height : borderRect.width
  					const mainHeight = this.isRow ? mainRect.width : mainRect.height

  					adm.item.wrap.width = wrapRect.width
  					adm.item.wrap.height = borderRect.height * 2
  					adm.item.unit.border = borderWidth / (this.borderText.length + 0.5)
  					adm.item.unit.left = leftRect.height / this.leftText.length
  					adm.item.unit.main = mainHeight / this.$slots.default()[0].children.length
  					adm.item.updated = adm.screenData.width
          })
				}
			},
			initBorder() {
				const borderWidth = adm.item.unit.border * (this.borderText.length + 0.5)
				this.border.repeat = Math.ceil(adm.item.wrap.width / borderWidth) + 1
				this.border.random = adm.getRandom(2, -adm.px2rpx(borderWidth), 0)
			},
			initMain() {
				const appointHeight = this.height - adm.item.wrap.height
				const defaultHeight = adm.item.unit.main * this.$slots.default()[0].children.length
				this.main.height = adm.px2rpx(this.height ? appointHeight : defaultHeight)
			},
			initLeft() {
				const height = adm.px2rpx(adm.item.unit.left * this.leftText.length)
				this.left.height = adm.px2rpx(adm.item.wrap.height) + this.main.height
				this.left.repeat = Math.ceil(this.left.height / height) + 1
				this.left.random = adm.getRandom(1, -height, 0)
			}
		}
	}
</script>

<style lang="scss">
	.item-wrap {
		@include theme(false, $adm-primary-light);
    display: flex;
		flex-wrap: wrap;
		width: $adm-pss-width-base;
    overflow: hidden;

		.border {
      display: flex;
      align-items: center;
      overflow: hidden;

			.text {
				@include theme($adm-primary-dark, false);
				font-size: $adm-font-size-mini;
        font-family: pss-border;
        white-space: nowrap;
			}
		}

		.left {
      display: flex;
      flex-direction: column;
      position: relative;
			align-items: center;
			width: $adm-pss-width-mini;
      overflow: hidden;

			.text {
				@include theme($adm-primary-dark, false);
        font-family: pss-left;
				font-size: $adm-font-size-mini;
				width: $adm-font-size-mini;
				line-height: $adm-pss-width-mini;
			}

			.seal {
				@include theme($adm-primary-light, $adm-primary-dark);
        display: flex;
				justify-content: center;
				align-items: center;
				width: $adm-pss-width-mini;
				height: $adm-pss-width-mini;
				border-radius: 50%;
        font-family: pss-left;
				font-size: $adm-font-size-mini;
			}
		}


		.main {
			@include theme($adm-primary-dark, false);
      display: flex;
      flex-direction: column;
			justify-content: space-between;
			margin-left: $adm-pss-width-mini + 5.26rpx;
			width: $adm-font-size-base;
			line-height: $adm-font-height-md;

			&-row {
				@include theme($adm-primary-dark, false);
        display: flex;
        flex-direction: row;
				margin-left: $adm-pss-width-mini + 5.26rpx;
				transform: rotate(90deg);
				transform-origin: math.div($adm-font-size-base, 2) math.div($adm-font-size-base, 2);

				>view {
          font-family: pss-main;
					font-size: $adm-font-size-base;
				}
			}

			>view {
        font-family: pss-main;
				font-size: $adm-font-size-base;
			}
		}
	}
</style>
