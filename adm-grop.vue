<template>
  <view id="gropContainer" class="container" :style="containerStyle">
    <adm-background :is-thin="true" :is-rev="true">
      {{ background }}
    </adm-background>
    <adm-column
      v-for="(item, index) in column"
      :key="index"
      :style="{ position: 'absolute', left: `${pssHeight * index}rpx` }"
      :height="rangeHeight * props.row.length"
      :isRev="true"
      @click="handleClick(index)"
    >
      {{ item }}
    </adm-column>
    <adm-message
      v-for="(item, index) in row"
      :key="index"
      :style="{ position: 'absolute', top: `${random[index]}rpx` }"
      :isGrop="true"
    >
      {{ item }}
    </adm-message>
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted } from "vue";
import { getRandom, getRpx, gropSeal } from "./adm";
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
    required: false,
  },
  row: {
    type: Array,
    required: true,
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
const pssHeight = 52.63;
const rangeHeight = computed(() => {
  const height = props.height / props.row.length || pssHeight * 2.2;
  const minHeight = props.min / props.row.length;
  return minHeight > height ? minHeight : height;
});
const containerStyle = computed(() => {
  return { "--height": `${rangeHeight.value * props.row.length}rpx` };
});
const random = computed(() => {
  const offRandom = Array.from({ length: props.row.length }, () =>
    props.isRandom ? getRandom(0, rangeHeight.value - pssHeight) : 0,
  );
  let preRandom = 0;
  return offRandom.map((item, index) => {
    const random = item + preRandom;
    const offBase = pssHeight * index + preRandom;
    preRandom = random;
    return random > offBase ? random : item + offBase;
  });
});

function initCollapse() {
  const query = uni.createSelectorQuery().in(componentInstance);
  query.select("#gropContainer").boundingClientRect();
  query.exec((res) => {
    const [containerRect] = res;
    gropSeal.value.push({
      top: getRpx(containerRect.top),
      height: rangeHeight.value * props.row.length,
    });
  });
}
function handleClick(index: number) {
  emit("click", index);
}
onMounted(() => initCollapse());
</script>

<style scoped lang="scss">
.container {
  position: relative;
  width: $adm-container-width;
  height: var(--height);
  background-color: $adm-container-color;
  overflow: hidden;
}
</style>
