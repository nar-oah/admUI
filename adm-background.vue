<template>
  <view>
    <!-- TODO: slot内为背景文字内容 -->
    <slot></slot>
  </view>
</template>

<script lang="ts">
  export default {
    name:"admBackground",
    props: {
      // TODO: isRev属性，为背景指定颜色为adm-bg-color或adm-bg-light，默认false（light）
      // TODO: isThin属性，为背景指定字体为文悦民国仿宋或文悦新恒古雅宋，默认false（文悦新恒古雅宋）
      // TODO: minRan与maxRan属性，为背景指定倾斜的最大角度与最小角度
    },
    data() {
      return {
      };
    }
  }
</script>

<style lang="scss">

</style>
<!-- INFO: 生成admUI美学的背景的组件 -->
