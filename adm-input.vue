<template>
  <adm-message type="bold" :isGrop="true" :isRev="rev" :mainNum="main.length">
    <input
      class="slot"
      type="text"
      :placeholder="main"
      @focus="rev = true"
      @blur="rev = false"
      @confirm="handleInput($event.detail.value)"
    />
  </adm-message>
</template>

<script setup lang="ts">
import { defineProps, ref, useSlots } from "vue";
import { dark, light } from "./constants";

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
    default: light.primary,
    required: false,
  },
  dark: {
    type: String,
    default: dark.primary,
    required: false,
  },
});
const main = ref<string>(initMain("管理局"));
const rev = ref<boolean>(props.isRev);
const emit = defineEmits(["confirm"]);

function initMain(defaultMain: string): string {
  const slots = useSlots();
  const vnodes = slots.default ? slots.default() : [{ children: defaultMain }];
  const children = vnodes[0].children;
  return typeof children === "string" ? children : defaultMain;
}
function handleInput(value: string) {
  emit("confirm", value);
}
</script>

<style scoped lang="scss">
@import "./adm.scss";
.slot {
  font-family: adm-bold;
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
