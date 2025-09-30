<template>
  <button class="adm-button" :style="buttonStyles">{{ data }}</button>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { getRpx } from "./adm";
import { dark, light, width } from "./constants";

const props = defineProps({
  data: {
    type: String,
    required: true,
    validator: (value: string) => value.length == 1,
  },
  isRev: {
    type: Boolean,
    default: false,
    required: false,
  },
  buttonType: {
    type: String,
    default: "bold",
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
  size: {
    type: Number,
    default: width.sm,
    required: false,
  },
});

const buttonStyles = computed(() => {
  const size = getRpx(props.size);
  return {
    "--type": `adm-${props.buttonType}`,
    "--text-color": props.light,
    "--bg-color": props.dark,
    "--size": `${size}rpx`,
    "--font-size": `${size * 0.9}rpx`,
  };
});
</script>

<style scoped lang="scss">
.adm-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;

  width: var(--size);
  height: var(--size);
  color: var(--text-color);
  background-color: var(--bg-color);
  border-radius: 50%;

  font-size: var(--font-size);
  font-family: var(--type);
}

.adm-button[disabled] {
  color: var(--text-color);
  background-color: var(--bg-color);
}

.adm-button:hover:not([disabled]) {
  filter: brightness(110%);
}

.adm-button:focus {
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
}

.adm-button:active:not([disabled]) {
  transform: scale(0.95);
}
</style>
