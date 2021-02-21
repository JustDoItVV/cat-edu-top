import { createContext, ReactNode, useState } from 'react';

import { MenuItem, PageCategory } from '../types';

export interface IAppContext {
  menu: MenuItem[];
  firstCategory?: PageCategory;
  setMenu?: (newMenu: MenuItem[]) => void;
  children?: ReactNode;
}

export const AppContext = createContext<IAppContext>({ menu: [], firstCategory: PageCategory.Courses });

export const AppContextProvider = ({ menu, firstCategory, children }: IAppContext): JSX.Element => {
const [menuState, setMenuState] = useState<MenuItem[]>(menu);

const setMenu = (newMenu: MenuItem[]) => {
  setMenuState(newMenu);
};

  return (
    <AppContext.Provider value={{ menu: menuState , firstCategory, setMenu }}>
      {children}
    </AppContext.Provider>
  );
};