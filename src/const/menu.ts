import { FirstLevelMenuItem, PageCategory } from '@/types';

export const firstLevelMenu: FirstLevelMenuItem[] = [
  { route: 'courses', name: 'Курсы', icon: 'hat', id: PageCategory.Courses },
  { route: 'services', name: 'Сервисы', icon: 'cloud', id: PageCategory.Services },
  { route: 'books', name: 'Книги', icon: 'book', id: PageCategory.Books },
  { route: 'products', name: 'Продукты', icon: 'box', id: PageCategory.Products },
];