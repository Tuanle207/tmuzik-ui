import { FC } from 'react';
import { Icon } from '../../../assets';
import { HiddenOptions } from './PlaylistItem';
import styles from './index.module.scss';

interface IPlaylistHeaderProps {
  hidden?: HiddenOptions;
}

export const PlaylistHeader: FC<IPlaylistHeaderProps> = ({
  hidden =  {
    album: false,
    creationTime: true
  }
}) => {

  return (
    <div className={[styles.root, styles.noHover].join(' ')}>
      <div className={styles.index}>
        <p className={styles.secondaryText}>#</p>
      </div>
      <div className={styles.mainInfo}>
        <p className={styles.secondaryText}>TIÊU ĐỀ</p>
      </div>
      {
        hidden.album !== true  && (
          <div className={styles.album}>
            <p className={styles.secondaryText}>
              ALBUM
            </p>
          </div>
        )
      }
      {
        hidden.creationTime !== true && (
          <div className={styles.creationTime}>
            <p className={styles.secondaryText}>
              NGÀY TẠO
            </p>
          </div>
        )
      }
      <div className={styles.length}>
        <Icon.Clock className={styles.durationIcon} />
      </div>
    </div>
  );
};