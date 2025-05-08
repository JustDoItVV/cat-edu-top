import cn from 'classnames';
import {
    AnimationControls, motion, TargetAndTransition, VariantLabels, Variants
} from 'framer-motion';
import { DetailedHTMLProps, ForwardedRef, forwardRef, HTMLAttributes } from 'react';

import styles from './Card.module.css';

interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  cardColor?: 'white' | 'blue';
  animate?: boolean | AnimationControls | TargetAndTransition | VariantLabels | undefined;
  variants?: Variants | undefined;
  initial?: boolean | TargetAndTransition | VariantLabels | undefined;
}

export const Card = forwardRef(
  function Card({ cardColor = 'white', className, children, ...props }: CardProps, ref: ForwardedRef<HTMLDivElement>): React.JSX.Element {
    return (
      <motion.div>
        <div
          ref={ref}
          className={cn(styles.card, className, {
            [styles.blue]: cardColor === 'blue',
          })}
          {...props}
        >
          {children}
        </div>
      </motion.div>
    );
  }
);