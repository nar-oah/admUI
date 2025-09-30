<template>
  <view class="message-wrap" :style="messageStyles">
    <adm-row
      :isThin="true"
      :height="messageWidth"
      :borderText="borderText"
      :leftText="leftText"
      :isRev="props.isRev"
      :light="props.light"
      :dark="props.dark"
      :width="props.height"
    >
      <slot>信息</slot>
    </adm-row>
  </view>
</template>

<script setup lang="ts">
import { computed, defineProps, inject, ref } from "vue";
import { screen, getRpx } from "./adm";
import { dark, height, light, width } from "./constants";

const props = defineProps({
  isGrop: {
    type: Boolean,
    default: false,
    required: false,
  },
  borderText: {
    type: String,
    default: "委員會",
    required: false,
  },
  leftText: {
    type: String,
    default: "管理局委員會",
    required: false,
  },
  isRev: {
    type: Boolean,
    default: false,
    required: false,
  },
  light: {
    type: String,
    default: light.primary,
    required: false,
  },
  dark: {
    type: String,
    default: dark.primary,
    required: false,
  },
  height: {
    type: Number,
    default: height.mini,
    required: false,
  },
});
const messageWidth = computed(() =>
  props.isGrop ? width.lg : getRpx(screen.value.width),
);
const messageStyles = computed(() => {
  const defaultOffset = ref(0);
  const getDefault = () => defaultOffset;
  const getOffset = inject("Grop", getDefault);
  const offset = getOffset();
  return {
    "--position": offset.value ? "absolute" : "",
    "--height": `${props.height}rpx`,
    "--offset": `${offset.value}rpx`,
    "--origin": `${props.height / 2}rpx`,
  };
});
</script>

<style scoped lang="scss">
.message-wrap {
  position: var(--position);
  transform: rotate(-90deg);
  transform-origin: var(--origin) var(--origin);
  height: var(--height);
  width: var(--height);
  top: var(--offset);
}
</style>
