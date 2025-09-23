<template>
  <adm-todo
    v-for="(item, index) in list"
    :key="index"
    :isComplete="item.isComplete"
    @change="handleChange(index, $event)"
  >
    {{ item.context }}
  </adm-todo>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import type { PropType } from "vue";
interface TodoList {
  isComplete: boolean;
  context: string;
}

const props = defineProps({
  list: {
    type: Object as PropType<TodoList[]>,
    required: true,
  },
});
const emit = defineEmits(["change"]);
const list = ref<TodoList[]>(props.list);

function handleChange(index: number, complete: boolean) {
  list.value[index].isComplete = complete;
  emit("change", list.value);
}
</script>
