import cn from 'classnames';
import { format } from 'date-fns';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

import styles from './Footer.module.css';

export type FooterProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function Footer({ className, ...props}: FooterProps): React.JSX.Element {
  return (
    <footer
      className={cn(className, styles.footer)}
      {...props}
    >
      <span>CatEduTop © 2021 - {format(new Date(), 'yyyy')}. Все права защищены</span>
      <a href='#' target='_blank'>Пользовательское соглашение</a>
      <a href='#' target='_blank'>Политика конфиденциальности</a>
    </footer>
  );
}
