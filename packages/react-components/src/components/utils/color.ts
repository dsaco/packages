export type TypeColor = {
  origin: string;

  hex?: string;
  rgb?: string;
  R?: number;
  G?: number;
  B?: number;
  A?: number;

  darken: (coefficient: number) => string;
  alpha: (coefficient: number) => string;
};
function darken(this: TypeColor, coefficient: number) {
  coefficient = clamp(coefficient);

  if (this.origin.startsWith('hsl')) {
    return 'not implement';
  } else {
    const red = Math.floor((this.R as number) * (1 - coefficient));
    const green = Math.floor((this.G as number) * (1 - coefficient));
    const blue = Math.floor((this.B as number) * (1 - coefficient));

    return `rgb(${red}, ${green}, ${blue})`;
  }
}
function alpha(this: TypeColor, coefficient: number) {
  coefficient = clamp(coefficient);
  return `rgba(${this.R}, ${this.G}, ${this.B}, ${coefficient})`;
}

export const Color = (origin: string) => {
  const object: TypeColor = {
    origin,

    darken,
    alpha,
  };

  let matches;
  if (origin.startsWith('#')) {
    if (origin.match(/^#[\da-f]{3}$/i)) {
      // #f00
      object.hex = `#${origin[1].repeat(2)}${origin[2].repeat(
        2
      )}${origin[3].repeat(2)}`;
      object.A = 1;
    } else if (origin.match(/^#[\da-f]{6}$/i)) {
      // #ff0000
      object.hex = origin;
      object.A = 1;
    } else if (origin.match(/^#[\da-f]{8}$/i)) {
      // #ff0000ff
      object.hex = origin.slice(0, 7);
      object.A = Math.round((parseInt(origin.slice(7), 16) / 255) * 100) / 100;
    } else {
      throw new Error('color值不合法');
    }
  } else if (origin.startsWith('rgb')) {
    if (
      (matches = origin.match(
        /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/
      )) ||
      (matches = origin.match(/^rgb\(\s*(\d+)\s+(\d+)\s+(\d+)\s*\)$/))
    ) {
      // rgb(255, 0, 0) || rgb(255 0 0)
      const R = Number(matches[1]);
      const G = Number(matches[2]);
      const B = Number(matches[3]);
      object.R = R;
      object.G = G;
      object.B = B;
      object.A = 1;
      object.rgb = `rgb(${R}, ${G}, ${B})`;
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
          const hex = `#${target.R?.toString(16)}${target.G?.toString(
            16
          ).padStart(2, '0')}${target.B?.toString(16).padStart(2, '0')}`;
          Reflect.set(target, propKey, hex, receiver);
          return Reflect.get(target, propKey, receiver);
        }
        if (propKey === 'rgb' || ['R', 'G', 'B'].includes(propKey as string)) {
          const R = parseInt((target.hex as string).slice(1, 3), 16);
          const G = parseInt((target.hex as string).slice(3, 5), 16);
          const B = parseInt((target.hex as string).slice(5, 7), 16);
          target.R = R;
          target.G = G;
          target.B = B;
          target.rgb = `rgb(${R}, ${G}, ${B})`;
          return Reflect.get(target, propKey, receiver);
        }
      }
    },
  });
};

const clamp = (value: number, min = 0, max = 1) => {
  return Math.min(Math.max(value, min), max);
};
