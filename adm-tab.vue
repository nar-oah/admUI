<template>
	<adm-fill :fill-text="fillText" style="position: fixed;">
		<view v-for="(item,index) in tabArr" :key="index">
			<adm-item :is-rev="current == index" @click="inClick(index)">{{item}}</adm-item>
		</view>
	</adm-fill>
</template>

<script lang="ts">
  import adm from '../sdk/adm';
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
    mounted() {
      adm.tab = true
    },
		methods: {
			inClick(index : number) {
				this.$emit("clickItem", index)
			}
		}
	}
</script>

<style>

</style>
