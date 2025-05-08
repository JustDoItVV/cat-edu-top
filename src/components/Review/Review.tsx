import cn from 'classnames';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { Review as TReview } from '@/types';

import { Icon } from '../Icon/Icon';
import { Rating } from '../Rating/Rating';
import styles from './Review.module.css';

interface ReviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  review: TReview;}

export function Review({ review, className, ...props }: ReviewProps): React.JSX.Element {
  const { name, title, description, createdAt, rating } = review;

  return (
    <div
      className={cn(styles.review, className)}
      {...props}
    >
      <Icon icon='user' className={styles.user} />
      <div className={styles.title}>
        <span className={styles.name}>{name}:</span>&nbsp;&nbsp;
        <span>{title}</span>
      </div>
      <div className={styles.date}>
        {format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}
      </div>
      <div className={styles.rating}>
        <Rating rating={rating} />
      </div>
      <div className={styles.description}>
        {description}
      </div>
    </div>
  );
}
