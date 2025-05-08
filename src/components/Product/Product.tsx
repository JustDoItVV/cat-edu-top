import cn from 'classnames';
import Image from 'next/image';
import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from 'react';

import { Product as TProduct } from '../../types';
import { declOfNum, priceRu } from '../../utils';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { Divider } from '../Divider/Divider';
import { Rating } from '../Rating/Rating';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { Tag } from '../Tag/Tag';
import styles from './Product.module.css';

interface ProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: TProduct;
}

export function Product({ product, className, ...props }: ProductProps): React.JSX.Element {
  const [isReviewOpened, setIsReviewOpened] = useState(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  const variants = {
    visible: { opacity: 1, height: 'auto', padding: 30 },
    hidden: { opacity: 0, height: 0, padding: 0 },
  };

  const scrollToReview = () => {
    setIsReviewOpened(true);
    reviewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    reviewRef.current?.focus();
  };

  return (
    <div className={className} {...props}>
      <Card className={styles.product}>
        <div className={styles.logo}><Image src={product.image} alt={product.title} width={70} height={70} /></div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>
          <span><span className='visuallyHidden'>цена</span>{priceRu(product.price)}</span>
          {product.oldPrice && <Tag color='green' className={styles.oldPrice}>
            <span className='visuallyHidden'>скидка</span>
            {priceRu(product.price - product.oldPrice)}
          </Tag>}
        </div>
        <div className={styles.credit}>
          <span className='visuallyHidden'>кредит</span>
          {priceRu(product.credit)}/<span className={styles.month}>мес</span>
          </div>
        <div className={styles.rating}>
          <span className='visuallyHidden'>{'рейтинг ' + (product.reviewAvg ?? product.initialRating)}</span>
          <Rating rating={product.reviewAvg ?? product.initialRating} />
        </div>
        <div className={styles.tags}>{product.categories.map((category) => <Tag key={category} className={styles.category} color='ghost'>{category}</Tag>)}</div>
        <div className={styles.priceTitle} aria-hidden={true}>цена</div>
        <div className={styles.creditTitle} aria-hidden={true}>кредит</div>
        <div className={styles.ratingTitle}><a href='#ref' onClick={scrollToReview}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a></div>
        <Divider className={styles.hr} />
        <div className={styles.description}>{product.description}</div>
        <div className={styles.feature}>
          {product.characteristics.map((feature) => (
            <div key={feature.name} className={styles.characteristics}>
              <span className={styles.characteristicsName}>{feature.name}</span>
              <span className={styles.characteristicsDots}></span>
              <span className={styles.characteristicsValue}>{feature.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advantagesBlock}>
          {product.advantages && <div className={styles.advantages}>
            <div className={styles.advantagesTitle}>Преимущества</div>
            <div>{product.advantages}</div>
          </div>}
          {product.disadvantages && <div className={styles.disadvantages}>
            <div className={styles.advantagesTitle}>Недостатки</div>
            <div>{product.disadvantages}</div>
          </div>}
        </div>
        <Divider className={cn(styles.hr, styles.hr2)} />
        <div className={styles.actions}>
          <Button appearance='primary'>Узнать подробнее</Button>
          <Button
            appearance='ghost'
            arrow='right'
            className={styles.reviewButton}
            onClick={() => setIsReviewOpened((prev) => !prev)}
            aria-expanded={isReviewOpened}
          >
            Читать отзывы
          </Button>
        </div>
      </Card>
      <Card
        cardColor='blue'
        className={styles.reviews}
        animate={isReviewOpened ? 'visible' : 'hidden'}
        variants={variants}
        initial='hidden'
        ref={reviewRef}
        tabIndex={isReviewOpened ? 0 : -1}
      >
        {product.reviews.map((review) => (<div key={review._id}>
          <Review review={review}/>
          <Divider />
        </div>))}
        <ReviewForm productId={product._id} isOpened={isReviewOpened} />
      </Card>
    </div>
  );
}
