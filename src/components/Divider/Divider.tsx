import cn from 'classnames';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

import styles from './Divider.module.css';

interface DividerProps extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {}

export function Divider({ className, ...props }: DividerProps): React.JSX.Element {
  return (
    <hr className={cn(styles.hr, className)} {...props} />
  );
}
