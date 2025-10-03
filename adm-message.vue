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
      :width="props.height + additionHeight"
      :mainHeight="isClick ? mainWidth : 0"
    >
      <view @click="isClick = props.isWrap ? !isClick : false">
        <slot>信息</slot>
      </view>
      <view class="info">
        <slot name="info"></slot>
      </view>
    </adm-row>
  </view>
</template>

<script setup lang="ts">
import { computed, defineProps, inject, ref, useSlots } from "vue";
import { screen, getRpx } from "./adm";
import { dark, font, height, light, line, width } from "./constants";

const props = defineProps({
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
  isWrap: {
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
const isClick = ref(false);
const mainNum = inject("MainNum", initMain("管理局").length);
const update = inject("UpdateHeight", (date: number) => date);
const offset = computed(() => {
  const getDefault = () => ref(null);
  const getOffset = inject("Grop", getDefault);
  return getOffset().value;
});
const messageWidth = computed(() =>
  offset.value != null ? width.lg : getRpx(screen.value.width),
);
const mainWidth = computed(() => {
  const defaultWidth = messageWidth.value - font.mini * 2;
  const isSeal = inject("Seal", false);
  const sealWidth = isSeal && props.isWrap ? line.lg * 2 : 0;
  return defaultWidth - sealWidth;
});
const additionHeight = computed(() => {
  const lineNum = Math.floor(mainWidth.value / font.base);
  const additionLine = Math.floor(mainNum / lineNum);
  const res = isClick.value ? additionLine * font.base : 0;
  update(additionLine * font.base);
  return res;
});
const messageStyles = computed(() => {
  return {
    "--position": offset.value ? "absolute" : "",
    "--height": `${props.height}rpx`,
    "--offset": `${offset.value ?? 0}rpx`,
    "--origin": `${props.height / 2}rpx`,
    "--info": `${additionHeight.value}rpx`,
    "--index": additionHeight.value == 0 ? 0 : 1,
  };
});

function initMain(defaultMain: string): string {
  const slots = useSlots();
  const vnodes = slots.default ? slots.default() : [{ children: defaultMain }];
  const children = vnodes[0].children;
  return typeof children === "string" ? children : defaultMain;
}
</script>

<style scoped lang="scss">
.message-wrap {
  position: var(--position);
  transform: rotate(-90deg);
  transform-origin: var(--origin) var(--origin);
  height: var(--height);
  width: var(--height);
  top: var(--offset);
  margin-top: var(--info);
  z-index: var(--index);
  .info {
    position: absolute;
    top: var(--info);
  }
}
</style>
