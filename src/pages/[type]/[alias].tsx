import axios from 'axios';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'node:querystring';

import { firstLevelMenu } from '@/const';
import withLayout from '@/layout/Layout';
import { ProductComponent } from '@/page-components';
import { MenuItem, Page, PageCategory, Product } from '@/types';

import Error404 from '../404';

interface ProductProps extends Record<string, unknown> {
  menu: MenuItem[];
  page: Page;
  products: Product[];
  firstCategory?: PageCategory;
}

export const getStaticProps: GetStaticProps<ProductProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) return { notFound: true };

  const firstCategoryitem = firstLevelMenu.find((item) => item.route === params.type)
  if (!firstCategoryitem) return { notFound: true };

  try {
    const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
      firstCategory: firstCategoryitem?.id,
    });
    if (menu.length === 0) return { notFound: true };
    const { data: page } = await axios.get<Page>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias);
    const { data: products } = await axios.post<Product[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find', {
      category: page.category,
      limit: 10,
    });
    return {
        props: {
          menu,
          firstCategory: firstCategoryitem?.id,
          page,
          products,
      },
    };
  } catch {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];

  for (const firstLevelItem of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
      firstCategory: firstLevelItem.id,
    });
    paths = paths.concat(menu.flatMap((item) => item.pages.map((page) => `/${firstLevelItem.route}/${page.alias}`)));
  }

  return {
    paths,
    fallback: true,
    // fallback: false,
  };
};

export default withLayout<ProductProps>(function Product({ page, products, firstCategory }: ProductProps) {
  if (!page || !products) return <Error404 menu={[]} />

  return (
    page && products ?
    <>
      <Head>
        <title>{page.metaTitle}</title>
        <meta name='description' content={page.metaDescription} />
        <meta property='og:title' content={page.metaTitle} />
        <meta property='og:description' content={page.metaDescription} />
      </Head>
      <ProductComponent page={page} products={products} firstCategory={firstCategory} />;
    </> : <></>
  )
});
