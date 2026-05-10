<template>
  <view id="fillWrap" class="wrap" :style="fillStyle">
    <slot></slot>
    <view class="fill">
      <text v-for="index in repeat" :key="index" class="text">{{ fillText }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { getCurrentInstance, defineProps, onMounted, ref, computed } from "vue";
import { screen, getRandom, getRpx } from "./adm";
import { line } from "./constants";
const props = defineProps({
  isRow: {
    type: Boolean,
    default: false,
    required: false,
  },
  fillText: {
    type: String,
    default: "委員會",
    required: false,
  },
  height: {
    type: Number,
    default: 0,
    required: false,
  },
});
const componentInstance = getCurrentInstance();
const bottom = ref(0);
const fillLineHeight = line.sm;
const screenHeight = computed(() =>
  props.isRow ? screen.value.width : screen.value.height,
);
const total = computed(() => {
  const height = props.height || screenHeight.value - bottom.value;
  return getRpx(height <= 0 ? 50 - height : height);
});
const repeat = computed(() => Math.ceil(total.value / fillLineHeight) + 2);
const fillStyle = computed(() => {
  return {
    "--height": `${total.value}rpx`,
    "--random": `-${getRandom(0, fillLineHeight)}rpx`,
    "--deg": `${props.isRow ? -90 : 0}deg`,
  };
});

function initFill() {
  const query = uni.createSelectorQuery().in(componentInstance);
  query.select("#fillWrap").boundingClientRect();
  query.exec((res) => {
    const [fillRect] = res;
    bottom.value = fillRect.top;
  });
}
onMounted(() => {
  initFill();
});
</script>

<style scoped lang="scss">
@import "./adm.scss";
.wrap {
  height: var(--height);
  width: $width-base;
  background-color: $light-primary;
  position: absolute;
  top: 0;
  overflow: hidden;
  transform: rotate(var(--deg));
  transform-origin: calc($width-base / 2) calc($width-base / 2);

  .fill {
    display: flex;
    flex-direction: column;
    width: $width-base - $spacing-mini;
    margin-left: $spacing-mini;
    margin-top: var(--random);

    .text {
      display: block;
      flex: 0 0 $line-sm;
      color: $dark-primary;
      font-family: adm-medium;
      font-size: $font-sm;
      letter-spacing: $spacing-mini;
      line-height: $line-sm;
      white-space: nowrap;
    }
  }
}
</style>
