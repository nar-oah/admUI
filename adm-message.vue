<template>
  <view class="message-wrap">
    <adm-row :isThin="true" :height="width">
      <slot></slot>
    </adm-row>
  </view>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { screen, getRpx } from "./adm";

const props = defineProps({
  isGrop: {
    type: Boolean,
    default: false,
    required: false,
  },
});
const width = computed(() =>
  props.isGrop ? 684.21 : getRpx(screen.value.width),
);
</script>

<style scoped lang="scss">
@import "./adm.scss";
.message-wrap {
  position: absolute;
  transform: rotate(-90deg);
  transform-origin: right top;
  margin-left: -$height-mini;
}
</style>
