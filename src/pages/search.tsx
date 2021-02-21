import axios from 'axios';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { firstLevelMenu } from '../const';
import withLayout from '../layout/Layout';
import { MenuItem, PageCategory } from '../types';
import { Api } from '../utils';

interface SearchProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory?: PageCategory;
}

export const getStaticProps: GetStaticProps<SearchProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
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

export default withLayout(function Search(): JSX.Element {
  return (
    <>
      Search
    </>
  );
});