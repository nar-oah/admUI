<template>
  <view class="bottom-wrap">
    <adm-column class="pss" :height="width">{{ props.pssText }}</adm-column>
    <view class="bottom">
      <adm-icons
        :style="{ width: `${font.lg}rpx` }"
        v-for="(item, index) in props.bottomArr"
        :key="index"
        :is-row="false"
        :is-random="false"
        :is-select="props.current == index"
        @click="emit('click', index)"
      >
        {{ item }}
      </adm-icons>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getRpx, screen } from "./adm";
import { font } from "./constants";

const emit = defineEmits(["click"]);
const props = defineProps({
  pssText: {
    type: String,
    default: "管理局",
    required: false,
  },
  bottomArr: {
    type: Array,
    required: true,
  },
  current: {
    type: Number,
    default: 0,
    required: false,
  },
});
const width = ref(getRpx(screen.value.width));
</script>

<style scoped lang="scss">
@import "./adm.scss";
.bottom-wrap {
  display: flex;
  position: fixed;
  width: 100%;
  bottom: 0;

  .pss {
    position: absolute;
    transform: rotate(-90deg);
    transform-origin: left top;
    top: $line-lg + calc($width-base / 2);
    z-index: 1;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    width: 100%;
    z-index: 0;
  }
}
</style>
