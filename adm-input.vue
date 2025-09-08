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
      <input class="text" type="text" :placeholder="main" />
    </view>
    <view class="border">
      <text class="text bottom">{{
        border.text.repeat(border.repeat || 1)
      }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, defineProps, onMounted, ref, useSlots } from "vue";
import { screen, item, getRandom, getPx } from "./adm";
import type { ItemInfo, ItemUnit, ItemWrap } from "./adm";

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
    default: 200,
    required: false,
  },
});
const main = ref<string>(initMain("管理局"));
const border = computed(() => {
  const borderWidth = item.value.unit.border * (props.borderText.length + 0.5);
  return {
    text: props.borderText + "-",
    repeat: Math.ceil(item.value.unit.border / borderWidth) + 1,
    topRandom: getRandom(-borderWidth, 0),
    bottomRandom: getRandom(-borderWidth, 0),
  };
});
const left = computed(() => {
  const leftHeight = item.value.unit.left * props.leftText.length;
  const height = getPx(props.width);
  return {
    repeat: Math.ceil(height / (leftHeight || height)) + 1,
    random: getRandom(-leftHeight, 0),
  };
});
const inputStyles = computed(() => {
  return {
    "--fore-color": props.isRev ? props.light : props.dark,
    "--bg-color": props.isRev ? props.dark : props.light,
    "--height": `${props.width}rpx`,
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
function initItem() {
  if (item.value.updated != screen.value.width) {
    // @ts-ignore
    const query = uni.createSelectorQuery().in(this);
    query.select("#itemWrap").boundingClientRect();
    query.select("#itemBorder").boundingClientRect();
    query.select("#itemLeft").boundingClientRect();
    query.select("#itemMain").boundingClientRect();
    query.exec((res) => {
      const [wrapRect, borderRect, leftRect, mainRect] = res;
      const updateWrap: ItemWrap = {
        width: wrapRect.height,
        height: borderRect.width * 2,
      };
      const updateUnit: ItemUnit = {
        border: borderRect.height / props.borderText.length + 0.5,
        left: leftRect.height / props.leftText.length,
        main: mainRect.width / main.value.length,
      };
      const updateItem: ItemInfo = {
        updated: screen.value.width,
        wrap: updateWrap,
        unit: updateUnit,
      };
      item.value = updateItem;
    });
  }
}
onMounted(() => initItem());
</script>

<style scoped lang="scss">
@import "./adm.scss";
.item-wrap {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: $height-mini;
  height: var(--height);
  overflow: hidden;
  background-color: var(--bg-color);

  .border {
    display: flex;
    align-items: center;
    height: $font-mini;
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
    flex-direction: row;
    margin-left: $width-mini + 5.26rpx;
    height: var(--height);
    width: var(--height);

    .text {
      font-family: adm-medium;
      font-size: $font-base;
      width: 100%;
      transform: rotate(90deg);
      transform-origin: calc($font-base / 2) calc($font-base / 2);

      :deep(.uni-input-placeholder) {
        color: var(--fore-color);
        opacity: 0.8;
      }
      :deep(.uni-input-wrapper) {
        height: $font-base;
      }
    }
  }
}
</style>
