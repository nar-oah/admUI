<template>
	<view>
    <!-- TODO: slot内为宫格的项 -->
    <slot></slot>
	</view>
</template>

<script lang="ts">
	export default {
		name: "admGrid",
    props: {
      // TODO: type属性，每个宫格项的类别，可能的竖向pss内容
      // TODO: name属性，每个宫格项的名字，可能的横向pss内容
      // TODO: isFill属性，决定填充方式是使用fill还是按照最后的内容填充
    },
		data() {
			return {
			};
		}
	}
</script>

<style lang="scss">

</style>
<!-- INFO: 生成admUI美学的宫格的组件 -->
