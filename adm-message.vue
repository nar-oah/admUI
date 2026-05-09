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
      :type="props.type"
      :width="props.height + additionHeight"
      :mainHeight="isClick ? mainWidth : 0"
    >
      <view @click="isClick = !isClick">
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
  mainNum: {
    type: Number,
    default: 0,
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
  type: {
    type: String,
    default: "medium",
    required: false,
  },
  height: {
    type: Number,
    default: height.mini,
    required: false,
  },
});
const isClick = ref(false);
const mainNum = ref(props.mainNum || initMain("管理局").length);
const emits = defineEmits(["more"]);
const offset = computed(() => {
  const getOffset = inject("Grop", () => ref(null));
  return getOffset().value;
});
const messageWidth = computed(() =>
  offset.value != null ? width.lg : getRpx(screen.value.width),
);
const mainWidth = computed(() => {
  const defaultWidth = messageWidth.value - font.mini * 2;
  const getId = inject("Seal", () => 0);
  const isSeal = getId() != 0;
  const sealWidth = isSeal ? line.lg * 2 : 0;
  return defaultWidth - sealWidth;
});
const additionHeight = computed(() => {
  const lineNum = Math.floor(mainWidth.value / font.base);
  const additionLine = Math.floor(mainNum.value / lineNum);
  const additionNum = additionLine * font.base;
  emits("more", additionNum);
  return isClick.value ? additionNum : 0;
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
