import { ReactNode } from 'react';
import './index.scss';

export default function Button({ children }: { children: ReactNode }) {
  return <button className="btn">{children}</button>;
}
