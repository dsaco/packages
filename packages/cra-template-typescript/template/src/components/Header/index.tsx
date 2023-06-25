import { ReactNode } from 'react';
import styles from './index.module.scss';

type HeaderProps = {
  children?: ReactNode;
};
export default function Header({ children }: HeaderProps) {
  return <header className={styles.header}>{children}</header>;
}
