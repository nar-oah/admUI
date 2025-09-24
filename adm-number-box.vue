<template>
  <adm-message :isGrop="true">
    <view class="message-wrap" :style="numberStyle">
      <adm-button
        class="add"
        :disabled="isMax"
        data="增"
        @click="handleAdd"
      ></adm-button>
      <input
        class="number"
        type="digit"
        :value="placeholder"
        :placeholder="placeholder.toString()"
        placeholder-style="color: var(--fore-color)"
        @blur="handleConfirm($event.detail)"
      />
      <adm-button
        class="reduce"
        :disabled="isMin"
        data="减"
        @click="handleReduce"
      ></adm-button>
      <slot></slot>
    </view>
  </adm-message>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from "vue";
import { getRandom } from "./adm";

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    default: 52.63,
    required: false,
  },
  max: {
    type: Number,
    default: 100,
    required: false,
  },
  min: {
    type: Number,
    default: 0,
    required: false,
  },
  step: {
    type: Number,
    default: 1,
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
const emit = defineEmits(["change"]);
const number = ref(props.value);
const isMin = ref<boolean>(false);
const isMax = ref<boolean>(false);
const placeholder = computed({
  get() {
    return number.value;
  },
  set(value: number) {
    let stage = value;
    isMax.value = false;
    isMin.value = false;
    if (value > props.max) {
      isMax.value = true;
      stage = props.max;
    }
    if (value < props.min) {
      isMin.value = true;
      stage = props.min;
    }
    number.value = stage;
    emit("change", stage);
  },
});
const numberStyle = computed(() => {
  const height = 32.63;
  return {
    "--width": `${21 * placeholder.value.toString().length}rpx`,
    "--add-top": `${getRandom(0, height)}rpx`,
    "--add-deg": `${getRandom(-90, 90)}deg`,
    "--reduce-top": `${getRandom(0, height)}rpx`,
    "--reduce-deg": `${getRandom(-90, 90)}deg`,
  };
});

function handleConfirm(detail: any) {
  placeholder.value = Number(detail.value);
}
function handleAdd() {
  const addNum = (number.value + props.step).toFixed(2);
  placeholder.value = parseFloat(addNum);
}
function handleReduce() {
  const reduceNum = (number.value - props.step).toFixed(2);
  placeholder.value = parseFloat(reduceNum);
}
</script>

<style scoped lang="scss">
@import "./adm.scss";
.message-wrap {
  display: flex;
  flex-direction: row;

  .number {
    font-family: adm-medium;
    font-size: $font-base;
    width: var(--width);
  }
  .add {
    top: var(--add-top);
    transform: rotate(var(--add-deg));
  }
  .reduce {
    top: var(--reduce-top);
    transform: rotate(var(--reduce-deg));
  }
}
</style>
