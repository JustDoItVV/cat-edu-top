import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

import { useScrollY } from '@/hooks';

import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import styles from './Up.module.css';

export function Up(): React.JSX.Element {
  const controls = useAnimation();
  const y = useScrollY();

  useEffect(() => {
    controls.start({ opacity: y / document.body.scrollHeight });
  }, [y, controls]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div className={styles.up} animate={controls} initial={{ opacity: 0 }}>
      <ButtonIcon icon='arrow' appearance='primary' onClick={scrollToTop} aria-label='наверх' />
    </motion.div>
  );
}
