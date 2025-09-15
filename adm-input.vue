<template>
  <adm-message
    :isGrop="true"
    :borderText="props.borderText"
    :leftText="props.leftText"
    :isRev="rev"
    :light="props.light"
    :dark="props.dark"
    :height="52.63"
  >
    <input
      class="slot"
      type="text"
      :placeholder="main"
      @focus="rev = true"
      @blur="rev = false"
    />
  </adm-message>
</template>

<script setup lang="ts">
import { defineProps, ref, useSlots } from "vue";

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
const main = ref<string>(initMain("管理局"));
const rev = ref<boolean>(props.isRev);

function initMain(defaultMain: string): string {
  const slots = useSlots();
  const vnodes = slots.default ? slots.default() : [{ children: defaultMain }];
  const children = vnodes[0].children;
  return typeof children === "string" ? children : defaultMain;
}
</script>

<style scoped lang="scss">
@import "./adm.scss";
.slot {
  font-family: adm-medium;
  font-size: $font-base;

  :deep(.uni-input-placeholder) {
    color: var(--fore-color);
    opacity: 0.8;
  }
  :deep(.uni-input-wrapper) {
    height: $font-base;
  }
}
</style>
