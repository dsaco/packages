import { useEffect } from 'react';
import { Color } from '@/components/utils/color';

export default function UtilPage() {
  useEffect(() => {
    // console.log(Color('#fab').rgb);
    // console.log(Color('rgb(255 2 2)').hex);
    // const color = Color('rgb(255,1,1)');
    // console.log(color.hex);
    // console.log(color.hex);
    // const color = Color('rgba(1, 127, 255, 0.5)');
    // const color = Color('#ffba');

    // console.log(color.rgb);
    // console.log(color.rgba);
    // console.log(color.hexa);
    // console.log(color.rgb);
    // console.log(color.rgb);
    // console.log(color.alpha(0.5));
    // console.log(Color('rgb(300, 0, 0 )').alpha(0.5));
    // const rgb = Color('rgb(10.6 10 10)');
    // const rgba = Color('rgb(10 , 10, 10 , 0.5)');
    // const rgba2 = Color('rgb(10.1 , 10.2, 10.3 , 10.8%)');
    // const rgba3 = Color('rgb(  10, 10 ,  10 )');
    // const rgba4 = Color('rgb(10.1 , 10.2,  10.3 )');
    // const rgba = Color('rgb(10 10 10 / 0.5)');
    // const rgba2 = Color('rgb(10.1 10.2 10.3 / 10.8%)');
    // const rgba3 = Color('rgb(  10 10   10 )');
    // const rgba4 = Color('rgb(10.1 10.2 10.3 )');
    // console.log(Color('#64656581').rgb);
    // console.log(Color('#64656581').rgba);
    // const color = Color('hsl(  120deg   50%   50%  )');
    // const color2 = Color('hsl(  120deg   50%   50% / 50% )');
    // const color3 = Color('hsl(  120deg   50%   50% / 0.5 )');

    // console.log(color.rgb);
    // console.log(color.rgba);
    // console.log(color2.rgb);
    // console.log(color2.rgba);
    // console.log(color3.rgb);
    // console.log(color3.rgba);
    // console.log(color3.hexa);
    // console.log(color3.hexa);
    // console.log(color3.rgba);
    const color4 = Color('#f008');
    console.log(color4.hsl);
  }, []);
  return <div className="h-screen p-5"></div>;
}
