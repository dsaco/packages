import Header from '@/components/Header';

import styles from './index.module.less';

export default function Home() {
  return (
    <>
      <Header />
      <div className={styles.container}>Home</div>
    </>
  );
}
