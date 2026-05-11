import { computed, ref } from "vue";
import { height } from "./constants";
interface ScreenInfo {
  height: number;
  width: number;
}
export interface SealInfo {
  icon: string;
  id: number;
  top: number;
  height: number;
  offset: number;
}

const maxScreenWidth = 960;
export const screen = ref<ScreenInfo>(initScreen());
export const sealList = ref<SealInfo[]>([]);
export const sealHeight = computed(() => {
  const sortList = sealList.value.slice().sort((a, b) => a.top - b.top);
  const endSeal = sortList.at(-1);
  return endSeal ? endSeal.top : 0;
});

function initScreen(): ScreenInfo {
  const systemInfo = uni.getSystemInfoSync();
  return {
    height: systemInfo.windowHeight,
    width: Math.min(systemInfo.windowWidth, maxScreenWidth),
  };
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
export function addSeal(seal: SealInfo) {
  sealList.value.push(seal);
  const sortList = sealList.value.sort((a, b) => a.top - b.top);
  const index = sortList.findIndex((item) => item.id == seal.id) + 1;
  const count = sortList.length - index;
  const handleList = sortList.splice(index, count);
  const addList: SealInfo[] = handleList.map((item: SealInfo) => {
    return { ...item, top: item.top + seal.height + item.offset };
  });
  sealList.value = [...sortList, ...addList];
}
export function deleteSeal(id: number, count: number) {
  const sortList = sealList.value.sort((a, b) => a.top - b.top);
  const start = sortList.findIndex((item) => item.id == id);
  const removeList = sortList.splice(start, count);
  const removeHeight = removeList.reduce((sum: number, current: SealInfo) => {
    return sum + current.height;
  }, 0);
  const listEnd = sortList.length - start;
  const handleList = sortList.splice(start, listEnd);
  const reduceList: SealInfo[] = handleList.map((item: SealInfo) => {
    return { ...item, top: item.top - removeHeight - item.offset };
  });
  sealList.value = [...sortList, ...reduceList];
}
