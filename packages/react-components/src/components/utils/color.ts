export type TypeColor = {
  origin: string;

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

  if (this.origin.startsWith('hsl')) {
    return 'not implement';
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
  return `rgba(${this.R}, ${this.G}, ${this.B}, ${coefficient})`;
}

export const Color = (origin: string) => {
  const object: TypeColor = {
    origin,

    A: 1,

    darken,
    alpha,
  };

  let matches;
  const originLen = origin.length;
  if (origin.match(/^#[\da-f]{3,8}$/i)) {
    if (originLen === 4) {
      // #f00
      object.hex = `#${origin[1].repeat(2)}${origin[2].repeat(
        2
      )}${origin[3].repeat(2)}`;
    } else if (originLen === 5) {
      // #f00f
      object.hex = `#${origin[1].repeat(2)}${origin[2].repeat(
        2
      )}${origin[3].repeat(2)}`;
      object.hexa = `${object.hex}${origin[4].repeat(2)}`;
      object.A = parseInt(origin[4].repeat(2), 16) / 255;
    } else if (originLen === 7) {
      // #ff0000
      object.hex = origin;
    } else if (originLen === 9) {
      // #ff0000ff
      object.hex = origin.slice(0, 7);
      object.hexa = origin;
      object.A = parseInt(origin.slice(7), 16) / 255;
    } else {
      throw new Error('color值不合法');
    }
  } else if (origin.startsWith('rgb')) {
    if (
      (matches = origin.match(
        /^rgba?\(\s*((\d+\.)?\d+)\s+((\d+\.)?\d+)\s+((\d+\.)?\d+)\s*(\/\s*((\d+\.)?\d+)(%)?\s*)?\)$/
      ))
    ) {
      // rgb(255 0 0) rgba(255 0 0)
      // rgb(255 0 0 / 50%) rgba(255 0 0 / 0.5)
      const R = clamp(Number(matches[1]), 0, 255);
      const G = clamp(Number(matches[3]), 0, 255);
      const B = clamp(Number(matches[5]), 0, 255);
      let A = 1;
      // 命中透明度
      if (matches[7]) {
        // 命中百分号
        if (matches[10]) {
          A = Number(matches[8]) / 100;
        } else {
          A = Number(matches[8]);
        }
      }
      object.R = R;
      object.G = G;
      object.B = B;
      object.A = A;
      object.rgb = `rgb(${R} ${G} ${B})`;
      object.rgba = `rgb(${R} ${G} ${B} / ${Math.round(A * 100)}%)`;
    } else if (
      (matches = origin.match(
        /^rgba?\(\s*((\d+\.)?\d+)\s*,\s*((\d+\.)?\d+)\s*,\s*((\d+\.)?\d+)\s*(,\s*((\d+\.)?\d+)(%)?\s*)?\)$/
      ))
    ) {
      // rgb(255, 0, 0) rgba(255, 0, 0)
      // rgb(255, 0, 0, 50%) rgba(255, 0, 0, 0.5)
      const R = clamp(Number(matches[1]), 0, 255);
      const G = clamp(Number(matches[3]), 0, 255);
      const B = clamp(Number(matches[5]), 0, 255);
      let A = 1;
      if (matches[7]) {
        // 命中百分号
        if (matches[10]) {
          A = Number(matches[8]) / 100;
        } else {
          A = Number(matches[8]);
        }
      }
      object.R = R;
      object.G = G;
      object.B = B;
      object.A = A;
      object.rgb = `rgb(${R} ${G} ${B})`;
      object.rgba = `rgb(${R} ${G} ${B} / ${Math.round(A * 100)}%)`;
    } else {
      throw new Error('color值不合法');
    }
  } else if (origin.startsWith('hsl')) {
    if (
      (matches = origin.match(
        /^hsla?\(\s*((\d+\.)?\d+)deg\s*((\d+\.)?\d+)%\s*((\d+\.)?\d+)%\s*(\/\s*((\d+\.)?\d+)(%)?\s*)?\)$/
      ))
    ) {
      const H = Number(matches[1]);
      const S = Number(matches[3]) / 100;
      const L = Number(matches[5]) / 100;
      let A = 1;
      if (matches[7]) {
        // 命中百分号
        if (matches[10]) {
          A = Number(matches[8]) / 100;
        } else {
          A = Number(matches[8]);
        }
      }

      const [R, G, B] = hsl2rgb(H, S, L);

      object.H = H;
      object.S = S;
      object.L = L;
      object.R = R;
      object.G = G;
      object.B = B;
      object.A = A;
      object.rgb = `rgb(${R} ${G} ${B})`;
      object.rgba = `rgb(${R} ${G} ${B} / ${Math.round(A * 100)}%)`;
    } else {
      throw new Error('color值不合法');
    }
  } else {
    throw new Error('color值不合法');
  }

  return new Proxy(object, {
    get(target, propKey, receiver) {
      if (Reflect.has(target, propKey)) {
        return Reflect.get(target, propKey, receiver);
      } else {
        if (propKey === 'hex') {
          const hex = `#${Math.round(target.R as number)
            ?.toString(16)
            .padStart(2, '0')}${Math.round(target.G as number)
            ?.toString(16)
            .padStart(2, '0')}${Math.round(target.B as number)
            ?.toString(16)
            .padStart(2, '0')}`;
          Reflect.set(target, propKey, hex, receiver);
          return Reflect.get(target, propKey, receiver);
        }
        if (propKey === 'hexa') {
          const hexa = `#${Math.round(target.R as number)
            ?.toString(16)
            .padStart(2, '0')}${Math.round(target.G as number)
            ?.toString(16)
            .padStart(2, '0')}${Math.round(target.B as number)
            ?.toString(16)
            .padStart(2, '0')}${Math.round(target.A * 255)
            .toString(16)
            .padStart(2, '0')}`;
          Reflect.set(target, propKey, hexa, receiver);
          return Reflect.get(target, propKey, receiver);
        }
        if (
          propKey === 'rgb' ||
          propKey === 'rgba' ||
          ['R', 'G', 'B'].includes(propKey as string)
        ) {
          const R = parseInt((target.hex as string).slice(1, 3), 16);
          const G = parseInt((target.hex as string).slice(3, 5), 16);
          const B = parseInt((target.hex as string).slice(5, 7), 16);
          target.R = R;
          target.G = G;
          target.B = B;
          target.rgb = `rgb(${R} ${G} ${B})`;
          target.rgba = `rgb(${R} ${G} ${B} / ${Math.round(target.A * 100)}%)`;
          return Reflect.get(target, propKey, receiver);
        }

        if (propKey === 'hsl' || propKey === 'hsla') {
          return 'continue';
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
