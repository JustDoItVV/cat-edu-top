import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { Icon, Search } from '../../components';
import { Menu } from '../Menu/Menu';
import styles from './Sidebar.module.css';

type SidebarProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function Sidebar(props: SidebarProps): JSX.Element {
  return (
    <div
      className={styles.sidebar}
      {...props}
    >
      <Icon icon='logoCat' className={styles.logo} /> TOP
      <Search />
      <Menu />
    </div>
  );
}
