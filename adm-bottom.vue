<template>
  <view class="bottom-wrap">
    <adm-column class="pss" :height="width">{{ pssText }}</adm-column>
    <view v-for="(item, index) in bottomArr" :key="index" class="bottom">
      <adm-icons
        :is-row="false"
        :is-random="false"
        :is-select="current == index"
        @click="inClick(index)"
      >
        {{ item }}
      </adm-icons>
    </view>
  </view>
</template>

<script lang="ts">
import { getRpx, screen } from "./adm";
export default {
  name: "admBottom",
  emits: ["clickItem"],
  props: {
    pssText: {
      type: String,
      default: "管理局",
      required: false,
    },
    bottomArr: {
      type: Array,
      required: true,
    },
    current: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  data() {
    return {
      width: getRpx(screen.value.width),
      pss: "",
    };
  },
  async beforeCreate() {
    //等item初始化完成后再旋转
    await this.$nextTick();
    this.pss = "pss";
  },
  methods: {
    inClick(index: number) {
      this.$emit("clickItem", index);
    },
  },
};
</script>

<style lang="scss">
@import "./adm.scss";
.bottom-wrap {
  display: flex;
  position: fixed;
  right: 0;
  bottom: 0;

  .pss {
    position: absolute;
    transform: rotate(-90deg);
    transform-origin: right bottom;
    right: 0;
    bottom: $line-lg + $width-base/ 2;
    z-index: 1;
  }

  .bottom {
    justify-content: flex-end;
    /* width: 100px; */
    /* TODO: 应当在html模块中添加style项来使其宽度不超过tab，具体width值应由dom计算 */
    z-index: 0;
  }
}
</style>
