import { ref } from "vue";
interface ScreenInfo {
  height: number;
  width: number;
}

export const screen = ref<ScreenInfo>(initScreen());

function initScreen(): ScreenInfo {
  const systemInfo = uni.getSystemInfoSync();
  return { height: systemInfo.windowHeight, width: systemInfo.windowWidth };
}
export function getRpx(px: number): number {
  const rpx = (px / screen.value.width) * 750;
  return Math.round(rpx);
}
