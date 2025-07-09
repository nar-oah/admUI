<template>
	<view id="gropWrap" class="grop-wrap">
		<view class="logo">
			<adm-icons :is-random="false" class="icon">
        <slot></slot>
			</adm-icons>
			<adm-item class="pss" :height="grop.margin + grop.height" :is-justify="true">管理局</adm-item>
		</view>
		<view id="gropContainer" :class="[`container container-${grop.type}`]">
			<adm-item class="pss" :style="{'margin-top':`${grop.random[index]}rpx`}" :is-row="true" :height="grop.width"
				v-for="(item,index) in msgArr" :key="index">
				{{item}}
			</adm-item>
		</view>
	</view>
</template>

<script lang="ts">
	import adm from '../sdk/adm';
	export default {
		name: "admGrop",
		props: {
			isRandom: {
				type: Boolean,
				default: false,
				required: false
			},
			type: {
				type: String,
				default: '',
				required: false
			},
			msgArr: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				grop: {
					type: this.type ? this.type : this.getType(),
					width: 0,
					height: 0,
					margin: 0,
					random: [0]
				}
			};
		},
		mounted() {
			this.initDom()
			this.initPosition()
		},
		methods: {
			initDom() {
				const typeHeight = `${this.grop.type}Height`
        const query = uni.createSelectorQuery().in(this)

				if (!adm.grop.width || !adm.grop[typeHeight]) {
          query.select('#gropContainer').boundingClientRect((containerRect:any) => {
            adm.grop.width = containerRect.width
					  adm.grop[typeHeight] = containerRect.height
          }).exec()
				}
				if (!adm.grop.margin) {
          query.select('#gropWrap').boundingClientRect((wrapRect:any) => {
					  adm.grop.margin = wrapRect.height - adm.grop[typeHeight]
          }).exec()
				}

				this.grop.width = adm.grop.width
				this.grop.height = adm.grop[typeHeight]
				this.grop.margin = adm.grop.margin
			},
			initPosition() {
				const offRange = Math.ceil(this.grop.height / this.msgArr.length)
				const itemHeight = adm.item.wrap.width
				const offRandom = adm.getRandom(this.msgArr.length, 0, offRange - itemHeight)

				this.grop.random[0] = adm.px2rpx(offRandom[0])
				for (var i = 1; i < offRandom.length; i++) {
					offRandom[i] = offRandom[i] + offRandom[i - 1]
					const offBase = itemHeight * i
					this.grop.random[i] = adm.px2rpx(offRandom[i] > offBase ? offRandom[i] : offRandom[i] + offBase)
				}
			},
			getType() {
				if (this.msgArr.length <= 3) {
					return 'sm'
				} else if (this.msgArr.length <= 5) {
					return 'md'
				} else {
					return 'lg'
				}
			}
		}
	}
</script>

<style lang="scss">
	.grop-wrap {
    display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;

		.logo {
      display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			right: 0;
			z-index: 1;

			.pss {
				position: absolute;
			}

			.icon {
        display: flex;
        justify-content: center;
        align-items: center;
				width: $adm-font-height-lg * 2;
        overflow: hidden;
			}
		}

		.container {
			width: $adm-container-width;
			background-color: $adm-container-color;
			margin: $adm-grop-spacing 0;

			&-sm {
				height: $adm-height-sm;
			}

			&-md {
				height: $adm-height-md;
			}

			&-lg {
				height: $adm-height-lg;
			}

			.pss {
				position: absolute;
				transform: rotate(-90deg);
				transform-origin: right top;
        width: $adm-height-mini;
				margin-left: -$adm-height-mini;
			}
		}
	}
</style>
