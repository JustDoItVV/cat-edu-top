import cn from 'classnames';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { SortOptions } from '@/types';

import { Icon } from '../Icon/Icon';
import styles from './Sort.module.css';

interface SortProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sort: SortOptions;
  setSort: (sort: SortOptions) => void;
}

export function Sort({ sort, setSort, className, ...props }: SortProps): React.JSX.Element {
  return (
    <div
      className={cn(styles.sort, className)}
      {...props}
    >
      <div className={styles.sortName} id='sort'>Сортировка</div>
      <button
        id='rating'
        className={cn({ [styles.active]: sort === SortOptions.Rating })}
        onClick={() => setSort(SortOptions.Rating)}
        aria-selected={sort === SortOptions.Rating}
        aria-labelledby='sort rating'
      >
        <Icon icon='sort' className={styles.sortIcon} />По рейтингу
      </button>
      <button
        id='price'
        className={cn({ [styles.active]: sort === SortOptions.Price })}
        onClick={() => setSort(SortOptions.Price)}
        aria-selected={sort === SortOptions.Price}
        aria-labelledby='sort price'
      >
        <Icon icon='sort' className={styles.sortIcon} />По цене
      </button>
    </div>
  );
}
