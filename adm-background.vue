<template>
  <view class="background-wrap" :style="backgroundStyles">
    <view class="text">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getRandom } from "./adm";
import { light, dark, font } from "./constants";

const props = defineProps({
  isRev: {
    type: Boolean,
    default: false,
    required: false,
  },
  isThin: {
    type: Boolean,
    default: false,
    required: false,
  },
  minRan: {
    type: Number,
    default: -10,
    required: false,
  },
  maxRan: {
    type: Number,
    default: 10,
    required: false,
  },
  light: {
    type: String,
    default: light.background,
    required: false,
  },
  dark: {
    type: String,
    default: dark.background,
    required: false,
  },
});
const backgroundStyles = computed(() => {
  return {
    "--wrap-deg": `${getRandom(props.minRan, props.maxRan)}deg`,
    "--wrap-top": `${getRandom(0, 20)}rpx`,
    "--wrap-left": `${getRandom(0, 20)}rpx`,
    "--text-font": props.isThin ? "adm-thin" : "adm-blod",
    "--text-size": `${props.isThin ? font.md : font.bg}rpx`,
    "--text-color": props.isRev ? props.dark : props.light,
  };
});
</script>

<style scoped lang="scss">
.background-wrap {
  position: absolute;
  height: 120%;
  width: 120%;
  transform: rotate(var(--wrap-deg));
  margin-top: var(--wrap-top);
  margin-left: var(--wrap-left);
  overflow: hidden;

  .text {
    font-family: var(--text-font);
    font-size: var(--text-size);
    color: var(--text-color);
  }
}
</style>
