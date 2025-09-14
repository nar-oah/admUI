<template>
  <adm-message
    id="collapse"
    light="#E3B4B8"
    dark="#73575C"
    class="collapse"
    :style="{ maxHeight: `${height}rpx` }"
    :height="height"
    :isRev="isOpen"
    @click="handleOpen()"
  >
    <view>{{ title }}</view>
    <view id="open" class="open" v-show="isOpen">
      <slot></slot>
    </view>
  </adm-message>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { collapseOpen, getRpx } from "./adm";
import type { CollapseInfo } from "./adm";

const props = defineProps({
  title: {
    type: String,
    default: "管理局",
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});
const componentInstance = getCurrentInstance();
const collapseHeight = 52.63;
const isOpen = ref(true);
const openHeight = ref(collapseHeight);
const height = computed(() =>
  isOpen.value ? openHeight.value : collapseHeight,
);
let info: CollapseInfo = { top: 0, height: 0 };

function handleOpen() {
  if (!isOpen.value) {
    collapseOpen.value.push(info);
  } else {
    const id = collapseOpen.value.indexOf(info);
    collapseOpen.value.splice(id, 1);
  }
  isOpen.value = !isOpen.value;
}
function initCollapse() {
  //INFO: 若高度获取存在问题考虑加入nextTick
  const query = uni.createSelectorQuery().in(componentInstance);
  query.select("#collapse").boundingClientRect();
  query.select("#open").boundingClientRect();
  query.exec((res) => {
    const [collapseRect, openRect] = res;
    const minHeight = 280.7;
    const totalHeight = getRpx(openRect.height + collapseRect.height);
    const isMin = minHeight > totalHeight;
    openHeight.value = isMin ? minHeight : totalHeight;
    info.top = getRpx(collapseRect.top);
    info.height = isMin ? minHeight - collapseHeight : getRpx(openRect.height);
    isOpen.value = props.isOpen;
  });
}
onMounted(() => initCollapse());
</script>

<style scoped lang="scss">
.collapse {
  transition: max-height 0.3s ease-out;
  will-change: max-height;
  .open {
    position: absolute;
    top: 52.63rpx;
    left: -12.53rpx;
  }
}
</style>
