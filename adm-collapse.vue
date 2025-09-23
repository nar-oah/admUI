<template>
  <adm-message
    id="collapse"
    light="#E3B4B8"
    dark="#73575C"
    class="collapse"
    :height="height"
    :isRev="isOpen"
  >
    <view @click="handleOpen()">{{ title }}</view>
    <view id="open" class="open" v-show="isOpen">
      <slot v-if="isLoad"></slot>
    </view>
  </adm-message>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, computed, nextTick, onUpdated } from "vue";
import { openSeal, getRpx, endSeal } from "./adm";
import type { SealInfo } from "./adm";

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
const isOpen = ref(props.isOpen);
const isLoad = ref(false);
const openHeight = ref(collapseHeight);
const height = computed(() =>
  isOpen.value ? openHeight.value : collapseHeight,
);
let info: SealInfo = { icon: "展开", top: 0, height: 0 };

async function handleOpen() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    info.height == 0 && (await initCollapse());
    openSeal.value.push(info);
  } else {
    const id = openSeal.value.indexOf(info);
    openSeal.value.splice(id, 1);
  }
}
async function initCollapse() {
  await nextTick();
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
    endSeal.value = collapseRect.bottom;
  });
}
onUpdated(() => (isLoad.value = true));
</script>

<style scoped lang="scss">
.collapse {
  /* transition: max-height 0.3s ease-out; */
  /* will-change: max-height; */
  .open {
    position: absolute;
    top: 52.63rpx;
    left: -12.53rpx;
  }
}
</style>
