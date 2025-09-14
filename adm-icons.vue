<template>
  <view class="icon">
    <text class="text" :style="iconsStyles">
      <slot>字符</slot>
    </text>
    <adm-column v-show="isPss" class="pss" :height="height"></adm-column>
  </view>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getRandom } from "./adm";
const props = defineProps({
  isRow: {
    type: Boolean,
    default: true,
    required: false,
  },
  isSelect: {
    type: Boolean,
    default: true,
    required: false,
  },
  isRandom: {
    type: Boolean,
    default: false,
    required: false,
  },
  isPss: {
    type: Boolean,
    default: false,
    required: false,
  },
  height: {
    type: Number,
    default: 280.7,
    required: false,
  },
  light: {
    type: String,
    default: "#73575C",
    required: false,
  },
  dark: {
    type: String,
    default: "#EE3F4D",
    required: false,
  },
  pss: {
    type: String,
    default: "#E3B4B8",
    required: false,
  },
});
const iconsStyles = computed(() => {
  const random = props.isRandom ? getRandom(-10, 10) : 0;
  const angle = props.isRow ? 90 : 0;
  return {
    "--angle": `rotate(${angle + random}deg)`,
    "--height": `${props.height}rpx`,
    "--color": props.isSelect ? props.dark : props.light,
  };
});
</script>

<style lang="scss">
@import "./adm.scss";
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: $line-lg * 2;

  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    width: $font-lg;
    height: var(--height);
    font-family: adm-icon;
    font-size: $font-lg;
    line-height: $line-lg;
    color: var(--color);
    transform: var(--angle);
  }

  .pss {
    position: absolute;
  }
}
</style>
