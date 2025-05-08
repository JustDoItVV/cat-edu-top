import axios from 'axios';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'node:querystring';

import { firstLevelMenu } from '@/const';
import withLayout from '@/layout/Layout';
import { MenuItem, PageCategory } from '@/types';
import { Api } from '@/utils';

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory?: PageCategory;
}

export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) return { notFound: true };

  const firstCategoryitem = firstLevelMenu.find((item) => item.route === params.type)
  if (!firstCategoryitem) return { notFound: true };

  try {
    const { data: menu } = await axios.post<MenuItem[]>(Api.page.find, {
      firstCategory: firstCategoryitem?.id,
    });
    return {
        props: {
          menu,
          firstCategory: firstCategoryitem?.id,
      },
    };
  } catch {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map((item) => '/' + item.route),
    fallback: true,
    // fallback: false,
  };
};

export default withLayout(function Type({ firstCategory }: TypeProps): React.JSX.Element {
  return (
    <>
      Type: {firstCategory}
    </>
  );
});
