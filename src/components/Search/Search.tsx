import cn from 'classnames';
import { useRouter } from 'next/router';
import { DetailedHTMLProps, HTMLAttributes, KeyboardEvent, useState } from 'react';

import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { Input } from '../Input/Input';
import styles from './Search.module.css';

interface SearchProps extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {}

export function Search({ className, ...props }: SearchProps): React.JSX.Element {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const goToSearch = () => {
    router.push({ pathname: '/search', query: { q: search } });
  };

  const handleKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Enter') goToSearch();
  };

  return (
    <form
      className={cn(styles.search, className)}
      role='search'
      {...props}
    >
      <Input
        className={styles.input}
        placeholder='Поиск...'
        value={search}
        onChange={(evt) => setSearch(evt.currentTarget.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        appearance='primary'
        className={styles.button}
        onClick={goToSearch}
        aria-label='Искать по сайту'
      >
        <Icon icon='search' viewBox='0 0 36 36' />
      </Button>
    </form>
  );
}
