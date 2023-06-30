/* eslint-disable */
import { useEffect, useRef } from 'react';

const que_arr = [
  2, 2, 2, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 1, 1, 2, 2, 1, 2, 2,
  1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 2, 2, 1, 2, 1, 2, 2,
  1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 2, 1, 1, 2, 1, 1, 1, 2, 2,
  2, 2,
];
let last = 0;
export default function DotPage() {
  const canvasRef = useRef(null);
  const dots = useRef<any>([]);
  const animationId = useRef<number>(0);
  const index = useRef(0);
  const size = 400;
  const boxRadius = size / 2;
  const dotRadius = (size * 0.07) / 8 / 2;
  const speed = (((size * 5) / 8) * 60) / 1000 / 2;
  //   const aniArea = (dotRadius * 8) / 0.07;

  useEffect(() => {
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;

      canvas.width = size;
      canvas.height = size;

      setInterval(() => {
        clearDots();
        generateDots();
        drawDots();
        // setTimeout(() => {
        //   clearDots();
        // }, 1000);
      }, 2000);
    }
  }, []);

  const getRandomXY = () => {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.sqrt(Math.random()) * boxRadius;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    return { x, y };
  };

  const generateDots = () => {
    let m_sr = 90;
    if (index.current >= 21) {
      m_sr = 70;
    } else if (index.current >= 41) {
      m_sr = 50;
    } else if (index.current >= 61) {
      m_sr = 30;
    }
    let m_dup = 100 - m_sr;

    let blackCount = 0;

    const _dots = new Array(200).fill(1).map((_, i) => {
      let type = 0;

      //   if (i >= 200) {
      //     type = 0;
      //   } else if (i >= m_dup * 2 + m_sr) {
      //     type = 2;
      //   } else if (i >= m_dup * 2) {
      //     type = 1;
      //   } else if (i >= m_dup) {
      //     type = 4;
      //   } else {
      //     type = 3;
      //   }

      //   const angle = Math.random() * Math.PI * 2;
      //   const distance = Math.sqrt(Math.random()) * boxRadius;

      //   const x = Math.cos(angle) * distance;
      //   const y = Math.sin(angle) * distance;
      const { x, y } = getRandomXY();

      const color = Math.random() < 0.5 && blackCount < 100 ? 'black' : 'white';
      if (color === 'black') {
        blackCount++;
      }

      return {
        id: i + 1,
        type,
        x: x + boxRadius,
        y: y + boxRadius,
        color: 'white',
        // times: -Math.floor(Math.random() * 32),
        times: 0,
        dir: Math.random() < 0.1,
      };
    });
    dots.current = _dots;
  };

  const drawDots = () => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.clearRect(0, 0, size, size);
    // const dir = que_arr[index.current];
    const dir = index.current % 2;
    dots.current = dots.current.map((dot: any, i: number) => {
      dot.times++;
      if (dot.times < 0 || dot.times >= 32) {
        // console.log('stoped');
        return dot;
      }
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dotRadius, 0, 2 * Math.PI);
      ctx.fillStyle = dot.color;
      ctx.fill();

      if (dot.dir) {
        const angle = Math.random() * Math.PI * 2;

        const ox = Math.cos(angle) * speed;
        const oy = Math.sin(angle) * speed;

        return {
          ...dot,
          x: dot.x + ox,
          y: dot.y + oy,
        };
      } else {
        const rr = (dot.x - boxRadius) ** 2 + (dot.y - boxRadius) ** 2;

        if (rr > 40000) {
          //   console.log('turn');
          const { x, y } = getRandomXY();
          return {
            ...dot,
            x,
            y,
          };
        }
        return {
          ...dot,
          x: dot.x + (dir === 1 ? 1 : -1) * speed,
        };
      }

      //   if (Math.random() < 0.2) {
      //     const angle = Math.random() * Math.PI * 2;
      //     const distance = Math.sqrt(Math.random()) * 200;

      //     const x = Math.cos(angle) * distance;
      //     const y = Math.sin(angle) * distance;

      //     return {
      //       ...dot,
      //       x: x + 200,
      //       y: y + 200,
      //     };
      //   }
      //   if (dot.type === 1 || dot.type === 2) {
      //     return { ...dot, x: dot.x + (dir === 1 ? 1 : -1) };
      //   }
      //   if (dot.type === 3 || dot.type === 4) {
      //     // console.log('hre');
      //     let deg = Math.floor(Math.random() * (430 - 110 + 1) + 110);
      //     if (deg > 250 && deg < 290) {
      //       deg += 40;
      //     }
      //     const radians = (Math.PI / 180) * deg;
      //     const Cx = Math.sin(radians) * 1;
      //     const Cy = Math.cos(radians) * 1;
      //     const rd = Math.floor(Math.random() * 4);
      //     let ope1 = 1;
      //     let ope2 = 1;
      //     if (rd === 0) {
      //     } else if (rd === 1) {
      //       ope2 = -1;
      //     } else if (rd == 2) {
      //       ope1 = -1;
      //     } else if (rd == 3) {
      //       ope1 = -1;
      //       ope2 = -1;
      //     }
      //     // console.log(ope1 * Cx);
      //     // console.log(ope2 * Cy);
      //     // debugger;
      //     return {
      //       ...dot,
      //       x: dot.x + ope1 * Cx,
      //       y: dot.y + ope2 * Cy,
      //     };
      //   }

      //   return dot;
      //   return { ...dot, x: dot.x + 3 };
    });

    // debugger;

    animationId.current = requestAnimationFrame(drawDots);
    // debugger;
  };

  const clearDots = () => {
    cancelAnimationFrame(animationId.current);
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.clearRect(0, 0, 400, 400);
    index.current++;
  };

  return (
    <div
      className="h-screen flex flex-col justify-center items-center"
      style={{ backgroundColor: 'rgb(13, 34, 59)' }}
    >
      <canvas ref={canvasRef} style={{ border: '1px dashed #eee' }} />
      <button
        onClick={() => {
          cancelAnimationFrame(animationId.current);
        }}
      >
        stop
      </button>
    </div>
  );
}
