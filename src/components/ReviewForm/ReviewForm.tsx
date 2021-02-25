import axios from 'axios';
import cn from 'classnames';
import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Api } from '../../utils';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { ReviewForm as IReviewForm, ReviewSentResponse } from './ReviewForm.interface';
import styles from './ReviewForm.module.css';

interface ReviewFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  productId: string;
  isOpened: boolean;
}

export function ReviewForm({ productId, isOpened, className, ...props }: ReviewFormProps): JSX.Element {
  const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string>('');

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<ReviewSentResponse>(Api.review.createDemo, { ...formData, productId })
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError('Что-то пошло не так');
      }
    } catch (e) {
      if (typeof e === 'object' && e && 'message' in e && typeof e.message === 'string') setError(e.message);
      else setError('Что-то пошло не так');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={cn(styles.reviewForm, className)}
        {...props}
      >
        <Input
          ref={() => register('name', { required: { value: true, message: 'Обязательное поле' } })}
          placeholder='Имя'
          error={errors.name}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={!!errors.name}
        />
        <Input
          ref={() => register('title', { required: { value: true, message: 'Обязательное поле' } })}
          placeholder='Заголовок отзыва'
          className={styles.title}
          error={errors.title}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={!!errors.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name='rating'
            render={(field) => (
              <Rating
                ref={field.ref}
                rating={field.value}
                isEditable
                setRating={field.onChange}
                error={errors.rating}
                tabIndex={isOpened ? 0 : -1}
              />
            )}
            rules={{ required: { value: true, message: 'Обязательное поле' } }}
          />
        </div>
        <Textarea
          ref={() => register('description', { required: { value: true, message: 'Обязательное поле' } })}
          placeholder='Текст отзыва'
          className={styles.description}
          error={errors.description}
          tabIndex={isOpened ? 0 : -1}
          aria-label='текст отзыва'
          aria-invalid={!!errors.description}
        />
        <div className={styles.submit}>
          <Button appearance='primary' tabIndex={isOpened ? 0 : -1} onClick={() => clearErrors()}>Отправить</Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдёт предварительную модерацию и проверку</span>
        </div>
      </div>
      {isSuccess && <div className={styles.success} role='alert'>
        <div className={styles.successTitle}>Ваш отзыв отправлен</div>
        <div className={styles.successDescription}>Спасибо, ваш отзыв будет опубликован после проверки</div>
        <button
          className={styles.close}
          onClick={() => setIsSuccess(false)}
          aria-label='закрыть оповещение'
        >
          <Icon icon='cross' />
        </button>
      </div>}
      {error && <div className={styles.error}>
        {error}
        <button
          className={styles.close}
          onClick={() => setError('')}
          aria-label='закрыть оповещение'
        >
          <Icon icon='cross' />
        </button>
      </div>}
    </form>
  );
}
