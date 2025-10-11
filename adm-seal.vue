<template>
  <view class="list-wrap">
    <adm-fill style="position: absolute" :height="fillHeight"></adm-fill>
    <adm-icons
      v-for="item in sealList"
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
import { computed, provide } from "vue";
import { screen, sealHeight, sealList } from "./adm";

const props = defineProps({
  isRandom: {
    type: Boolean,
    default: true,
    required: false,
  },
});
const fillHeight = computed(() => {
  const height = screen.value.height - sealHeight.value;
  return height < 0 ? sealHeight.value + 50 : screen.value.height;
});
let id = 0;

function getId(): number {
  id++;
  return id;
}
provide("Seal", getId);
</script>

<style scoped lang="scss">
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
