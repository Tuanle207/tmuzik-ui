import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import moment from 'moment';
import { Icon } from '../../assets';
import { paths } from '../../routings';
import { queueAction } from '../../store/actions';
import { queueSelector } from '../../store/selectors';
import { IconButton } from '../IconButton';
import { SliderInput } from '../SliderInput';
import styles from './index.module.scss';
import defaultCoverfrom from '../../assets/img/default_music_cover.png';
interface INowPlayingBarProps {

}

interface IPlayingItem {
  src: string;
  length: number;
  cover?: string;
  name: string;
  album?: string;
}

export const NowPlayingBar: FC<INowPlayingBarProps> = () => {
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const [ currTime, setCurrTime ] = useState(0);
  const [ volumnPt, setVolumPt ] = useState(70);
  const [ mute, setMute ] = useState(false);
  const playingStatus = useSelector(queueSelector.playingStatus);
 
  const [ playingItem, setPlayingItem ] = useState<IPlayingItem>({
    name: '',
    length: 0,
    album: '',
    cover: '',
    src: ''
  })

  const dispatch = useDispatch();
  const currentPlaying = useSelector(queueSelector.current);
  const canPlayNext = useSelector(queueSelector.canPlayNext);
  const canPlayPrevious = useSelector(queueSelector.canPlayPrevious);
  const loop = useSelector(queueSelector.loop);
  const shuffle = useSelector(queueSelector.shuffle);

  useEffect(() => {
    if (currentPlaying) {
      setCurrTime(0);
      setPlayingItem({
        name: currentPlaying.name,
        length: currentPlaying.length,
        src: currentPlaying.url,
        album: currentPlaying.albumTag,
        cover: currentPlaying.cover
      });
    }
  }, [ currentPlaying ]);

  useEffect(() => {
    if (playingItem.src && playingItem.src.trim() !== '') {
      dispatch(queueAction.changePlayingStatus('changing'));
      // setPlayingStatus('changing');
    }
  }, [ playingItem, dispatch ]);
  
  useEffect(() => {
    if (playingStatus === 'changing') {
      // setPlayingStatus1('play');
      dispatch(queueAction.changePlayingStatus('play'));
    } else if (playingStatus === 'play') {
      play();
    } else if (playingStatus === 'pause') {
      pause();
    }
  }, [ playingStatus, dispatch ]);

  useEffect(() => {
    const audioIns = audioRef.current;
    if (audioIns === null) { return; }
    
    if (mute) {
      audioIns.volume = 0;
    } else {
      audioIns.volume = volumnPt / 100;
    }
  }, [ volumnPt, mute ]);


  const play = async () => {
    const audioIns = audioRef.current;
    if (audioIns === null) { return; }
    await audioIns.play();
  };

  const pause = async () => {
    const audioIns = audioRef.current;
    if (audioIns === null) { return; }
    audioIns.pause();
  };

  const onTooglePlayClicked = async () => {
    if (playingStatus === 'play') {
      // setPlayingStatus('pause');
      dispatch(queueAction.changePlayingStatus('pause'));
    } else if (playingStatus === 'pause') {
      dispatch(queueAction.changePlayingStatus('play'));
      // setPlayingStatus('play');
    }
  };

  const onInputCurrentTimeChange = (currentTime: number) => {
    const audioIns = audioRef.current;
    if (audioIns === null) { return; }

    audioIns.currentTime = currentTime;
    setCurrTime(currTime);
  };

  const onAudioCurrentTimeChange = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const value = e.currentTarget.currentTime;
    setCurrTime(value);
  };

  const onVolChanged = (value: number) => {
    if (mute) { setMute(false); }
    setVolumPt(value);
  };

  const onCurrentPlayEnd = () => {
    if (canPlayNext) {
      onPlayNextClicked();
    } else {
      // setPlayingStatus('pause');
      dispatch(queueAction.changePlayingStatus('pause'));
    }
  };

  const onPlayNextClicked = () => {
    if (!canPlayNext) { return; }
    dispatch(queueAction.goNext());
  };

  const onPlayPreviousClicked = () => {
    dispatch(queueAction.goPrevious());
  };

  const onLoopClicked = () => {
    dispatch(queueAction.setLoop(!loop));
  };

  const onShuffleClicked = () => {
    dispatch(queueAction.setShuffle(!shuffle));
  };

  const onMuteClicked = () => {
    setMute((prev) => !prev);
  };

  const onQueueClicked = () => {
    dispatch(push(paths.Queue));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {
          playingItem.cover ? (
            <img src={playingItem.cover || defaultCoverfrom} alt="cover" />
          ) : (
            <Icon.MusicCover />
          )
        }
        <div>
          <p>{ playingItem.name }</p>
          <span>{ playingItem.album || '' }</span>
        </div>
        <IconButton className={styles.iconButton}>
          <Icon.Love />
        </IconButton>
        <IconButton className={styles.iconButton}>
          <Icon.MiniPlayer />
        </IconButton>
      </div>
      <div className={styles.main}>
        <audio 
          ref={audioRef} 
          hidden 
          autoPlay={false}
          src={playingItem.src}
          onTimeUpdate={onAudioCurrentTimeChange}
          onEnded={onCurrentPlayEnd}
        />
        <div className={styles.actions}>
          <IconButton
            className={[styles.iconButton, shuffle ? styles.iconButtonActive : ''].join(' ')} 
            onClick={onShuffleClicked}
          >
            <Icon.Shuffle />
          </IconButton>
          <IconButton 
            className={styles.iconButton} 
            onClick={onPlayPreviousClicked}
            disabled={!canPlayPrevious}
          >
            <Icon.Previous />
          </IconButton>
          <IconButton 
            className={styles.iconButton} 
            onClick={onTooglePlayClicked}
          >
          {
            playingStatus === 'play' ? <Icon.Pause /> : <Icon.Play />
          }
          </IconButton>
          <IconButton 
            className={styles.iconButton} 
            onClick={onPlayNextClicked}
            disabled={!canPlayNext}
          >
            <Icon.Next />
          </IconButton>
          <IconButton
            className={[styles.iconButton, loop ? styles.iconButtonActive : ''].join(' ')} 
            onClick={onLoopClicked}>
            <Icon.Loop />
          </IconButton>
        </div>
        <div className={styles.progress}>
          <span>{ moment(currTime * 1000).format("mm:ss") }</span>
          <div>
            <SliderInput
              value={currTime}
              onValueChange={onInputCurrentTimeChange}
              min={0}
              max={playingItem.length}
            />
          </div>
          <span>{ moment(playingItem.length * 1000).format("mm:ss") }</span>
        </div>

      </div>
      <div className={styles.right}>
        <IconButton className={styles.iconButton}>
          <Icon.Lyrics />
        </IconButton>
        <IconButton className={styles.iconButton} onClick={onQueueClicked}>
          <Icon.PlayingQueue />
        </IconButton>
        <IconButton className={styles.iconButton} onClick={onMuteClicked}>
        {
          volumnPt === 0 || mute ? <Icon.VolumeMute /> :
          volumnPt >= 70 ? <Icon.VolumeLarge /> :
          volumnPt >= 30 ? <Icon.VolumeMedium /> : 
          <Icon.VolumeSmall />
        }
        </IconButton>
        <div className={styles.volumeBar}
        >
          <SliderInput
            value={mute ? 0 : volumnPt}
            onValueChange={onVolChanged}
          />
        </div>
      </div>
    </div>
  )
};
