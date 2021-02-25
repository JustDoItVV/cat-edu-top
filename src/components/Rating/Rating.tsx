import cn from 'classnames';
import React, {
    DetailedHTMLProps, ForwardedRef, forwardRef, HTMLAttributes, KeyboardEvent, useEffect, useRef,
    useState
} from 'react';
import { FieldError } from 'react-hook-form';

import { Icon } from '../Icon/Icon';
import styles from './Rating.module.css';

interface RatingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  rating: number;
  setRating?: (rating: number) => void;
  isEditable?: boolean;
  error?: FieldError;
}

export const Rating = forwardRef(
  function Rating({ rating, setRating, isEditable = false, error, tabIndex, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
    const [ratings, setRatings] = useState<JSX.Element[]>(new Array(5).fill(<></>));
    const ratingArrayRef = useRef<(SVGSVGElement | null)[]>([]);

    useEffect(() => {
      constructRatings(rating);
    }, [rating, tabIndex]);

    const computeFocus = (rating: number, i: number): number => {
      if (!isEditable) return -1;
      
      if (!rating && i === 0) return tabIndex ?? 0;

      if (rating === i + 1) return 0;

      return -1;
    };

    const constructRatings = (currentRating: number) => {
      const updatedRatings = ratings.map((_, i) => (
        <Icon
          key={`star-icon-${i}`}
          icon='star'
          className={cn(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable,
          })}
          onMouseEnter={() => changeDisplay(i + 1)}
          onMouseLeave={() => changeDisplay(rating)}
          onClick={() => handleRatingClick(i + 1)}
          tabIndex={computeFocus(rating, i)}
          onKeyDown={handleKeyDown}
          ref={(ref) => { ratingArrayRef.current.push(ref) }}
          role={isEditable ? 'slider' : ''}
          aria-valuenow={rating}
          aria-valuemax={5}
          aria-valuemin={1}
          aria-label={isEditable ? 'Укажите рейтинг стрелками' : `рейтинг ${rating}`}
          aria-invalid={!!error}
        />
      ));
      setRatings(updatedRatings);
    };

    const changeDisplay = (i: number) => {
      if (!isEditable) return;
      
      constructRatings(i);
    };

    const handleRatingClick = (i: number) => {
      if (!isEditable || !setRating) return;

      setRating(i);
    };

    const handleKeyDown = (evt: KeyboardEvent<SVGSVGElement>) => {
      if (!isEditable || !setRating) return;

      if (evt.code === 'ArrowRight' || evt.code === 'ArrowUp') {
        if (!rating) {
          setRating(1);
        } else {
          evt.preventDefault();
          setRating(rating < 5 ? rating + 1 : 5);
        }
        ratingArrayRef.current[rating]?.focus();
      };

      if (evt.code === 'ArrowLeft' || evt.code === 'ArrowDown') {
        evt.preventDefault();
        setRating(rating > 1 ? rating - 1 : 1);
        ratingArrayRef.current[rating - 2]?.focus();
      };

    };

    return (
      <div ref={ref} className={cn(styles.rating, {
        [styles.error]: error,
      })} {...props}>
        {ratings.map((r, i) => (
          <span key={`star-icon-span-${i}`}>{r}</span>
        ))}
        {error && <span className={styles.errorMessage} role='alert'>{error.message}</span>}
      </div>
    );
  }
);