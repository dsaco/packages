import { useEffect, useRef } from 'react';

import { Message } from '@/components/Message';

import {
  Api,
  ContentProps,
  ConfirmOptions,
  GalleryOptions,
  MaskOptions,
} from '@/components/Api';

const a: ConfirmOptions = {};

const Item = (props: ContentProps) => {
  return (
    <div>
      <h1>{props.toString()}</h1>
      <button onClick={props.remove}>close</button>
    </div>
  );
};

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
          Api.confirm({
            title: 'sdf',
          });
          // Api.confirm({
          //   title: 'ok',
          //   // maskColor: 'red',
          //   maskClosable: true,
          //   content: <h1>okok</h1>,
          //   onOk: () => {
          //     console.log('onOK');
          //   },
          //   onCancel: () => {
          //     console.log('oncancel');
          //   },
          //   // noOpacity: true,
          //   // duration: 5000,
          //   // zIndex: 2000,
          // } as any);
          // Api.gallery({
          //   photos: [
          //     'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
          //     'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
          //     'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp',
          //   ],
          //   maskClosable: true,
          //   // maskColor: 'red',
          //   // noOpacity: true,
          // });
          // setTimeout(() => {
          //   Api.gallery({
          //     photos: [
          //       'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
          //       'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
          //       'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp',
          //     ],
          //     maskClosable: true,
          //   });
          // }, 5000);
        }}
      >
        say
      </button>
      <hr />
      <button
        onClick={() => {
          const k = Api.mask({
            Content: <Item />,
            // duration: 3000,
            // onClose() {
            //   console.log('onCLose');
            // },
            maskColor: 'red',
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
          Api.confirm({
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
