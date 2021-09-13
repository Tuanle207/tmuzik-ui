import { FC } from 'react';
import { Playlist, Typography } from '../../../components';
import styles from './index.module.scss';

interface IRecentPlayProps { }

export const RecentPlay: FC<IRecentPlayProps> = () => {

  return (
    <div className={styles.section}>
      <div className={styles.about}>
        <Typography variant="h3" className={styles.title}>
          Nghe gần đây
        </Typography>
        <Typography variant="p2">
          Chỉ hiển thị với bạn
        </Typography>
      </div>
      <Playlist />
    </div>
  );
};