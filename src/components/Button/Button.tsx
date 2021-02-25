import cn from 'classnames';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import { Icon } from '../Icon/Icon';
import styles from './Button.module.css';

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  appearance: 'primary' | 'ghost';
  arrow?: 'right' | 'down' | 'none';
}

export function Button({ 
  appearance, 
  arrow = 'none', 
  children, 
  className, 
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance === 'primary',
        [styles.ghost]: appearance === 'ghost',
      })}
      {...props}
    >
      {children}
      {arrow !== 'none' && <span className={cn(styles.arrow, {
        [styles.down]: arrow === 'down',
        [styles.right]: arrow === 'right',
      })}>
        <Icon icon='arrow' />
        </span>}
    </button>
  );
}
