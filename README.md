# admUI Components

admUI 是一组面向 uni-app / Vue 3 的风格化组件，使用 `adm-` 前缀组件名、`rpx` 尺寸和内置字体资源，适合构建带有档案、封条、竖排文字和复古管理局视觉的移动端页面。

## 适用环境

- uni-app
- Vue 3 `<script setup>`
- TypeScript
- SCSS

## 目录结构

```text
components/
  adm-*.vue        # 组件文件
  adm.ts           # 屏幕尺寸、rpx/px 转换、封条布局状态
  constants.ts     # 颜色、字号、尺寸、间距常量
  adm.scss         # adm 字体声明
  static/          # 组件依赖字体文件
```

## 快速接入

把本目录放到 uni-app 项目的 `src/components` 下，并保留 `static` 字体目录。

在 `pages.json` 中启用 easycom 自动注册：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^adm-(.*)": "@/components/adm-$1.vue"
    }
  }
}
```

组件样式使用了全局 SCSS 变量，例如 `$font-base`、`$width-lg`、`$light-primary`。确保项目的 `uni.scss` 中存在与 `constants.ts` 对应的变量，或把这些变量配置为全局可用。

## 基础示例

```vue
<template>
  <adm-seal>
    <adm-grop :column="['提前', '修改']">
      <adm-message>管理局</adm-message>
      <adm-number-box :value="5" @change="count = $event">库存</adm-number-box>
      <adm-countdown :target-time="targetTime" @finish="expired = true">
        后到期
      </adm-countdown>
    </adm-grop>

    <adm-collapse title="待办事项">
      <adm-todo-list :list="todos" @change="todos = $event" />
    </adm-collapse>

    <adm-chart :categories="categories" :data="chartData" />
  </adm-seal>

  <adm-bottom
    :current="current"
    :bottom-arr="['仓储', '资本', '时间']"
    @click="current = $event"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

const current = ref(0);
const count = ref(5);
const expired = ref(false);
const targetTime = ref(new Date(Date.now() + 60 * 60 * 1000));
const categories = ref(["壹", "贰", "叁", "肆", "伍"]);
const chartData = ref([5, 8, 3, 12, 7]);
const todos = ref([
  { context: "整理档案", isComplete: false },
  { context: "提交报告", isComplete: true },
]);
</script>
```

## 组件说明

| 组件 | 用途 |
| --- | --- |
| `adm-seal` | 页面级封条容器，管理右侧动态封条和内容层级。 |
| `adm-grop` | 组合容器，带背景文字、可选竖排栏和随机错位布局。 |
| `adm-message` | 竖向消息条，可点击展开更多信息插槽。 |
| `adm-collapse` | 折叠面板，展开时会向 `adm-seal` 注册封条高度。 |
| `adm-column` | 竖排基础文本块。 |
| `adm-row` | 横排基础文本块，内部文字旋转显示。 |
| `adm-background` | 随机旋转的背景文字层。 |
| `adm-fill` | 使用重复文字填充一列或一行背景。 |
| `adm-icons` | 大字图标/封条图标，可随机旋转。 |
| `adm-button` | 圆形单字按钮。 |
| `adm-input` | 包在 `adm-message` 中的输入框。 |
| `adm-number-box` | 数字步进器。 |
| `adm-countdown` | 倒计时消息条。 |
| `adm-todo` | 单条待办项，可点击切换完成状态。 |
| `adm-todo-list` | 待办列表封装。 |
| `adm-chart` | 横向条形图，放在 `adm-grop` 内显示。 |
| `adm-tab` | 侧边竖排标签组。 |
| `adm-bottom` | 底部导航栏。 |

## 常用 API

### 容器类

| 组件 | Props | Events / Slots |
| --- | --- | --- |
| `adm-seal` | `isRandom?: boolean` | 默认插槽 |
| `adm-grop` | `isRandom?: boolean`、`height?: number`、`min?: number`、`column?: string[]`、`icon?: string`、`background?: string` | `click(index)`、默认插槽 |
| `adm-collapse` | `title?: string`、`icon?: string`、`isOpen?: boolean` | 默认插槽 |

### 展示类

| 组件 | Props | Events / Slots |
| --- | --- | --- |
| `adm-message` | `borderText?: string`、`leftText?: string`、`mainNum?: number`、`isRev?: boolean`、`light?: string`、`dark?: string`、`type?: string`、`height?: number` | `more(height)`、默认插槽、`info` 插槽 |
| `adm-column` | `type?: string`、`borderText?: string`、`leftText?: string`、`isRev?: boolean`、`isThin?: boolean`、`light?: string`、`dark?: string`、`height?: number`、`width?: number`、`mainHeight?: number` | `height(value)`、默认插槽 |
| `adm-row` | `borderText?: string`、`leftText?: string`、`isRev?: boolean`、`isThin?: boolean`、`light?: string`、`dark?: string`、`height?: number`、`width?: number`、`mainHeight?: number` | 默认插槽 |
| `adm-background` | `isRev?: boolean`、`isThin?: boolean`、`minRan?: number`、`maxRan?: number`、`light?: string`、`dark?: string` | 默认插槽 |
| `adm-fill` | `isRow?: boolean`、`fillText?: string`、`height?: number` | 默认插槽 |
| `adm-icons` | `isRow?: boolean`、`isSelect?: boolean`、`isRandom?: boolean`、`isPss?: boolean`、`height?: number`、`light?: string`、`dark?: string`、`pss?: string` | 默认插槽 |

### 表单和交互类

| 组件 | Props | Events / Slots |
| --- | --- | --- |
| `adm-button` | `data: string`、`isRev?: boolean`、`buttonType?: string`、`light?: string`、`dark?: string`、`size?: number` | 原生点击事件 |
| `adm-input` | `borderText?: string`、`leftText?: string`、`isRev?: boolean`、`light?: string`、`dark?: string` | `confirm(value)`、默认插槽作为 placeholder |
| `adm-number-box` | `value: number`、`height?: number`、`max?: number`、`min?: number`、`step?: number`、`isRev?: boolean`、`light?: string`、`dark?: string` | `change(value)`、默认插槽 |
| `adm-countdown` | `targetTime: Date` | `finish`、默认插槽 |
| `adm-todo` | `isComplete?: boolean`、`borderText?: string`、`leftText?: string`、`isRev?: boolean`、`light?: string`、`dark?: string` | `update:isComplete(value)`、`change(value)`、默认插槽 |
| `adm-todo-list` | `list: { context: string; isComplete: boolean }[]` | `change(list)` |
| `adm-chart` | `categories: string[]`、`data: number[]`、`max?: number`、`icon?: string` | 无 |
| `adm-tab` | `text?: string`、`tabArr: string[]`、`current?: number` | `click(index)` |
| `adm-bottom` | `pssText?: string`、`bottomArr: string[]`、`current?: number` | `click(index)` |

## 工具函数

`adm.ts` 导出了以下工具和状态：

- `screen`：当前窗口宽高。
- `getRpx(px)` / `getPx(rpx)`：像素与 rpx 转换。
- `getRandom(min, max)`：生成闭区间随机整数。
- `sealList` / `sealHeight`：封条布局状态。
- `addSeal(seal)` / `deleteSeal(id, count)`：向封条布局中添加或删除节点。

## 主题与字体

- 颜色和尺寸常量集中在 `constants.ts`。
- 字体声明在 `adm.scss`，依赖 `static` 下的字体文件。
- 多数组件支持 `light`、`dark`、`isRev` 来切换前景色和背景色。
- 所有尺寸默认按 `rpx` 设计，适合移动端宽度自适应。
