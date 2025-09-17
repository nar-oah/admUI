<template>
  <view class="list-wrap">
    <adm-fill style="position: absolute"></adm-fill>
    <adm-icons
      v-for="item in openList"
      :isPss="true"
      :height="item.height"
      :style="{ position: 'absolute', top: `${item.top}rpx` }"
    >
      展开
    </adm-icons>
  </view>
  <slot></slot>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { collapseOpen } from "./adm";

const openList = computed(() => {
  const sortList = collapseOpen.value.toSorted((a, b) => a.top - b.top);
  let cumulativeTop = 0;
  return sortList.map((item) => {
    const collapseHeight = 52.63;
    const top = item.top + cumulativeTop;
    const height = collapseHeight + item.height;
    cumulativeTop += item.height;
    return {
      top: top,
      height: height,
    };
  });
});
</script>

<style scoped lang="scss">
@import "./adm.scss";
.list-wrap {
  display: flex;
  justify-content: center;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  width: $line-lg * 2;
}
</style>
