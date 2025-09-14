import { ref } from "vue";
interface ScreenInfo {
  height: number;
  width: number;
}
export interface ItemInfo {
  updated: number;
  wrap: ItemWrap;
  unit: ItemUnit;
}
export interface ItemWrap {
  width: number;
  height: number;
}
export interface ItemUnit {
  border: number;
  main: number;
  left: number;
}
export interface CollapseInfo {
  top: number;
  height: number;
}

export const screen = ref<ScreenInfo>(initScreen());
const initWrap: ItemWrap = { width: 0, height: 0 };
const initUnit: ItemUnit = { border: 0, main: 0, left: 0 };
export const item = ref<ItemInfo>({
  updated: 0,
  wrap: initWrap,
  unit: initUnit,
});
export const collapseOpen = ref<CollapseInfo[]>([]);

function initScreen(): ScreenInfo {
  const systemInfo = uni.getSystemInfoSync();
  return { height: systemInfo.windowHeight, width: systemInfo.windowWidth };
}
uni.onWindowResize(() => (screen.value = initScreen()));
export function getRpx(px: number): number {
  return (px / screen.value.width) * 750;
}
export function getPx(rpx: number) {
  return (rpx / 750) * screen.value.width;
}
export function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
