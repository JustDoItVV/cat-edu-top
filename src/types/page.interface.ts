export enum PageCategory {
  Courses,
  Services,
  Books,
  Products,
}

export interface PageAdvantage {
  _id: string;
  title: string;
  description: string;
}

export interface HhData {
  _id: string;
  count: number;
  juniorSalary: number;
  middleSalary: number;
  seniorSalary: number;
  updatedAt: Date;
}

export interface Page {
  tags: string[];
  _id: string;
  secondCategory: string;
  alias: string;
  title: string;
  category: string;
  tagsTitle: string;
  metaTitle: string;
  metaDescription: string;
  firstCategory: PageCategory;
  createdAt: Date;
  updatedAt: Date;
  hh?: HhData;
  advantages?: PageAdvantage[];
  seoText?: string;
}