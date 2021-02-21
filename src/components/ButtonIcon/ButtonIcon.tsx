import cn from 'classnames';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import { IconName } from '@/types';

import { Icon } from '../Icon/Icon';
import styles from './ButtonIcon.module.css';

interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  appearance: 'primary' | 'white';
  icon: IconName;
}

export function ButtonIcon({ appearance, icon, className, ...props }: ButtonIconProps): React.JSX.Element {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance === 'primary',
        [styles.ghost]: appearance === 'white',
        [styles.up]: icon === 'arrow',
      })}
      {...props}
    >      
      <Icon icon={icon} />
    </button>
  );
}
