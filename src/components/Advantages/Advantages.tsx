import { PageAdvantage } from '@/types';

import { Icon } from '../Icon/Icon';
import styles from './Advantages.module.css';

interface AdvantagesProps {
  advantages: PageAdvantage[];
}

export function Advantages({ advantages }: AdvantagesProps): React.JSX.Element {
  return (
    <>
      {advantages.map((advantage) => (
        <div key={advantage._id} className={styles.advantage}>
          <Icon icon='check' />
          <div className={styles.title}>{advantage.title}</div>
          <hr className={styles.vline} />
          <div>{advantage.description}</div>
        </div>
      ))} 
    </>
  );
}
