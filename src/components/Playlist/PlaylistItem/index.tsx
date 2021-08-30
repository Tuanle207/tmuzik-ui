import moment from 'moment';
import { FC, useRef } from 'react';
import { Icon } from '../../../assets';
import { IconButton } from '../../IconButton';
import styles from './index.module.scss';
import defaultCover from '../../../assets/img/default_music_cover.png';
import { ContextMenuTrigger } from 'react-contextmenu';
import { triggerRightClick } from '../../../utils/triggerRightClick';

export interface IData {
  id: string; 
  name: string;
  photo: string;
  artist: string; 
  album: string; 
  length: number; 
  creationTime: string;
  url: string;
}

interface HiddenOptions {
  creationTime?: boolean;
  album?: boolean;
}

interface IPlaylistItemProps {
  data: IData;
  index: number;
  hidden?: HiddenOptions;
  contextMenuId: string;
}

interface IPlaylistHeaderProps {
  hidden?: HiddenOptions 
}


export const PlaylistItem: FC<IPlaylistItemProps> = ({
  data,
  index,
  hidden = {
    album: false,
    creationTime: true
  },
  contextMenuId
}) => {

  const optionsButtonRef = useRef<HTMLButtonElement>(null);

  const onOptionsClicked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const element = optionsButtonRef.current;
    if (!element) { return; }
    const x = e.clientX;
    const y = e.clientY;
    triggerRightClick(element, {x,y});
    triggerRightClick(element, {x,y});
  };

  return (
    <ContextMenuTrigger id={contextMenuId} attributes={{ itemID: data.id }}>
      <div className={styles.root}>
        <div className={styles.index}>
          <p className={styles.secondaryText}>
            { index }
          </p>
          <IconButton className={styles.playIcon}>
            <Icon.PlayNoRoundBorder />
          </IconButton>
        </div>
        <div className={styles.mainInfo}>
          <img
            className={styles.photo}
            alt={ data.name }
            src={ data.photo || defaultCover}
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
        {
          hidden.album !== true  && (
            <div className={styles.album}>
              <p className={styles.secondaryText}>
                { data.album || 'Unknown' }
              </p>
            </div>
          )
        }
        {
          hidden.creationTime !== true && (
            <div className={styles.creationTime}>
              <p className={styles.secondaryText}>
                { moment.utc(data.creationTime).local().format("DD-MM-YYYY") }
              </p>
            </div>
          )
        }
        <div className={styles.length}>
          <IconButton>
            <Icon.Love />
          </IconButton>
          <span className={styles.secondaryText}>
          { 
            moment(data.length * 1000).format("mm:ss")
          }
          </span>
          <IconButton ref={optionsButtonRef} onClick={onOptionsClicked}>
            <Icon.ThreeDot />
          </IconButton>
        </div>
      </div>
    </ContextMenuTrigger>
  );
};

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