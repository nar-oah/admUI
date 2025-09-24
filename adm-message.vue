<template>
  <view class="message-wrap" :style="messageStyles">
    <adm-row
      :isThin="true"
      :height="width"
      :borderText="borderText"
      :leftText="leftText"
      :isRev="isRev"
      :light="light"
      :dark="dark"
      :width="height"
    >
      <slot>信息</slot>
    </adm-row>
  </view>
</template>

<script setup lang="ts">
import { computed, defineProps, inject, ref } from "vue";
import { screen, getRpx } from "./adm";

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
    default: "#E3B4B8",
    required: false,
  },
  dark: {
    type: String,
    default: "#EE3F4D",
    required: false,
  },
  height: {
    type: Number,
    default: 52.63,
    required: false,
  },
});
const width = computed(() =>
  props.isGrop ? 684.21 : getRpx(screen.value.width),
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
@import "./adm.scss";
.message-wrap {
  position: var(--position);
  transform: rotate(-90deg);
  transform-origin: var(--origin) var(--origin);
  height: var(--height);
  width: var(--height);
  top: var(--offset);
}
</style>
