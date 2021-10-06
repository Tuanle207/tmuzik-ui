import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import moment from 'moment';
import { Icon } from '../../assets';
import { routes } from '../../routings';
import { queueAction, uiAction } from '../../store/actions';
import { queueSelector, uiSelector } from '../../store/selectors';
import { IconButton } from '../IconButton';
import { SliderInput } from '../SliderInput';
import styles from './index.module.scss';

interface INowPlayingBarProps { }

export const NowPlayingBar: FC<INowPlayingBarProps> = () => {
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const [ currTime, setCurrTime ] = useState(0);
  const [ volumnPt, setVolumPt ] = useState(70);
  const [ mute, setMute ] = useState(false);

  // this was born for handling PLAYING QUEUE PERSISTENCE IN REDUX problem: on property PLAYINGSTATUS.
  // const [ currentItemChangeTime, setCurrentItemChangeTime ] = useState(1);

  const [ playingItem, setPlayingItem ] = useState<API.AudioItem | null>(null);
  
  const dispatch = useDispatch();
  const currentPlaying = useSelector(queueSelector.current);
  const playingStatus = useSelector(queueSelector.playingStatus);
  const canPlayNext = useSelector(queueSelector.canPlayNext);
  const canPlayPrevious = useSelector(queueSelector.canPlayPrevious);
  const loop = useSelector(queueSelector.loop);
  const shuffle = useSelector(queueSelector.shuffle);
  const showListenParty = useSelector(uiSelector.showListenParty);


  useEffect(() => {
    setCurrTime(0);
    setPlayingItem(currentPlaying);
  }, [currentPlaying]);

  useEffect(() => {
    

    if (playingItem?.file?.trim() !== '') {
      dispatch(queueAction.changePlayingStatus('changing'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ playingItem, dispatch ]);
  
  useEffect(() => {
    // if (currentItemChangeTime <= 1) {
    //   setCurrentItemChangeTime((prev) => prev + 1);
    //   return;
    // }
    switch (playingStatus) {
      case 'changing':
        dispatch(queueAction.changePlayingStatus('play')); break;
      case 'play':
        play(); break;
      case 'pause':
        pause(); break;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ playingStatus, dispatch ]);

  useEffect(() => {
    const audioIns = audioRef.current;
    if (audioIns === null) return;
    
    const newVol = mute ? 0 : volumnPt / 100;
    audioIns.volume = newVol;
  }, [ volumnPt, mute ]);


  const play = async () => {
    audioRef.current?.play();
  };

  const pause = () => {
    audioRef.current?.pause();
  };

  const onTooglePlayClicked = async () => {
    if (playingStatus === 'play') {
      dispatch(queueAction.changePlayingStatus('pause'));
    } else if (playingStatus === 'pause') {
      dispatch(queueAction.changePlayingStatus('play'));
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
    dispatch(push(routes.Queue));
  };

  const onListenPartyToggle = () => {
    dispatch(uiAction.setListenPartyBoxDisplay(!showListenParty));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {
          playingItem?.cover ? (
            <img src={playingItem.cover} alt="cover" />
          ) : (
            <Icon.MusicCover />
          )
        }
        <div>
          <p>{ playingItem?.name || '' }</p>
          <span>{ playingItem?.artistTag || playingItem?.artist?.name || '' }</span>
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
          src={playingItem?.file}
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
              max={playingItem?.length}
            />
          </div>
          <span>{ moment((playingItem?.length || 0) * 1000).format("mm:ss") }</span>
        </div>

      </div>
      <div className={styles.right}>
        <IconButton className={styles.iconButton}>
          <Icon.Lyrics />
        </IconButton>
        <IconButton className={styles.iconButton} onClick={onQueueClicked}>
          <Icon.PlayingQueue />
        </IconButton>
        <IconButton className={styles.iconButton} onClick={onListenPartyToggle}>
          <Icon.Friends />
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
