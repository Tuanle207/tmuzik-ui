import { FC } from 'react';
import { CardList, Typography } from '../../../components';
import styles from './index.module.scss';

interface IPublicPlaylistProps { }

export const PublicPlaylist: FC<IPublicPlaylistProps> = () => {

  return (
    <div className={styles.section}>
      <div className={styles.about}>
        <Typography variant="h3" className={styles.title}>
          Playlist công khai
        </Typography>
      </div>
      <CardList />
    </div>
  );
};