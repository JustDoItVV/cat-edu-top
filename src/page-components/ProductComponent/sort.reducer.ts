import { Product, SortOptions } from '../../types';

export type SortActions = 
  | { type: SortOptions.Price }
  | { type: SortOptions.Rating }
  | { type: 'reset', initialState: Product[] };

export interface SortReducerState {
  sort: SortOptions;
  products: Product[];
}

export const sortReducer = (state: SortReducerState, action: SortActions): SortReducerState => {
  if (action.type === SortOptions.Rating) return {
    sort: SortOptions.Rating,
    products: state.products.sort((a, b) => a.initialRating > b.initialRating ? -1 : 1),
  };

  if (action.type === SortOptions.Price) return {
    sort: SortOptions.Price,
    products: state.products.sort((a, b) => a.price > b.price ? -1 : 1),
  };

  if (action.type === 'reset') return {
    sort: SortOptions.Rating,
    products: action.initialState,
  };

  return state;
};
