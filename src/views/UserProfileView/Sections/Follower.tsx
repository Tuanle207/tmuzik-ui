import { FC } from 'react';
import { CardList, Typography } from '../../../components';
import styles from './index.module.scss';

interface IFollowerProps { }

export const Follower: FC<IFollowerProps> = () => {

  return (
    <div className={styles.section}>
      <div className={styles.about}>
        <Typography variant="h3" className={styles.title}>
          Người theo dõi
        </Typography>
      </div>
      <CardList />
    </div>
  );
};