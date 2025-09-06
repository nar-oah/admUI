<template>
  <button class="adm-button">{{ data }}</button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  data: {
    type: String,
    required: true,
    validator: (value: string) => value.length == 1,
  },
  isSelected: {
    type: Boolean,
    default: false,
    required: false,
  },
});
</script>

<style lang="scss">
.adm-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0px;

  width: 40rpx;
  height: 40rpx;
  color: $adm-primary-light;
  background-color: $adm-primary-dark;
  border-radius: 100%;

  font-size: 36rpx;
  font-family: adm-icon;
}

.adm-button:hover {
  filter: brightness(110%);
}

.adm-button:focus {
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
}

.adm-button:active {
  transform: scale(0.95);
}
</style>

