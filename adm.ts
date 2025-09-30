import { computed, ref } from "vue";
interface ScreenInfo {
  height: number;
  width: number;
}
export interface SealInfo {
  icon: string;
  top: number;
  height: number;
}

export const screen = ref<ScreenInfo>(initScreen());
export const openSeal = ref<SealInfo[]>([]);
export const gropSeal = ref<SealInfo[]>([]);
export const sealHeight = ref(0);
export const endSeal = computed({
  get() {
    const height = screen.value.height - sealHeight.value;
    return height <= 0 ? sealHeight.value + 50 : screen.value.height;
  },
  set(value) {
    sealHeight.value = value > sealHeight.value ? value : sealHeight.value;
  },
});

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
