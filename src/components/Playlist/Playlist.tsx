import { FC } from 'react';
import styles from './index.module.scss';
import { PlaylistHeader } from './Item/PlaylistHeader';
import { PlaylistItem } from './Item/PlaylistItem';
import { PlaylistMenu, PLAYLIST_MENU_ID } from './PlaylistMenu';

interface IPlaylistProps {
  data?: API.AudioItem[];
  render?: (data: API.AudioItem, index: number) => JSX.Element;
  renderHeader?: () => JSX.Element;
  showHeader?: boolean;
  activeItemId?: string;
}

export const Playlist: FC<IPlaylistProps> = ({
  data = [],
  render,
  renderHeader,
  showHeader = false,
  activeItemId,
}) => {

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {
          showHeader && (
            <div className={styles.header}>
              {
                renderHeader ? renderHeader() : (
                  <PlaylistHeader hidden={{creationTime: true}} />
                )
              }
            </div>
          )
        }
        {
          render ? data.map((el, index) => render(el, index + 1)) :
          data.map((el, index) => 
            <PlaylistItem
              key={el.id} 
              index={index + 1} 
              data={el} 
              hidden={{creationTime: true}} 
              contextMenuId={PLAYLIST_MENU_ID}
              isActiveItem={el.id === activeItemId}
            />
          )
        }
        {
          data.length === 0 && (
            <p className={styles.empty}>Danh sách trống</p>
          )
        }
        <PlaylistMenu data={data} />
      </div>
    </div>
  );
};