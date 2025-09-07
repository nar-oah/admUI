<template>
  <view id="itemWrap" class="item-wrap" :style="inputStyles">
    <view class="border">
      <text id="itemBorder" class="text">
        {{ borderText.repeat(border.repeat) }}
      </text>
    </view>
    <view id="itemLeft" class="left-wrap">
      <view class="left" v-for="n in left.repeat" :key="n">
        <text class="text">{{ leftText }}</text>
        <view class="seal">封</view>
      </view>
    </view>
    <view id="itemMain" class="main">
      <input class="text" type="text" :placeholder="main" />
    </view>
    <view class="border">
      <text class="text">{{ borderText.repeat(border.repeat) }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, defineProps, ref, useSlots } from "vue";
import { getRpx } from "./adm";

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
  width: {
    type: Number,
    default: 100,
    required: false,
  },
});
const inputStyles = computed(() => {
  return {
    "--fore-color": props.isRev ? props.light : props.dark,
    "--bg-color": props.isRev ? props.dark : props.light,
    "--height": `${getRpx(props.width)}rpx`,
    "--border-random": `${5}rpx`,
    "--left-random": `${5}rpx`,
  };
});
const defaultMain = "管理局";
const slots = useSlots();
const vnodes = slots.default ? slots.default() : [{ children: defaultMain }];
const children = vnodes[0].children;
const main = ref<string>(typeof children === "string" ? children : defaultMain);
</script>

<style scoped lang="scss">
@import "./adm.scss";
.item-wrap {
  display: flex;
  flex-wrap: wrap;
  width: $width-base;
  height: var(--height);
  overflow: hidden;
  background-color: var(--bg-color);

  .border {
    display: flex;
    align-items: center;
    overflow: hidden;

    .text {
      margin-left: var(--border-random);
      color: var(--fore-color);
      font-size: $font-mini;
      font-family: adm-regular;
      white-space: nowrap;
    }
  }

  .left-wrap {
    height: var(--height);
    position: absolute;
    overflow: hidden;

    .left {
      display: flex;
      flex-direction: column;
      position: relative;
      align-items: center;
      top: var(--left-random);
      width: $width-mini;
      overflow: hidden;

      .text {
        color: var(--fore-color);
        font-family: adm-light;
        font-size: $font-mini;
        width: $font-mini;
        line-height: $width-mini;
      }

      .seal {
        color: var(--bg-color);
        background-color: var(--fore-color);
        display: flex;
        justify-content: center;
        align-items: center;
        width: $width-mini;
        height: $width-mini;
        border-radius: 50%;
        font-family: adm-light;
        font-size: $font-mini;
      }
    }
  }

  .main {
    color: var(--fore-color);
    display: flex;
    flex-direction: row;
    margin-left: $width-mini + 5.26rpx;

    .text {
      position: absolute;
      font-family: adm-medium;
      font-size: $font-base;
      transform: rotate(90deg);
      transform-origin: calc($font-base / 2) calc($font-base / 2);

      :deep(.uni-input-placeholder) {
        color: var(--fore-color);
        opacity: 0.8;
      }
      :deep(.uni-input-wrapper) {
        height: $font-base;
        width: var(--height);
      }
    }
  }
}
</style>
