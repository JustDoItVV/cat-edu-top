import cn from 'classnames';
import { motion } from 'framer-motion';
import { DetailedHTMLProps, ForwardedRef, forwardRef, HTMLAttributes } from 'react';

import styles from './Card.module.css';

interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  cardColor?: 'white' | 'blue';
}

export const Card = motion.create(forwardRef(
  function Card({ cardColor = 'white', className, children, ...props }: CardProps, ref: ForwardedRef<HTMLDivElement>): React.JSX.Element {
    return (
      <div
        ref={ref}
        className={cn(styles.card, className, {
          [styles.blue]: cardColor === 'blue',
        })}
        {...props}
      >
        {children}
      </div>
    );
  }
));