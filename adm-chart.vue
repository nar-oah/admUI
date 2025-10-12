<template>
  <adm-grop :height="pssHeight" :icon="props.icon">
    <view class="chart-wrap">
      <adm-column
        :width="height.mini"
        type="bold"
        :isThin="true"
        :mainHeight="height.mini"
        @height="pssHeight = $event"
      >
        {{ props.categories.join("") }}
      </adm-column>
      <view class="chart-container" :style="{ width: chartWidth }">
        <view v-for="(item, index) in chartData" :key="index" class="chart-row">
          <view class="bar" :style="{ width: `${item.percentage}%` }"></view>
          <text class="label-text">{{ item.category }}</text>
        </view>
      </view>
    </view>
  </adm-grop>
</template>

<script setup lang="ts">
import { computed, ref, inject } from "vue";
import type { PropType } from "vue";
import { height, line, width } from "./constants";

const props = defineProps({
  categories: {
    type: Array as PropType<string[]>,
    required: true,
  },
  data: {
    type: Array as PropType<number[]>,
    required: true,
  },
  max: {
    type: Number,
    default: 0,
    required: false,
  },
  icon: {
    type: String,
    default: "密封",
    required: false,
  },
});
const pssHeight = ref(0);
const chartData = computed(() => {
  const maxVal = props.max > 0 ? props.max : Math.max(...props.data, 0);
  return props.data.map((value: number) => ({
    category: value,
    percentage: (maxVal == 0 ? 0 : value / maxVal) * 100,
  }));
});
const chartWidth = computed(() => {
  const defaultWidth = width.lg - height.mini;
  const getId = inject("Seal", () => 0);
  const isSeal = getId() != 0;
  const sealWidth = isSeal ? line.lg * 2 : height.mini;
  return `${defaultWidth - sealWidth}rpx`;
});
</script>

<style lang="scss" scoped>
@import "./adm.scss";
.chart-wrap {
  display: flex;
  flex-direction: row;
  position: absolute;

  .chart-container {
    display: flex;
    flex-direction: column;
    margin-top: ($height-mini - $spacing-base) / 2 + $font-mini;
    gap: $height-mini - $spacing-base;

    .chart-row {
      position: relative;
      width: 100%;
      height: $spacing-base;
      display: flex;
      align-items: center;

      .bar {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        background-color: $dark-primary;
        transition: width 0.5s ease-in-out;
      }
      .label-text {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
        color: $light-primary;
        font-size: $font-base;
        font-family: adm-bold;
      }
    }
  }
}
</style>
