import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Playlist, PlaylistItem, Typography, ViewWrapper } from '../../components';
import { PLAYLIST_MENU_ID } from '../../components/Playlist/PlaylistMenu';
import { queueSelector } from '../../store/selectors';
import styles from './index.module.scss';

interface IPlayingQueueViewProps { }

export const PlayingQueueView: FC<IPlayingQueueViewProps> = () => {

  const playingItem = useSelector(queueSelector.current);
  const queueItems = useSelector(queueSelector.queue);

  return (
    <ViewWrapper title="Danh sách chờ" className={styles.container}>
      <Typography className={styles.heading}>Danh sách chờ</Typography>
      {
        playingItem && (
          <div className={styles.list}>
            <Typography variant="p1" className={styles.subTitle}>Đang phát</Typography>
            <Playlist 
              data={[playingItem]}
              activeItemId={playingItem.id}
              render={(data, index) => (
                <PlaylistItem
                  key={data.id} 
                  index={index} 
                  data={data} 
                  hidden={{creationTime: false}} 
                  contextMenuId={PLAYLIST_MENU_ID}
                  isActiveItem={data.id === playingItem?.id}
                />
              )}
            />
          </div>
        )
      }
      <div className={styles.list}>
      {
        queueItems.length > 0 ? (
          <>
            <Typography variant="p1" className={styles.subTitle}>Phát tiếp theo</Typography>
            <Playlist
              data={queueItems}
              activeItemId={playingItem?.id}
              render={(data, index) => (
                <PlaylistItem
                  key={data.id} 
                  index={index} 
                  data={data} 
                  hidden={{creationTime: false}} 
                  contextMenuId={PLAYLIST_MENU_ID}
                  isActiveItem={data.id === playingItem?.id}
                />
              )}
            />
          </>
        ) : <Typography variant="p1" className={styles.subTitle}>Chưa có bài hát nào</Typography>
      }
      </div>
    </ViewWrapper>
  );
};