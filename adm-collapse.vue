<template>
  <adm-message
    id="collapse"
    class="collapse"
    :mainNum="props.title.length"
    :light="light.primary"
    :dark="light.secondary"
    :height="collapseHeight"
    :isRev="isOpen"
    :isWrap="true"
    @more="updateHeight($event)"
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
import { ref, getCurrentInstance, computed, nextTick, onUpdated } from "vue";
import { openSeal, getRpx, endSeal } from "./adm";
import type { SealInfo } from "./adm";
import { light, height, spacing } from "./constants";

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
const isOpen = ref(props.isOpen);
const isLoad = ref(false);
const additionHeight = ref(0);
const openHeight = ref(height.mini);
const collapseHeight = computed(() =>
  isOpen.value ? openHeight.value : height.mini,
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
    const minHeight = height.sm + spacing.base;
    const totalHeight = getRpx(openRect.height + collapseRect.height);
    const isMin = minHeight > totalHeight;
    openHeight.value = isMin ? minHeight : totalHeight;
    info.top = getRpx(collapseRect.top);
    info.height = isMin ? minHeight - height.mini : getRpx(openRect.height);
    info.height += additionHeight.value;
    endSeal.value = collapseRect.bottom;
  });
}
function updateHeight(addHeight: number) {
  additionHeight.value = addHeight;
}
onUpdated(() => (isLoad.value = true));
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
