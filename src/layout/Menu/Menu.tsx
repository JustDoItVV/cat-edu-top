import cn from 'classnames';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { KeyboardEvent, useContext, useState } from 'react';

import { Icon } from '../../components';
import { firstLevelMenu } from '../../const';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../types';
import styles from './Menu.module.css';

export function Menu(): React.JSX.Element {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: shouldReduceMotion ? {} : {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    hidden: {
      marginBottom: 0,
    },
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 29,
    },
    hidden: {
      opacity: 0,
      height: 0,
    },
  };

  const openSecondLevel = (secondCategory: string) => {
    if (setMenu) {
      setMenu(menu.map((item) => {
        if (item._id.secondCategory === secondCategory) {
          setAnnounce(item.isOpened ? 'closed' : 'opened');
          item.isOpened = !item.isOpened;
        }
        return item;
      }));
    }
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  const buildFirstLevel = () => {
    return (
      <ul className={styles.firstLevelList}>
        {firstLevelMenu.map((item) => (
          <li key={item.route} aria-expanded={item.id === firstCategory}>
            <Link href={`/${item.route}`}>
              <div className={cn(styles.firstLevel, {
                [styles.firstLevelActive]: item.id === firstCategory,
              })}>
                <Icon icon={item.icon}/>
                <span>{item.name}</span>
              </div>
            </Link>
            {item.id === firstCategory && buildSecondLevel(item)}
          </li>
        ))}
      </ul>
    );
  };

  const buildSecondLevel = (firstLevelMenuItem: FirstLevelMenuItem) => {
    return (
      <ul className={styles.secondBlock}>
        {menu.map((item) => {
          if (item.pages.map((page) => page.alias).includes(router.asPath.split('/')[2])) {
            item.isOpened = true;
          }
          return (
            <li key={item._id.secondCategory}>
              <button
                className={styles.secondLevel}
                tabIndex={0}
                onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, item._id.secondCategory)}
                onClick={() => openSecondLevel(item._id.secondCategory)}
                aria-expanded={item.isOpened}
              >
                {item._id.secondCategory}
              </button>
              <motion.ul
                className={cn(styles.secondLevelBlock)}
                layout
                variants={variants}
                initial={'hidden'}
                animate={item.isOpened ? 'visible' : 'hidden'}
              >
                {buildThirdLevel(item.pages, firstLevelMenuItem.route, item.isOpened ?? false)}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
    return pages.map((page) => (
      <motion.li
       key={`third-level-${page.alias}`}
       variants={variantsChildren}
      >
        <Link
            href={`/${route}/${page.alias}`}
        >
          <a
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]: `/${route}/${page.alias}` === router.asPath,
            })}
            tabIndex={isOpened ? 0 : -1}
            aria-current={`/${route}/${page.alias}` === router.asPath ? 'page' : false}
          >
            {page.category}          
          </a>
        </Link>
      </motion.li>
    ));
  };

  return (
    <nav className={styles.menu} role='navigation'>
      {announce && <span className='visuallyHidden' role='log'>{announce === 'opened' ? 'развёрнуто' : 'свёрнуто'}</span>}
      {buildFirstLevel()}
    </nav>
  );
}
