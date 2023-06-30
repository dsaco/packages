import Img from '@/components/Img';

import styles from './ImgPage.module.scss';
import { CircularProgress } from '@/components/Loading';

export default function ImgPage() {
  return (
    <div className="h-screen p-5">
      <Img
        // width={80}
        // height={200}
        src="https://www.baidu.com/img/pcindex_big.png"
        // style={{ width: 30, height: 30 }}
        className={styles.img}
        placeholder={<CircularProgress />}
      />
      <hr />
      <Img
        // width={80}
        // height={200}
        src="https://www.baidu.com/img/pcindex_big.png"
        // style={{ width: 30, height: 30 }}
        className={styles.img}
        placeholder={<CircularProgress />}
      />
      <hr />
      <Img
        // width={80}
        // height={200}
        src="https://www.baidu.com/img/pcindex_big.png"
        // style={{ width: 30, height: 30 }}
        className={styles.img}
        placeholder={<CircularProgress />}
      />
      <hr />
    </div>
  );
}
