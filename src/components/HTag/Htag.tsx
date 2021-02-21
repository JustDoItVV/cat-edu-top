import { ReactNode } from 'react';

import styles from './HTag.module.css';

interface HTagProps {
  tag: 'h1' | 'h2' | 'h3';
  children?: ReactNode;
}


export function HTag({ tag, children }: HTagProps): JSX.Element {
  if (tag === 'h1') return <h1 className={styles.h1}>{children}</h1>;

  if (tag === 'h2') return <h2 className={styles.h2}>{children}</h2>;

  if (tag === 'h3') return <h3 className={styles.h3}>{children}</h3>;

  return <></>;
}
