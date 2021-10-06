import { FC, useRef } from 'react';
import { useContextMenu } from 'react-contexify';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { queueSelector } from '../../../store/selectors';
import { queueAction } from '../../../store/actions';
import { PLAYLIST_MENU_ID } from '../PlaylistMenu';
import { IconButton } from '../../IconButton';
import { Icon } from '../../../assets';
import styles from './index.module.scss';
import equaliserAnimationGif from '../../../assets/img/equaliser-animated-green.gif';

export interface IData {
  id: string; 
  name: string;
  photo: string;
  artist: string; 
  album: string; 
  length: number; 
  creationTime?: string;
  url: string;
}

export interface HiddenOptions {
  creationTime?: boolean;
  album?: boolean;
}

interface IPlaylistItemProps {
  data: API.AudioItem;
  index: number;
  hidden?: HiddenOptions;
  contextMenuId: string;
  isActiveItem?: boolean;
}


export const PlaylistItem: FC<IPlaylistItemProps> = ({
  data,
  index,
  hidden = {
    album: false,
    creationTime: true
  },
  contextMenuId,
  isActiveItem = false,
}) => {

  const optionsButtonRef = useRef<HTMLButtonElement>(null);
  
  const { show } = useContextMenu({id: PLAYLIST_MENU_ID});

  const dispatch = useDispatch();
  const playingStatus = useSelector(queueSelector.playingStatus);
  const playingItem = useSelector(queueSelector.current);

  const onPauseClicked = () => {
    dispatch(queueAction.changePlayingStatus('pause'))
  };

  const onPlayClicked = () => {
    if (playingItem?.id !== data.id) {
      dispatch(queueAction.addAndPlayAudio(data));
    } else {
      dispatch(queueAction.changePlayingStatus('play'));
    }
  };

  const showContextMenu = (e: any) => {
    e.preventDefault();
    show(e, {props: {
      itemId: data.id
    }});
  };

  return (
    // <ContextMenuTrigger id={contextMenuId} attributes={{ itemID: data.id }}>
      <div className={styles.root} onContextMenu={showContextMenu}>
        <div className={styles.index}>
          {
            isActiveItem && playingStatus === 'play' ? (
              <>
                <img src={equaliserAnimationGif} alt="visualizer" />
                <IconButton className={styles.playIcon} onClick={onPauseClicked}>
                  <Icon.PauseNoRoundBorder />
                </IconButton>
              </>
            ) : 
            (
              <>
                <p className={[styles.secondaryText, isActiveItem ? styles.activeColor : ''].join(' ')}>
                  { index }
                </p>
                <IconButton className={styles.playIcon} onClick={onPlayClicked}>
                  <Icon.PlayNoRoundBorder />
                </IconButton>
              </>
            )
          }
          
        </div>
        <div className={styles.mainInfo}>
          {
            data.cover ? (
              <img
                className={styles.photo}
                alt={ data.name }
                src={ data.cover}
              />
            ) : (
              <Icon.MusicCover className={styles.photo} />
            )
          }
          
          <div>
            <p className={[styles.mainText, isActiveItem ? styles.activeColor : ''].join(' ')}>
              { data.name }
            </p>
            <p className={styles.secondaryText}>
              { data.artistTag || data.artist?.name || '' }
            </p>
          </div>
        </div>
        {
          hidden.album !== true  && (
            <div className={styles.album}>
              <p className={styles.secondaryText}>
                { data.albumTag || data.album?.name || '' }
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
          <IconButton ref={optionsButtonRef} onClick={showContextMenu}>
            <Icon.ThreeDot />
          </IconButton>
        </div>
      </div>
    // </ContextMenuTrigger>
  );
};

