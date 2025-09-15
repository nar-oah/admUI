<template>
  <adm-todo
    v-for="(item, index) in list"
    :key="index"
    @change="handleChange(index, $event)"
  >
    {{ item.content }}
  </adm-todo>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import type { PropType } from "vue";
interface TodoList {
  isComplete: boolean;
  content: string;
}

const props = defineProps({
  list: {
    type: Object as PropType<TodoList[]>,
    required: true,
  },
});
const emit = defineEmits(["update:list"]);
const list = ref<TodoList[]>(props.list);

function handleChange(index: number, complete: boolean) {
  list.value[index].isComplete = complete;
  emit("update:list", list.value);
}
</script>
