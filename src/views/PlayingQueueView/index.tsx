import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Playlist, Typography, ViewWrapper } from '../../components';
import { queueSelector } from '../../store/selectors';
import styles from './index.module.scss';

interface IPlayingQueueViewProps { }

export const PlayingQueueView: FC<IPlayingQueueViewProps> = () => {

  const playingItem = useSelector(queueSelector.current);
  const queueItems = useSelector(queueSelector.queue);

  return (
    <ViewWrapper className={styles.container}>
      <Typography className={styles.heading}>Danh sách chờ</Typography>
      {
        playingItem && (
          <div className={styles.list}>
            <Typography variant="p1" className={styles.subTitle}>Đang phát</Typography>
            <Playlist data={[{
                id: playingItem.id,
                name: playingItem.name,
                album: playingItem.albumTag,
                artist: playingItem.artist,
                length: playingItem.length,
                photo: playingItem.cover,
                url: playingItem.url
              }]}
              activeItemId={playingItem.id}
            />
          </div>
        )
      }
      <div className={styles.list}>
        {
          queueItems.length > 0 ? (
            <>
              <Typography variant="p1" className={styles.subTitle}>Phát tiếp theo</Typography>
              <Playlist data={queueItems.map((x) => ({
                  id: x.id,
                  name: x.name,
                  album: x.albumTag,
                  artist: x.artist,
                  length: x.length,
                  photo: x.cover,
                  url: x.url
                }))}
                activeItemId={playingItem?.id}
              />
            </>
          ) : <Typography variant="p1" className={styles.subTitle}>Chưa có bài hát nào</Typography>
        }
      </div>
    </ViewWrapper>
  );
};