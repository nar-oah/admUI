<template>
  <view>
    <!-- TODO: slot内为宫格项一级内容 -->
    <slot></slot>
  </view>
</template>

<script lang="ts">
  export default {
    name:"admGridItem",
    data() {
      return {
      };
    }
  }
</script>

<style lang="scss">
/* INFO: 内容整体的长度与高度由dom获取，随机体现在内容的长度与高度减去宫格的长度与高度的值为位移的随机偏移，再加上随机的旋转偏移0-360度 */
/* INFO: 宫格的大小由grid初始化时获取*/
</style>
<!-- INFO: 生成admUI美学的宫格的项的组件 -->
