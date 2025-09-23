interface Color {
  primary: string;
  secondary: string;
  background: string;
  container: string;
}
interface Size {
  mini: number;
  sm: number;
  base: number;
  md: number;
  lg: number;
  bg: number;
}

const light: Color = {
  primary: "#E3B4B8",
  secondary: "#73575C",
  background: "#533B40",
  container: "#73575C",
};
const dark: Color = {
  primary: "#EE3F4D",
  secondary: "#7A7374",
  background: "#36282B",
  container: "",
};
const font: Size = {
  mini: 10.53,
  sm: 28.07,
  base: 42.11,
  md: 63.16,
  lg: 175.44,
  bg: 84.22,
};
const width: Size = {
  mini: 15.79,
  sm: 0,
  base: 70.18,
  md: 0,
  lg: 684.21,
  bg: 0,
};
const height: Size = {
  mini: 52.62,
  sm: 245.61,
  base: 0,
  md: 403.51,
  lg: 561.4,
  bg: 0,
};
const line: Size = {
  mini: 8.77,
  sm: 17.54,
  base: 0,
  md: 87.72,
  lg: 140.35,
  bg: 0,
};
const spacing: Size = {
  mini: -3.51,
  sm: 8.77,
  base: 35.09,
  md: 0,
  lg: 0,
  bg: 0,
};

export function initConstants(): string {
  return (
    handleColor("light", light) +
    handleColor("dark", dark) +
    handleSize("font", font) +
    handleSize("width", width) +
    handleSize("height", height) +
    handleSize("line", line) +
    handleSize("spacing", spacing)
  );
}
function handleColor(name: string, color: Color): string {
  return Object.entries(color)
    .map(([key, value]) => `$${name}-${key}: ${value}`)
    .join("\n");
}
function handleSize(name: string, size: Size): string {
  return Object.entries(size)
    .map(([key, value]) => `$${name}-${key}: ${value}rpx`)
    .join("\n");
}
