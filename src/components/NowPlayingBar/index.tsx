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

export const NowPlayingBar: FC<INowPlayingBarProps> = () => {
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const history = useHistory();

  const [ currTime, setCurrTime ] = useState(0);
  const [ volumnPt, setVolumPt ] = useState(40);
  const [ playing, setPlaying ] = useState(false);
 
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
      setPlaying(true);
    }
  }, [ currentPlaying ]);

  useEffect(() => {
    const audioIns = audioRef.current;
    if (audioIns === null) { return; }
    audioIns.volume = volumnPt / 100;
  }, [ volumnPt ])

  useEffect(() => {
    
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

    if (playing) {
      play();
    } else {
      pause();
    }
  }, [ playing ])

  const onTooglePlayClicked = async () => {
    setPlaying((prev) => !prev);
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

  const onCurrentPlayEnd = () => {
    onPlayNextClicked();
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
    dispatch(queueAction.setLoop(!loop));
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
          <IconButton className={styles.iconButton} onClick={onShuffleClicked}>
            <Icon.Shuffle />
          </IconButton>
          <IconButton className={styles.iconButton} onClick={onPlayPreviousClicked}>
            <Icon.Previous />
          </IconButton>
          <IconButton className={styles.iconButton} onClick={onTooglePlayClicked}>
          {
            playing ? <Icon.Pause /> : <Icon.Play />
          }
          </IconButton>
          <IconButton className={styles.iconButton} onClick={onPlayNextClicked}>
            <Icon.Next />
          </IconButton>
          <IconButton className={styles.iconButton} onClick={onLoopClicked}>
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
              max={297}
            />
          </div>
          <span>{ moment(297 * 1000).format("mm:ss") }</span>
        </div>

      </div>
      <div className={styles.right}>
        <IconButton className={styles.iconButton}>
          <Icon.Lyrics />
        </IconButton>
        <IconButton className={styles.iconButton} onClick={onQueueClicked}>
          <Icon.PlayingQueue />
        </IconButton>
        <IconButton className={styles.iconButton}>
          <Icon.VolumeLarge />
        </IconButton>
        <div className={styles.volumeBar}
        >
          <SliderInput
            value={volumnPt}
            onValueChange={setVolumPt}
          />
        </div>
      </div>
    </div>
  )
};
