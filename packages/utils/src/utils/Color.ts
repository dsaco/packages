// #f00 #f00f #ff0000 #ff0000ff
const REG_MATCH_HEX = /^#[\da-f]{3,8}$/i;
// rgb(255 0 0) rgba(255 0 0) rgb(255 0 0 / 50%) rgba(255 0 0 / 0.5)
const REG_MATCH_RGB_SPACE =
  /^rgba?\(\s*((\d+\.)?\d+)(%)?\s+((\d+\.)?\d+)(%)?\s+((\d+\.)?\d+)(%)?\s*(\/\s*((\d*\.)?\d+)(%)?\s*)?\)$/;
// rgb(255, 0, 0) rgba(255, 0, 0) rgb(255, 0, 0, 50%) rgba(255, 0, 0, 0.5)
const REG_MATCH_RGB_COMMA =
  /^rgba?\(\s*((\d+\.)?\d+)(%)?\s*,\s*((\d+\.)?\d+)(%)?\s*,\s*((\d+\.)?\d+)(%)?\s*(,\s*((\d*\.)?\d+)(%)?\s*)?\)$/;
// hsl(0deg 100% 50%) hsla(0deg 100% 50%) hsl(0deg 100% 50% / 50%) hsla(0deg 100% 50% / 50%)
const REG_MATCH_HSL_SPACE =
  /^hsla?\(\s*((\d+\.)?\d+)(deg)?\s*((\d+\.)?\d+)%\s*((\d+\.)?\d+)%\s*(\/\s*((\d*\.)?\d+)(%)?\s*)?\)$/;
// hsl(0deg, 100%, 50%) hsla(0deg, 100%, 50%) hsl(0deg, 100%, 50%, 50%) hsla(0deg, 100%, 50%, 50%)
const REG_MATCH_HSL_COMMA =
  /^hsla?\(\s*((\d+\.)?\d+)(deg)?\s*,\s*((\d+\.)?\d+)%\s*,\s*((\d+\.)?\d+)%\s*(,\s*((\d*\.)?\d+)(%)?\s*)?\)$/;

enum ColorType {
  Hex,
  Rgb,
  Hsl,
}

export type TypeColor = {
  origin: string;
  type?: ColorType;

  hex?: string;
  hexa?: string;
  rgb?: string;
  rgba?: string;
  hsl?: string;
  hsla?: string;

  R?: number;
  G?: number;
  B?: number;

  H?: number;
  S?: number;
  L?: number;

  A: number;

  darken: (coefficient: number) => string;
  alpha: (coefficient: number) => string;
};
function darken(this: TypeColor, coefficient: number) {
  coefficient = clamp(coefficient, -1, 1);

  if (this.type === ColorType.Hsl) {
    const l = (this.L as number) * (1 - coefficient);

    const _H = Math.round((this.H as number) % 360);
    const _S = clamp(Math.round(this.S as number), 0, 100);
    const _L = clamp(Math.round(l), 0, 100);
    if (this.A === 1) {
      return `hsl(${_H}deg ${_S}% ${_L})%`;
    } else {
      return `hsl(${_H}deg ${_S}% ${_L}% / ${clamp(
        Math.round(this.A * 100),
        0,
        100
      )}%)`;
    }
  } else {
    const red = clamp(
      Math.floor((this.R as number) * (1 - coefficient)),
      0,
      255
    );
    const green = clamp(
      Math.floor((this.G as number) * (1 - coefficient)),
      0,
      255
    );
    const blue = clamp(
      Math.floor((this.B as number) * (1 - coefficient)),
      0,
      255
    );

    if (this.A === 1) {
      return `rgb(${red} ${green} ${blue})`;
    } else {
      return `rgb(${red} ${green} ${blue} / ${this.A * 100}%)`;
    }
  }
}
function alpha(this: TypeColor, coefficient: number) {
  coefficient = clamp(coefficient);
  return `rgb(${this.R} ${this.G} ${this.B} / ${coefficient * 100}%)`;
}

export const Color = (origin: string) => {
  const object: TypeColor = {
    origin,

    A: 1,

    darken,
    alpha,
  };

  let matches;
  if (origin.match(REG_MATCH_HEX)) {
    origin = origin.toLowerCase();
    const originLen = origin.length;

    if (originLen === 4) {
      object.hex = `#${origin[1].repeat(2)}${origin[2].repeat(
        2
      )}${origin[3].repeat(2)}`;
      object.hexa = `${object.hex}ff`;

      object.type = ColorType.Hex;
    } else if (originLen === 5) {
      object.hex = `#${origin[1].repeat(2)}${origin[2].repeat(
        2
      )}${origin[3].repeat(2)}`;
      object.hexa = `${object.hex}${origin[4].repeat(2)}`;
      object.A = parseInt(origin[4].repeat(2), 16) / 255;

      object.type = ColorType.Hex;
    } else if (originLen === 7) {
      object.hex = origin;
      object.hexa = `${origin}ff`;

      object.type = ColorType.Hex;
    } else if (originLen === 9) {
      object.hex = origin.slice(0, 7);
      object.hexa = origin;
      object.A = parseInt(origin.slice(7), 16) / 255;

      object.type = ColorType.Hex;
    } else {
      throw new TypeError(`Invalid Hex Color: ${origin}`);
    }
  } else if (origin.startsWith('rgb')) {
    if (
      (matches = origin.match(REG_MATCH_RGB_SPACE)) ||
      (matches = origin.match(REG_MATCH_RGB_COMMA))
    ) {
      // 是否命中R后的百分号
      const matchPercent = matches[3];
      if (matchPercent) {
        if (!matches[6] || !matches[9]) {
          throw new TypeError(`Invalid Rgb Color: ${origin}`);
        }
      } else {
        if (matches[6] || matches[9]) {
          throw new TypeError(`Invalid Rgb Color: ${origin}`);
        }
      }
      const mulMatchPercent = matchPercent ? 2.55 : 1;

      const R = clamp(Number(matches[1]) * mulMatchPercent, 0, 255);
      const G = clamp(Number(matches[4]) * mulMatchPercent, 0, 255);
      const B = clamp(Number(matches[7]) * mulMatchPercent, 0, 255);
      let A = 1;
      // 命中透明度
      if (matches[10]) {
        // 命中百分号
        if (matches[13]) {
          A = Number(matches[11]) / 100;
        } else {
          A = Number(matches[11]);
        }
      }
      object.type = ColorType.Rgb;
      object.R = R;
      object.G = G;
      object.B = B;
      object.A = A;

      const _R = Math.round(R);
      const _G = Math.round(G);
      const _B = Math.round(B);
      const _A = clamp(Math.round(A * 100), 0, 100);

      object.rgb = `rgb(${_R} ${_G} ${_B})`;
      object.rgba = `rgb(${_R} ${_G} ${_B} / ${_A}%)`;
    } else {
      throw new TypeError(`Invalid Rgb Color: ${origin}`);
    }
  } else if (origin.startsWith('hsl')) {
    if (
      (matches = origin.match(REG_MATCH_HSL_SPACE)) ||
      (matches = origin.match(REG_MATCH_HSL_COMMA))
    ) {
      const H = Number(matches[1]);
      const S = Number(matches[4]);
      const L = Number(matches[6]);
      let A = 1;
      if (matches[8]) {
        // 命中百分号
        if (matches[11]) {
          A = Number(matches[9]) / 100;
        } else {
          A = Number(matches[9]);
        }
      }
      object.type = ColorType.Hsl;
      object.H = H;
      object.S = S;
      object.L = L;
      object.A = A;

      const _H = Math.round(H % 360);
      const _S = clamp(Math.round(S), 0, 100);
      const _L = clamp(Math.round(L), 0, 100);
      const _A = clamp(Math.round(A * 100), 0, 100);

      object.hsl = `hsl(${_H}deg ${_S}% ${_L}%)`;
      object.hsla = `hsl(${_H}deg ${_S}% ${_L}% / ${_A}%)`;
    } else {
      throw new TypeError(`Invalid Hsl Color: ${origin}`);
    }
  } else {
    throw new TypeError(`Invalid Color: ${origin}`);
  }

  return new Proxy(object, {
    get(target, propKey, receiver) {
      if (Reflect.has(target, propKey)) {
        return Reflect.get(target, propKey, receiver);
      } else {
        if (propKey === 'hex' || propKey === 'hexa') {
          if (target.type === ColorType.Rgb) {
            const [R, G, B] = rgb2hex(
              target.R as number,
              target.G as number,
              target.B as number
            );
            const hex = `#${R}${G}${B}`;
            const A = clamp(Math.round(target.A * 255), 0, 255)
              .toString(16)
              .padStart(2, '0');
            const hexa = `${hex}${A}`;
            Reflect.set(target, 'hex', hex, receiver);
            Reflect.set(target, 'hexa', hexa, receiver);

            return Reflect.get(target, propKey, receiver);
          } else if (target.type === ColorType.Hsl) {
            const [R, G, B] = hsl2rgb(
              target.H as number,
              (target.S as number) / 100,
              (target.L as number) / 100
            );

            const [HEXR, HEXG, HEXB] = rgb2hex(R, G, B);
            const HEXA = clamp(Math.round(target.A * 255), 0, 255)
              .toString(16)
              .padStart(2, '0');

            const hex = `#${HEXR}${HEXG}${HEXB}`;
            const hexa = `${hex}${HEXA}`;

            target.hex = hex;
            target.hexa = hexa;

            return Reflect.get(target, propKey, receiver);
          }
        }

        if (
          propKey === 'rgb' ||
          propKey === 'rgba' ||
          ['R', 'G', 'B'].includes(propKey as string)
        ) {
          if (target.type === ColorType.Hex) {
            const [R, G, B] = hex2rgb(target.hex as string);

            const _R = Math.round(R);
            const _G = Math.round(G);
            const _B = Math.round(B);
            const _A = clamp(Math.round(target.A * 100), 0, 100);

            target.R = R;
            target.G = G;
            target.B = B;
            target.rgb = `rgb(${_R} ${_G} ${_B})`;
            target.rgba = `rgb(${_R} ${_G} ${_B} / ${_A}%)`;

            return Reflect.get(target, propKey, receiver);
          } else if (target.type === ColorType.Hsl) {
            const [R, G, B] = hsl2rgb(
              target.H as number,
              (target.S as number) / 100,
              (target.L as number) / 100
            );
            const _A = clamp(Math.round(target.A * 100), 0, 100);

            target.R = R;
            target.G = G;
            target.B = B;
            target.rgb = `rgb(${R} ${G} ${B})`;
            target.rgba = `rgb(${R} ${G} ${B} / ${_A}%)`;

            return Reflect.get(target, propKey, receiver);
          }
        }

        if (propKey === 'hsl' || propKey === 'hsla') {
          if (target.type === ColorType.Rgb) {
            const [H, S, L] = rgb2hsl(
              target.R as number,
              target.G as number,
              target.B as number
            );
            target.H = H;
            target.S = S;
            target.L = L;

            const _H = Math.round(H * 100) / 100;
            const _S = Math.round(S * 100) / 100;
            const _L = Math.round(L * 100) / 100;
            const _A = Math.round(target.A * 10000) / 100;

            target.hsl = `hsl(${_H}deg ${_S}% ${_L}%)`;
            target.hsla = `hsl(${_H}deg ${_S}% ${_L}% / ${_A}%)`;

            return Reflect.get(target, propKey, receiver);
          } else if (target.type === ColorType.Hex) {
            const [R, G, B] = hex2rgb(target.hex as string);
            const [H, S, L] = rgb2hsl(R, G, B);

            target.H = H;
            target.S = S;
            target.L = L;

            const _H = Math.round(H * 100) / 100;
            const _S = Math.round(S * 100) / 100;
            const _L = Math.round(L * 100) / 100;
            const _A = Math.round(target.A * 10000) / 100;

            target.hsl = `hsl(${_H}deg ${_S}% ${_L}%)`;
            target.hsla = `hsl(${_H}deg ${_S}% ${_L}% / ${_A}%)`;

            return Reflect.get(target, propKey, receiver);
          }
        }
      }
    },
  });
};

const clamp = (value: number, min = 0, max = 1) => {
  return Math.min(Math.max(value, min), max);
};

const hsl2rgb = (h: number, s: number, l: number) => {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number, k = (n + h / 30) % 12) =>
    l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

  const R = Math.round(f(0) * 255);
  const G = Math.round(f(8) * 255);
  const B = Math.round(f(4) * 255);
  return [R, G, B];
};

const rgb2hsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let H = 0;
  let S = 0;
  const L = (max + min) / 2;

  if (max !== min) {
    const delta = max - min;
    S = L > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    if (r === max) {
      H = (60 * (g - b)) / delta;
    } else if (g === max) {
      H = (60 * (b - r)) / delta + 120;
    } else if (b === max) {
      H = (60 * (r - g)) / delta + 240;
    }
    if (H < 0) {
      H += 360;
    }
    H %= 360;
  }
  return [H, S * 100, L * 100];
};

const rgb2hex = (r: number, g: number, b: number) => {
  const R = Math.round(r).toString(16).padStart(2, '0');
  const G = Math.round(g).toString(16).padStart(2, '0');
  const B = Math.round(b).toString(16).padStart(2, '0');

  return [R, G, B];
};

const hex2rgb = (hex: string) => {
  const R = parseInt(hex.slice(1, 3), 16);
  const G = parseInt(hex.slice(3, 5), 16);
  const B = parseInt(hex.slice(5, 7), 16);

  return [R, G, B];
};
