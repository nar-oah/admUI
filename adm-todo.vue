<template>
  <adm-message
    class="todo"
    :style="todoStyles"
    @click="handleTodo()"
    :borderText="props.borderText"
    :leftText="props.leftText"
    :isRev="props.isRev"
    :light="props.light"
    :dark="props.dark"
  >
    <view class="text">
      <slot>待辦項</slot>
    </view>
    <adm-button v-show="isComplete" class="seal" data="阅"></adm-button>
  </adm-message>
</template>

<script setup lang="ts">
import { computed, defineProps, useSlots, ref, defineEmits } from "vue";
import { getRandom, item } from "./adm";

const props = defineProps({
  isComplete: {
    type: Boolean,
    default: false,
    required: false,
  },
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
    default: "#73575C",
    required: false,
  },
});
const emit = defineEmits(["update:isComplete", "change"]);
const isComplete = ref<boolean>(props.isComplete);
const main = ref<string>(initMain("待辦項"));
const todoStyles = computed(() => {
  const pssHeight = 42.63;
  //BUG: 修改main单字符宽度为正确值
  const textWidth = item.value.wrap.height * main.value.length;
  return {
    "--complete-line": isComplete.value ? "line-through" : "none",
    "--seal-top": `-${getRandom(0, pssHeight)}rpx`,
    "--seal-left": `${getRandom(textWidth - item.value.wrap.height, textWidth)}rpx`,
    "--seal-deg": `${getRandom(-90, 90)}deg`,
  };
});

function initMain(defaultMain: string): string {
  const slots = useSlots();
  const vnodes = slots.default ? slots.default() : [{ children: defaultMain }];
  const children = vnodes[0].children;
  return typeof children === "string" ? children : defaultMain;
}
function handleTodo() {
  isComplete.value = !isComplete.value;
  emit("update:isComplete", isComplete.value);
  emit("change", isComplete.value);
}
</script>

<style scoped lang="scss">
@import "./adm.scss";
.todo {
  .text {
    text-decoration-line: var(--complete-line);
    text-decoration-thickness: 5rpx;
  }
  .seal {
    position: absolute;
    margin-top: var(--seal-top);
    left: var(--seal-left);
    transform: rotate(var(--seal-deg));
  }
}
</style>
