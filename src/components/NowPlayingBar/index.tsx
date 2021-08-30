import moment from 'moment';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Icon } from '../../assets';
import { paths } from '../../routings';
import { queueAction } from '../../store/actions';
import { queueSelector } from '../../store/selectors';
import { IconButton } from '../IconButton';
import { SliderInput } from '../SliderInput';
import styles from './index.module.scss';

interface INowPlayingBarProps {

}

interface IPlayingItem {
  src: string;
  length: number;
  cover?: string;
  name: string;
  album?: string;
}

type PlayingState = 'play' | 'pause' | 'changing';

export const NowPlayingBar: FC<INowPlayingBarProps> = () => {
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const history = useHistory();

  const [ currTime, setCurrTime ] = useState(0);
  const [ volumnPt, setVolumPt ] = useState(70);
  const [ mute, setMute ] = useState(false);
  const [ playingStatus, setPlayingStatus ] = useState<PlayingState>('pause');
 
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
      setPlayingStatus('changing');
    }
  }, [ playingItem ]);
  
  useEffect(() => {
    if (playingStatus === 'changing') {
      setPlayingStatus('play');
    } else if (playingStatus === 'play') {
      play();
    } else if (playingStatus === 'pause') {
      pause();
    }
  }, [ playingStatus ]);

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

  // const onSrcLoad = () => {
  //   const audioIns = audioRef.current;
  //   if (audioIns === null) { return; }
  //   audioIns.play();
  // };

  const onTooglePlayClicked = async () => {
    if (playingStatus === 'play') {
      setPlayingStatus('pause');
    } else if (playingStatus === 'pause') {
      setPlayingStatus('play');
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
      setPlayingStatus('pause');
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
    history.push(paths.Queue);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={playingItem.cover} alt="cover" />
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
