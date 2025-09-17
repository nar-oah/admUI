<template>
  <view id="fillWrap" class="wrap" :style="fillStyle">
    <slot></slot>
    <view class="fill">
      <text id="fillText" class="text">
        {{ fillText.repeat(repeat) }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { getCurrentInstance, defineProps, onMounted, ref, computed } from "vue";
import { screen, getRandom, getRpx } from "./adm";
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
const screenHeight = computed(() =>
  props.isRow ? screen.value.width : screen.value.height,
);
const total = computed(() => {
  const height = props.height || screenHeight.value - bottom.value;
  return getRpx(height <= 0 ? 50 - height : height);
});
const text = ref(total.value);
const repeat = computed(() => Math.ceil(total.value / text.value) + 1);
const fillStyle = computed(() => {
  return {
    "--height": `${total.value}rpx`,
    "--random": `-${getRandom(0, text.value)}rpx`,
    "--deg": `${props.isRow ? -90 : 0}deg`,
  };
});

function initFill() {
  const query = uni.createSelectorQuery().in(componentInstance);
  query.select("#fillText").boundingClientRect();
  query.select("#fillWrap").boundingClientRect();
  query.exec((res) => {
    const [textRect, fillRect] = res;
    const direction = props.isRow ? textRect.width : textRect.height;
    text.value = getRpx(direction) / repeat.value;
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
  background-color: $primary-light;
  position: absolute;
  top: 0;
  overflow: hidden;
  transform: rotate(var(--deg));
  transform-origin: calc($width-base / 2) calc($width-base / 2);

  .fill {
    width: $width-base - $font-spacing;
    margin-left: $font-spacing;

    .text {
      display: flex;
      overflow: hidden;
      color: $primary-dark;
      font-family: pss-main;
      font-size: $font-sm;
      letter-spacing: $font-spacing;
      line-height: $line-sm;
      margin-top: var(--random);
    }
  }
}
</style>
