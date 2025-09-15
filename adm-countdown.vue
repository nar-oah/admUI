<template>
  <text> {{ info.hour }}時{{ info.minutes }}分{{ info.seconds }}秒 </text>
</template>

<script setup lang="ts">
import { computed, defineProps, onMounted, ref } from "vue";
import type { ComputedRef } from "vue";
interface Remaining {
  hour: number;
  minutes: number;
  seconds: number;
}

const props = defineProps({
  targetTime: {
    type: Date,
    required: true,
  },
});
let timer = 0;
const emit = defineEmits(["finsh"]);
const remaining = ref<number>(props.targetTime.getTime() - Date.now());
const info: ComputedRef<Remaining> = computed(() => {
  const seconds = 1000 * 60;
  const minutes = seconds * 60;
  const hours = minutes * 24;
  return {
    hour: Math.floor((remaining.value % hours) / minutes),
    minutes: Math.floor((remaining.value % minutes) / seconds),
    seconds: Math.floor((remaining.value % seconds) / 1000),
  };
});

function updateTime() {
  const current: number = Date.now();
  if (props.targetTime.getTime() <= current) {
    clearInterval(timer);
    remaining.value = 0;
    emit("finsh");
  } else {
    remaining.value = props.targetTime.getTime() - Date.now();
  }
}
onMounted(() => (timer = setInterval(updateTime, 1000)));
</script>
