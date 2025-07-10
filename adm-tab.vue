<template>
	<adm-fill :fill-text="fillText" style="position: fixed;">
		<view v-for="(item,index) in tabArr" :key="index">
			<adm-item :is-rev="current == index" @click="inClick(index)">{{item}}</adm-item>
		</view>
	</adm-fill>
</template>

<script lang="ts">
	export default {
		name: "admTab",
		emits: ['clickItem'],
		props: {
			fillText: {
				type: String,
				default: '委員會',
				required: false
			},
			tabArr: {
				type: Array,
				required: true
			},
			current: {
				type: Number,
				default: 0,
				required: false
			}
		},
		data() {
			return {

			};
		},
		methods: {
			inClick(index : number) {
				this.$emit("clickItem", index)
        // TODO: 点击切换无效，待修复
			}
		}
	}
</script>

<style>

</style>
