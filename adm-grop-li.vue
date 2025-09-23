<template>
  <view class="grop-li">
    <slot></slot>
  </view>
</template>

<style lang="scss">
@import "./adm.scss";
.grop-li {
  display: flex;
  flex-direction: column;
  margin: $grop-spacing;
  gap: $grop-spacing;
}
</style>
