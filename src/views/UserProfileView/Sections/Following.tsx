import { FC } from 'react';
import { CardList, Typography } from '../../../components';
import styles from './index.module.scss';

interface IFollowingProps { }

export const Following: FC<IFollowingProps> = () => {

  return (
    <div className={styles.section}>
      <div className={styles.about}>
        <Typography variant="h3" className={styles.title}>
          Đang theo dõi
        </Typography>
      </div>
      <CardList />
    </div>
  );
};