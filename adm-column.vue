<template>
  <view id="itemWrap" class="item-wrap" :style="inputStyles">
    <view class="border">
      <text id="itemBorder" class="text top">
        {{ border.text.repeat(border.repeat || 1) }}
      </text>
    </view>
    <view class="left-wrap">
      <view id="itemLeft" class="left" v-for="n in left.repeat || 1" :key="n">
        <text class="text">{{ leftText }}</text>
        <view class="seal">封</view>
      </view>
    </view>
    <view id="itemMain" class="main">
      <view v-if="height" v-for="(item, index) in main.split('')" :key="index">
        {{ item }}
      </view>
      <view v-else>
        <slot>管理局</slot>
      </view>
    </view>
    <view class="border">
      <text class="text bottom">
        {{ border.text.repeat(border.repeat || 1) }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, defineProps, ref, useSlots } from "vue";
import { getRandom } from "./adm";
import { light, dark, width, height, font } from "./constants";

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
  isThin: {
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
    default: 0,
    required: false,
  },
  width: {
    type: Number,
    default: width.base,
    required: false,
  },
});
const main = ref<string>(initMain("管理局"));
const wrap = {
  width: props.width,
  height: height.base * main.value.length + font.mini * 2,
};
const unit = {
  border: font.mini,
  left: font.mini,
  main: font.base,
};
const pssHeight = computed(() => props.height || wrap.height);
const border = computed(() => {
  const borderWidth = unit.border * (props.borderText.length + 0.5);
  return {
    text: props.borderText + "-",
    repeat: Math.ceil(props.width / borderWidth) + 1,
    topRandom: getRandom(-borderWidth, 0),
    bottomRandom: getRandom(-borderWidth, 0),
  };
});
const left = computed(() => {
  const leftHeight = (unit.left + 5.26) * props.leftText.length + width.mini;
  return {
    repeat: Math.ceil(pssHeight.value / leftHeight) + 1,
    random: getRandom(-leftHeight, 0),
  };
});
const inputStyles = computed(() => {
  return {
    "--fore-color": props.isRev ? props.light : props.dark,
    "--bg-color": props.isRev ? props.dark : props.light,
    "--width": `${props.width}rpx`,
    "--height": `${pssHeight.value}rpx`,
    "--top-random": `${border.value.topRandom}rpx`,
    "--left-random": `${left.value.random}rpx`,
    "--bottom-random": `${border.value.bottomRandom}rpx`,
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
@import "./adm.scss";
.item-wrap {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: var(--width);
  height: var(--height);
  overflow: hidden;
  background-color: var(--bg-color);

  .border {
    display: flex;
    align-items: center;
    overflow: hidden;

    .text {
      color: var(--fore-color);
      font-size: $font-mini;
      font-family: adm-regular;
      white-space: nowrap;
    }
    .top {
      margin-left: var(--top-random);
    }
    .bottom {
      margin-left: var(--bottom-random);
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
    flex-direction: column;
    justify-content: space-between;
    margin-left: $width-mini + 5.26rpx;
    width: $font-base;
    height: var(--height);
    line-height: $line-md;

    > view {
      font-family: adm-medium;
      font-size: $font-base;
    }
  }
}
</style>
