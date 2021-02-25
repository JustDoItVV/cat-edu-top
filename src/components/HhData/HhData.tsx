import { HhData as HhDataType } from '../../types';
import { priceRu } from '../../utils';
import { Card } from '../Card/Card';
import { Icon } from '../Icon/Icon';
import styles from './HhData.module.css';

interface HhDataProps extends HhDataType {}

export function HhData({ count, juniorSalary, middleSalary, seniorSalary }: HhDataProps): JSX.Element {
  return (
    <div className={styles.hh}>
      <Card className={styles.count}>
        <div className={styles.title}>Всего вакансий</div>
        <div className={styles.countValue}>{count}</div>
      </Card>
      <Card className={styles.salary}>
        <div>
          <div className={styles.title}>Начальный</div>
          <div className={styles.salaryValue}>{priceRu(juniorSalary)}</div>
          <div className={styles.rate}>
            <Icon icon='star' className={styles.filled} />
            <Icon icon='star' />
            <Icon icon='star' />
          </div>
        </div>
        <div>
          <div className={styles.title}>Средний</div>
          <div className={styles.salaryValue}>{priceRu(middleSalary)}</div>
          <div className={styles.rate}>
            <Icon icon='star' className={styles.filled} />
            <Icon icon='star' className={styles.filled} />
            <Icon icon='star' />
          </div>
        </div>
        <div>
          <div className={styles.title}>Профессионал</div>
          <div className={styles.salaryValue}>{priceRu(seniorSalary)}</div>
          <div className={styles.rate}>
            <Icon icon='star' className={styles.filled} />
            <Icon icon='star' className={styles.filled} />
            <Icon icon='star' className={styles.filled} />
          </div>
        </div>
      </Card>
    </div>
  );
}
