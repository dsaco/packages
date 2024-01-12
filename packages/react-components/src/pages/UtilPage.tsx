import { useEffect, useRef } from 'react';

import { Message } from '@/components/Message';
import { Notice } from '@/components/Notice';
import { mask } from '@/components/Mask';

import styles from './UtilPage.module.scss';

const Item = (props: any) => {
  return (
    <div>
      <h1>sdkfjlskdjf</h1>
      <button onClick={props.onClose}>close</button>
    </div>
  );
};

let n = 0;
export default function UtilPage() {
  useEffect(() => {
    // Message.duration = 5000;
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
    // const color4 = Color('#f008');
    // console.log(color4.hsl);
    // console.log(color4.hsla);
    // const color5 = Color('rgb(10, 20, 30)');
    // console.log(color5.hex);
    // console.log(color5.hexa);
    // const hex = Color('hsla(0deg 100% 50% / 50%)');
    // console.log(hex.darken(0.1));
    // console.log(hex.hsl, hex.hsla);
    // // console.log(hex.rgb, hex.rgba);
    // console.log(hex.rgb, hex.rgba);
  }, []);
  return (
    <div className="h-screen p-5">
      <button
        onClick={() => {
          mask.add({
            key: ++n,
            content: (
              <Item
                onClose={() => {
                  console.log('here');
                  mask.destroy(n);
                }}
              />
            ),
            // maskClosable: true,
            // className: styles.blue,
          });

          // setTimeout(() => {
          //   // console.log(close);
          //   // close?.();
          //   m.destroy();
          // }, 3000);
        }}
      >
        mask
      </button>
      <button
        onClick={() => {
          Notice.confirm({
            // width: 300,
            title: '警告',
            content: <h1>sdkfjlskdjf</h1>,
            maskClosable: true,
          });
        }}
      >
        confirm
      </button>
      <hr />
      <button
        onClick={() => {
          Message.info('100秒之后关闭', 1000);
        }}
      >
        info
      </button>
      <button
        onClick={() => {
          Message.success('100秒之后关闭');
        }}
      >
        success
      </button>
      <button
        onClick={() => {
          Message.warn('100秒之后关闭');
        }}
      >
        warn
      </button>
      <button
        onClick={() => {
          Message.warning('100秒之后关闭');
        }}
      >
        warning
      </button>
      <button
        onClick={() => {
          Message.error('100秒之后关闭');
        }}
      >
        error
      </button>
      <button
        onClick={() => {
          Message.clear();
          Message.add('error', 'sdf');
        }}
      >
        clear
      </button>
    </div>
  );
}
