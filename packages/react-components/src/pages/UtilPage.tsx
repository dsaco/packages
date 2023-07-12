import { useEffect } from 'react';
import { Color } from '@/components/utils/color';

export default function UtilPage() {
  useEffect(() => {
    // console.log(Color('#fab').rgb);
    // console.log(Color('rgb(255 2 2)').hex);
    // const color = Color('rgb(255,1,1)');
    // console.log(color.hex);
    // console.log(color.hex);
    const color = Color('rgb(0, 127, 255)');
    // console.log(color.rgb);
    // console.log(color.rgb);
    console.log(color.darken(-0.1));
    console.log(color.alpha(0.5));
    console.log(Color('#f00').alpha(0.5));
  }, []);
  return <div className="h-screen p-5"></div>;
}
