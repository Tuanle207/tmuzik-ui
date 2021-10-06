import { FC } from 'react';
import { CardList, Typography } from '../../../components';
import styles from './index.module.scss';

interface IAlbumsProps { }

export const Albums: FC<IAlbumsProps> = () => {

  return (
    <div className={styles.section}>
      <div className={styles.about}>
        <Typography variant="h3" className={styles.title}>
          Albums
        </Typography>
      </div>
      <CardList />
    </div>
  );
};