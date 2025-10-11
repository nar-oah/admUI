<template>
  <adm-message
    id="collapse"
    class="collapse"
    :mainNum="props.title.length"
    :light="light.primary"
    :dark="light.secondary"
    :height="collapseHeight"
    :isRev="isOpen"
    @more="additionHeight = $event"
  >
    <view @click="handleOpen()">{{ title }}</view>
    <template #info>
      <view id="open" class="open" v-show="isOpen">
        <slot v-if="isLoad"></slot>
      </view>
    </template>
  </adm-message>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, computed, nextTick, inject } from "vue";
import { addSeal, deleteSeal, getRpx } from "./adm";
import type { SealInfo } from "./adm";
import { light, height, spacing } from "./constants";
import { onPageScroll } from "@dcloudio/uni-app";

const props = defineProps({
  title: {
    type: String,
    default: "管理局",
  },
  icon: {
    type: String,
    default: "展开",
    required: false,
  },

  //FIX: isOpen存在bug无法使用
  isOpen: {
    type: Boolean,
    default: false,
  },
});
const componentInstance = getCurrentInstance();
const isOpen = ref(props.isOpen);
const isLoad = ref(false);
const scrollTop = ref(0);
const additionHeight = ref(0);
const openHeight = ref(height.mini);
const collapseHeight = computed(() =>
  isOpen.value ? openHeight.value : height.mini,
);
const getId = inject("Seal", () => 0);
let info: SealInfo = {
  icon: props.icon,
  id: getId(),
  top: 0,
  height: 0,
  offset: -50,
};

async function handleOpen() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    !isLoad.value && (isLoad.value = true);
    await initCollapse();
    addSeal(info);
  } else {
    deleteSeal(info.id, 1);
  }
}
async function initCollapse() {
  await nextTick();
  const query = uni.createSelectorQuery().in(componentInstance);
  query.select("#collapse").boundingClientRect();
  query.select("#open").boundingClientRect();
  query.exec((res) => {
    const [collapseRect, openRect] = res;
    const collapseTop = getRpx(collapseRect.top + scrollTop.value);
    info.top != collapseTop && (info.top = collapseTop);
    if (!info.height) {
      const minHeight = height.sm + spacing.base;
      const totalHeight = getRpx(openRect.height + collapseRect.height);
      const isMin = minHeight > totalHeight;
      openHeight.value = isMin ? minHeight : totalHeight;
      info.height = isMin ? minHeight : getRpx(openRect.height) + height.mini;
      info.height += additionHeight.value;
    }
  });
}
onPageScroll((e) => {
  scrollTop.value = e.scrollTop;
});
</script>

<style scoped lang="scss">
/* .collapse { */
/* transition: max-height 0.3s ease-out; */
/* will-change: max-height; */
.open {
  position: absolute;
  top: 52.63rpx;
  left: -12.53rpx;
}
/* } */
</style>
