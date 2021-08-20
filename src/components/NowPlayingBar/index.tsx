import { FC, useState } from 'react';
import { Icon } from '../../assets';
import { SliderInput } from '../SliderInput';
import styles from './index.module.scss';

interface INowPlayingBarProps {

}

export const NowPlayingBar: FC<INowPlayingBarProps> = () => {

  const [timePt, setTimePt] = useState(30);
  const [volumnPt, setVolumPt] = useState(40);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying((pre) => !pre);
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src="https://www.melodynest.com/wp-content/uploads/2019/06/SPACE_album-mock.jpg" alt="song" />
        <div>
          <p>Qua O Cua Thoi Gian</p>
          <span>Cá hồi hoàng</span>
        </div>
        <div>
          <Icon.Love />
        </div>
        <div>
          <Icon.MiniPlayer />
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.actions}>
          <div>
            <Icon.Shuffle />
          </div>
          <div>
            <Icon.Previous />
          </div>
          <div onClick={handlePlay}>
            {
              playing ? <Icon.Pause /> : <Icon.Play />
            }
          </div>
          <div>
            <Icon.Next />
          </div>
          <div>
            <Icon.Loop />
          </div>
        </div>
        <div className={styles.progress}>
          <span>1:23</span>
          <div>
            <SliderInput
              value={timePt}
              onValueChange={setTimePt}
            />
          </div>
          <span>4:26</span>
        </div>

      </div>
      <div className={styles.right}>
        <div>
          <Icon.Lyrics />
        </div>
        <div>
          <Icon.PlayingQueue />
        </div>
        <div>
          <Icon.VolumeLarge />
        </div>
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
