<template>
  <view class="list-wrap">
    <adm-fill style="position: absolute" :height="fillHeight"></adm-fill>
    <adm-icons
      v-for="item in list"
      :isPss="true"
      :height="item.height"
      :style="{ position: 'absolute', top: `${item.top}rpx` }"
      :isRandom="props.isRandom"
    >
      {{ item.icon }}
    </adm-icons>
  </view>
  <view class="slot">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { endSeal, openSeal, gropSeal, screen, sealHeight } from "./adm";
import type { SealInfo } from "./adm";

const props = defineProps({
  isRandom: {
    type: Boolean,
    default: true,
    required: false,
  },
});
const stageHeight = ref(0);
const fillHeight = computed(() => {
  const height = sealHeight.value + stageHeight.value;
  return height > screen.value.height ? height : endSeal.value;
});
const openList = computed((): SealInfo[] => {
  const sortList = openSeal.value.slice().sort((a, b) => a.top - b.top);
  let cumulativeTop = 0;
  const list = sortList.map((item) => {
    const top = item.top + cumulativeTop;
    const height = 52.63 + item.height;
    cumulativeTop += item.height;
    return { icon: item.icon, top: top, height: height };
  });
  stageHeight.value = cumulativeTop;
  return list;
});
const gropList = computed((): SealInfo[] => {
  return gropSeal.value.map((item: SealInfo, index: number) => {
    const offset = index == 0 ? 34.88 : 17.44;
    return {
      icon: item.icon,
      top: item.top - offset,
      height: item.height + 34.88,
    };
  });
});
const list = computed((): SealInfo[] => [...openList.value, ...gropList.value]);
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
.slot {
  position: absolute;
  z-index: 0;
}
</style>
