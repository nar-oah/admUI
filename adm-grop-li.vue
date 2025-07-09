<template>
	<view class="grop-li">
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

			};
		},
		mounted() {
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
