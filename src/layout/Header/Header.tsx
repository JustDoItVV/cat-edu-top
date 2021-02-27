import cn from 'classnames';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react';

import { ButtonIcon, Icon } from '../../components';
import { Sidebar } from '../Sidebar/Sidebar';
import styles from './Header.module.css';

type HeaderProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function Header({ className, ...props }: HeaderProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const router = useRouter();

  const variants = {
    opened: {
      opacity: 0,
      x: 0,
      transition: {
        stiffness: 20,
      },
    },
    closed: {
      opacity: 1,
      x: '100%',
    },
  };

  useEffect(() => {
    setIsOpened(false);
  }, [router]);

  return (
    <header className={cn(styles.header, className)} {...props}>
      <Icon icon='logoCat' />
      <ButtonIcon appearance='white' icon='menu' onClick={() => setIsOpened(true)} />
      <motion.div
        className={styles.mobileMenu}
        variants={variants}
        initial={'closed'}
        animate={isOpened ? 'opened' : 'closed'}
      >
        <Sidebar />
        <ButtonIcon appearance='white' icon='cross' className={styles.menuClose} onClick={() => setIsOpened(false)} />
      </motion.div>
    </header>
  );
}
