import moment from 'moment';
import { FC } from 'react';
import { Icon } from '../../../assets';
import { IconButton } from '../../IconButton';
import styles from './index.module.scss';

export interface IData {
  id: string; 
  name: string;
  photo: string;
  artist: string; 
  album: string; 
  length: number; 
  creationTime: string; 
  creationUser: string;
}

interface IPlaylistItemProps {
  data: IData;
}


export const PlaylistItem: FC<IPlaylistItemProps> = ({
  data
}) => {

  return (
    <div className={styles.root}>
      <div className={styles.index}>
        <p className={styles.secondaryText}>
          { data.id }
        </p>
        <IconButton className={styles.playIcon}>
          <Icon.PlayNoRoundBorder />
        </IconButton>
      </div>
      <div className={styles.mainInfo}>
        <img
          className={styles.photo}
          alt={ data.name }
          src={ data.photo }
        />
        <div>
          <p className={styles.mainText}>
            { data.name }
          </p>
          <p className={styles.secondaryText}>
            { data.artist }
          </p>
        </div>
      </div>
      <p className={[styles.secondaryText, styles.album].join(' ')}>
        { data.album }
      </p>
      <div className={styles.length}>
        <IconButton>
          <Icon.Love />
        </IconButton>
        <span className={styles.secondaryText}>
        { 
          moment(data.length * 1000).format("mm:ss")
        }
        </span>
        <IconButton>
          <Icon.ThreeDot />
        </IconButton>
      </div>
    </div>
  );
};