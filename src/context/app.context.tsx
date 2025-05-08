import { createContext, PropsWithChildren, ReactNode, useState } from 'react';

import { MenuItem, PageCategory } from '../types';

export interface IAppContext extends PropsWithChildren {
  menu: MenuItem[];
  firstCategory?: PageCategory;
  setMenu?: (newMenu: MenuItem[]) => void;
}

export const AppContext = createContext<IAppContext>({ menu: [], firstCategory: PageCategory.Courses });

export const AppContextProvider = ({ menu, firstCategory, children }: IAppContext): React.JSX.Element => {
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