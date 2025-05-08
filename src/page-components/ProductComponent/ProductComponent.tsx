import { motion } from 'framer-motion';
import { ForwardedRef, forwardRef, useEffect, useReducer } from 'react';

import { Advantages, HhData, HTag, Product, Sort, Tag } from '@/components';
import { Page, PageCategory, Product as TProduct, SortOptions } from '@/types';

import styles from './ProductComponent.module.css';
import { sortReducer } from './sort.reducer';

interface ProductComponentProps {
  page: Page;
  products: TProduct[];
  firstCategory?: PageCategory;
}

export const ProductComponent = motion.create(forwardRef(
  function ProductComponent({ page, products, firstCategory }: ProductComponentProps, ref: ForwardedRef<HTMLDivElement>) {
    const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, { products, sort: SortOptions.Rating });

    useEffect(() => {
      dispatchSort({ type: 'reset', initialState: products });
    }, [products]);

    const setSort = (sort: SortOptions) => {
      dispatchSort({ type: sort });
    };

    return (
      <div ref={ref} className={styles.wrapper}>
        <div className={styles.title}>
          <HTag tag='h1'>{page.title}</HTag>
          {products && <Tag color='grey' size='m' aria-label={products.length + ' элементов'}>{products.length}</Tag>}
          <Sort sort={sort} setSort={setSort} />
        </div>
        <div>
          {sortedProducts && sortedProducts.map((product) => (
            <Product key={product._id} product={product} /> ))}
        </div>
        <div className={styles.hhTitle}>
          <HTag tag='h2'>Вакансии - {page.category}</HTag>
          <Tag color='red' size='m'>hh.ru</Tag>
        </div>
        {firstCategory === PageCategory.Courses && page.hh && <HhData {...page.hh} />}
        {page.advantages && page.advantages.length > 0 && (
          <>
            <HTag tag='h2'>Преимущества</HTag>
            <Advantages advantages={page.advantages} />
          </>
        )}
        {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />}
        <HTag tag='h2'>Получаемые навыки</HTag>
        {page.tags.map((tag) => <Tag key={tag} color='primary'>{tag}</Tag>)}
      </div>
    );
  }
));