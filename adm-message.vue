<template>
  <view class="message-wrap">
    <adm-row
      :isThin="true"
      :height="width"
      :borderText="borderText"
      :leftText="leftText"
      :isRev="isRev"
      :light="light"
      :dark="dark"
    >
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
