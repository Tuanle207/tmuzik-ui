import { FC } from 'react';
import { Playlist, Typography, ViewWrapper } from '../../components';
import styles from './index.module.scss';

interface IPlayingQueueViewProps { }

export const PlayingQueueView: FC<IPlayingQueueViewProps> = () => {

  return (
    <ViewWrapper className={styles.container}>
      <Typography className={styles.heading}>Danh sách chờ</Typography>
      <div className={styles.list}>
        <Typography variant="p1" className={styles.subTitle}>Đang phát</Typography>
        <Playlist />
      </div>
      <div className={styles.list}>
        <Typography variant="p1" className={styles.subTitle}>Phát tiếp theo</Typography>
        <Playlist />
      </div>
    </ViewWrapper>
  );
};