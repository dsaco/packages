import { useRef } from 'react';

import { Api, Img } from '@/components';

import styles from './ImgPage.module.scss';
import { CircularProgress } from '@/components/Loading';

export default function ImgPage() {
  const imgRef = useRef(null);
  return (
    <div className="h-screen p-5">
      <img
        ref={imgRef}
        // width={80}
        // height={200}
        src="https://www.baidu.com/img/pcindex_big.png"
        // style={{ width: 30, height: 30 }}
        className={styles.img}
        // placeholder={<CircularProgress />}
        onClick={() => {
          // Api.preview({
          //   ele: imgRef.current,
          //   maskClosable: true,
          // });
        }}
      />
      <Img
        // width={80}
        // height={200}
        src="https://www.baidu.com/img/pcindex_big.png"
        // style={{ width: 30, height: 30 }}
        className={styles.img}
        style={{
          position: 'absolute',
          bottom: 300,
          right: 300,
        }}
        // placeholder={<CircularProgress />}
      />
      <hr />
      <Img
        width={150}
        height={150}
        src="https://www.baidu.com/img/pcindex_big.png"
        // style={{ width: 30, height: 30 }}
        // className={styles.img}
      />
      <hr />
      <Img
        // width={80}
        // height={200}
        src="https://www.baidu.com/img/pcindex_big.png"
        // style={{ width: 30, height: 30 }}
        className={styles.img}
        placeholder={<span>loading</span>}
      />
      <hr />
    </div>
  );
}
