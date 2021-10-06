import { FC } from 'react';
import { Playlist, Typography } from '../../../components';
import styles from './index.module.scss';

interface IPopularAudiosProps { }

export const PopularAudios: FC<IPopularAudiosProps> = () => {

  return (
    <div className={styles.section}>
      <div className={styles.about}>
        <Typography variant="h3" className={styles.title}>Popular audios</Typography>
      </div>
      <Playlist />
    </div>
  );
};