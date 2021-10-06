import { FC } from 'react';
import { CardList, Typography } from '../../../components';
import styles from './index.module.scss';

interface IPopularAlbumsProps { }

export const PopularAlbums: FC<IPopularAlbumsProps> = () => {

  return (
    <div className={styles.section}>
      <div className={styles.about}>
        <Typography variant="h3" className={styles.title}>
          Popular albums
        </Typography>
      </div>
      <CardList />
    </div>
  );
};