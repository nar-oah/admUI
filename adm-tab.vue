<template>
  <adm-fill :fill-text="props.text" style="position: fixed">
    <view v-for="(item, index) in props.tabArr" :key="index">
      <adm-column :isRev="props.current == index" @click="emit('click', index)">
        {{ item }}
      </adm-column>
    </view>
  </adm-fill>
</template>

<script setup lang="ts">
const emit = defineEmits(["click"]);
const props = defineProps({
  text: {
    type: String,
    default: "委員會",
    required: false,
  },
  tabArr: {
    type: Array,
    required: true,
  },
  current: {
    type: Number,
    default: 0,
    required: false,
  },
});
</script>
