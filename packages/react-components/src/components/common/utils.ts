const minAndMax = (value: number, min: number, max: number) => {
  value = Math.min(value, min);
  value = Math.max(value, max);
  return value;
};
export const darken = (color: string, percent: number) => {
  if (color.startsWith('#')) {
    const red = parseInt(color.substring(1, 3), 16);
    const green = parseInt(color.substring(3, 5), 16);
    const blue = parseInt(color.substring(5, 7), 16);

    const darkenedRed = Math.round((red * (100 - percent)) / 100);
    const darkenedGreen = Math.round((green * (100 - percent)) / 100);
    const darkenedBlue = Math.round((blue * (100 - percent)) / 100);

    const darkenedColor = (
      (darkenedRed << 16) |
      (darkenedGreen << 8) |
      darkenedBlue
    ).toString(16);

    return `#${darkenedColor}`;
  } else {
    const { hue, saturation, lightness } = rgbToHsl(color);
    return `hsl(${hue}, ${saturation * 100}%, ${minAndMax(
      lightness * 100 - percent,
      0,
      100
    )}%)`;
  }
};

export const lighten = (color: string, percent: number) => {
  if (color.startsWith('#')) {
    const red = parseInt(color.substring(1, 3), 16);
    const green = parseInt(color.substring(3, 5), 16);
    const blue = parseInt(color.substring(5, 7), 16);

    const darkenedRed = Math.round((red * (100 + percent)) / 100);
    const darkenedGreen = Math.round((green * (100 + percent)) / 100);
    const darkenedBlue = Math.round((blue * (100 + percent)) / 100);

    console.log(darkenedRed, darkenedGreen, darkenedBlue);
    const darkenedColor = (
      (darkenedRed << 16) |
      (darkenedGreen << 8) |
      darkenedBlue
    ).toString(16);

    console.log(darkenedColor);
  }
};

const rgbToHsl = (rgb: string) => {
  // 将RGB值拆分为红、绿、蓝三个分量
  const rgbArray = rgb.match(/\d+/g);
  const r = Number(rgbArray?.[0] ?? '0');
  const g = Number(rgbArray?.[1] ?? '0');
  const b = Number(rgbArray?.[2] ?? '0');

  // 将RGB值转换为范围在0到1之间的比例
  //   const rRatio = parseFloat(r) / 255;
  //   const gRatio = parseFloat(g) / 255;
  //   const bRatio = parseFloat(b) / 255;

  // 计算最大值和最小值，并计算亮度（lightness）
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2 / 255;

  // 计算饱和度（saturation）
  let saturation = 0;
  if (max !== min) {
    const delta = max - min;
    saturation =
      lightness > 0.5 ? delta / (2 * 255 - max - min) : delta / (max + min);
  }

  // 计算色调（hue）
  let hue = 0;
  if (max !== min) {
    if (max === r) {
      hue = ((g - b) / (max - min)) % 6;
    } else if (max === g) {
      hue = (b - r) / (max - min) + 2;
    } else {
      hue = (r - g) / (max - min) + 4;
    }
    hue *= 60;
    if (hue < 0) {
      hue += 360;
    }
  }

  return {
    hue,
    saturation,
    lightness,
    color: `hsl(${Math.round(hue)}, ${Math.round(
      saturation * 100
    )}%, ${Math.round(lightness * 100)}%)`,
  };
};

const hslToRgb = (color: string) => {
  const hslArray = color.match(/\d+/g);
  const h = Number(hslArray?.[0] || 0);
  const s = Number(hslArray?.[1] || 0) / 100;
  const l = Number(hslArray?.[2] || 0) / 100;

  const a = s * Math.min(l, 1 - l);
  const f = (n: number, k = (n + h / 30) % 12) =>
    l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

  const r = f(0) * 255;
  const g = f(8) * 255;
  const b = f(4) * 255;
  return { r, g, b, color: `rgb(${r}, ${g}, ${b})` };
};

// export function darken1(color, coefficient) {
//   color = decomposeColor(color);
//   coefficient = clamp(coefficient);

//   if (color.type.indexOf('hsl') !== -1) {
//     color.values[2] *= 1 - coefficient;
//   } else if (
//     color.type.indexOf('rgb') !== -1 ||
//     color.type.indexOf('color') !== -1
//   ) {
//     for (let i = 0; i < 3; i += 1) {
//       color.values[i] *= 1 - coefficient;
//     }
//   }
//   return recomposeColor(color);
// }

export const colorAlpha = (color: string, alpha: number) => {
  const red = parseInt(color.substring(1, 3), 16);
  const green = parseInt(color.substring(3, 5), 16);
  const blue = parseInt(color.substring(5, 7), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};
