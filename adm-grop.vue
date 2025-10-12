<template>
  <view id="gropContainer" class="wrap" :style="containerStyle">
    <view class="container">
      <adm-background :is-thin="true" :is-rev="true">
        {{ background }}
      </adm-background>
      <adm-column
        v-for="(item, index) in column"
        :key="index"
        :style="{ position: 'absolute', left: `${height.mini * index}rpx` }"
        :height="containerHeight"
        :isRev="true"
        @click="emit('click', index)"
      >
        {{ item }}
      </adm-column>
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { getCurrentInstance, inject, provide, useSlots } from "vue";
import { computed, onMounted } from "vue";
import { getRandom, getRpx, addSeal } from "./adm";
import { height, spacing } from "./constants";
const props = defineProps({
  isRandom: {
    type: Boolean,
    default: true,
    required: false,
  },
  height: {
    type: Number,
    default: 0,
    required: false,
  },
  min: {
    type: Number,
    default: 245.61,
    required: false,
  },
  column: {
    type: Array,
    default: [],
    required: false,
  },
  icon: {
    type: String,
    default: "密封",
    required: false,
  },
  background: {
    type: String,
    default:
      "APA-0032為由487個非週期性擬態晶體構成的動態集合體，其外部可見結構以0.5Hz頻率在正十二面體與超立方體間拓樸轉換。光譜分析揭示內部存在量子化鋁鎳鈷合金核心（質量波動於2.3-17.4g/cm³區間），在第7次XK級現實重建實驗中曾記錄到其表面析出類拜占庭紋章學符號（現歸類為eVELL-32型非典型語素）。接觸性活化測試顯示，目標會在目標生物前額葉產生持續13毫秒的β-輻射脈衝，引發顳葉持續性情境復現現象。 2024年1月15日事故報告中，D-4421在實驗後72小時內準確繪製出西元前539年巴比倫城牆的三維定位座標（準確率98.73%），此能力於暴露120小時後隨實驗體腦組織玻化消失。",
    required: false,
  },
});
const componentInstance = getCurrentInstance();
const emit = defineEmits(["click"]);
const slots = useSlots();
const getId = inject("Seal", () => 0);
let offsetCount = 0;
const slotNodes = computed(() => {
  const slotArr = slots.default ? slots.default() : [];
  return slotArr.filter(
    (item) => typeof item.type === "object" || typeof item.type === "string",
  );
});
const messageNum = computed(() => slotNodes.value.length);
const rangeHeight = computed(() => {
  const pssHeight = props.height / messageNum.value || height.mini * 1.9;
  const minHeight = props.min / messageNum.value;
  return minHeight > pssHeight ? minHeight : pssHeight;
});
const containerHeight = computed(
  () => props.height || rangeHeight.value * messageNum.value,
);
const random = computed(() => {
  const offRandom = Array.from({ length: messageNum.value }, () =>
    props.isRandom ? getRandom(0, rangeHeight.value - height.mini) : 0,
  );
  let preRandom = 0;
  return offRandom.map((item, index) => {
    const random = item + preRandom;
    const offBase = height.mini * index + preRandom;
    preRandom = random;
    return random > offBase ? random : item + offBase;
  });
});
const containerStyle = computed(() => {
  return {
    "--wrap-height": `${containerHeight.value + spacing.base * 2}rpx`,
    "--container-height": `${containerHeight.value}rpx`,
  };
});

function getOffset() {
  const index = offsetCount;
  offsetCount++;
  return computed(() => random.value[index]);
}
function initCollapse() {
  const query = uni.createSelectorQuery().in(componentInstance);
  query.select("#gropContainer").boundingClientRect();
  query.exec((res) => {
    const [containerRect] = res;
    addSeal({
      icon: props.icon,
      id: getId(),
      top: getRpx(containerRect.top),
      height: containerHeight.value + spacing.base * 2,
      offset: 0,
    });
  });
}
onMounted(() => initCollapse());
provide("Grop", getOffset);
</script>

<style scoped lang="scss">
.wrap {
  width: 100vw;
  height: var(--wrap-height);
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    position: relative;
    width: $width-lg;
    height: var(--container-height);
    background-color: $light-container;
    overflow: hidden;
  }
}
</style>
