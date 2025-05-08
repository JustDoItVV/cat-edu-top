import cn from 'classnames';
import {
    FunctionComponent, KeyboardEvent, PropsWithChildren, ReactNode, useRef, useState
} from 'react';

import { Up } from '@/components';
import { AppContextProvider, IAppContext } from '@/context/app.context';

import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import styles from './Layout.module.css';
import { Sidebar } from './Sidebar/Sidebar';

export interface LayoutProps extends PropsWithChildren {}

function Layout({ children }: LayoutProps): React.JSX.Element {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const skipContentAction = (key: KeyboardEvent) => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault();
      bodyRef.current?.focus();
    }
    setIsSkipLinkDisplayed(false);
  };

  return (
    <div className={styles.wrapper}>
      <a 
        tabIndex={0}
        className={cn(styles.skipLink, {
          [styles.skipLinkDisplayed]: isSkipLinkDisplayed,
        })}
        onFocus={() => setIsSkipLinkDisplayed(true)}
        onKeyDown={skipContentAction}
      >Сразу к содержанию</a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main className={styles.body} ref={bodyRef} tabIndex={0} role='main'>
        {children}
      </main>
      <Footer className={styles.footer} />
      <Up />
    </div>
  );
}

export default function withLayout<T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) {
  return function withLayoutComponent(props: T): React.JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props}/>
        </Layout>
      </AppContextProvider>
    );
  };
};
