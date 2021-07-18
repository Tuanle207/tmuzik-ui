import React from 'react';
import { ICON } from '../../assets';
import { SliderInput } from '../common';
import './index.scss';

export const NowPlayingBar = () => {

  const [timePt, setTimePt] = React.useState(0);
  const [volumnPt, setVolumPt] = React.useState(40);


  return (
    <div className="now-playing-bar">
      <div className="now-playing-bar__left">
        <img src="https://www.melodynest.com/wp-content/uploads/2019/06/SPACE_album-mock.jpg" alt="song" />
        <div>
          <p>Qua O Cua Thoi Gian</p>
          <span>Cá hồi hoàng</span>
        </div>
        <div>
          <ICON.LOVE />
        </div>
        <div>
          <ICON.MINI_PLAYER />
        </div>
      </div>
      <div className="now-playing-bar__main">
        <div className="now-playing-bar__main__actions">
          <div>
            <ICON.SHUFFLE />
          </div>
          <div>
            <ICON.PREVIOUS />
          </div>
          {/*   <ICON.PAUSE /> */}
          <div>
            <ICON.PLAY />
          </div>
          <div>
            <ICON.NEXT />
          </div>
          <div>
            <ICON.LOOP />
          </div>
        </div>
        <div className="now-playing-bar__main__progress">
          <span>1:23</span>
          <div className="playback-bar">
            <SliderInput
              value={timePt}
              onValueChange={setTimePt}
            />
          </div>
          <span>4:26</span>
        </div>

      </div>
      <div className="now-playing-bar__right">
        <div>
          <ICON.LYRICS />
        </div>
        <div>
          <ICON.PLAYING_QUEUE />
        </div>
        <div>
          <ICON.VOLUME_3 />
        </div>
        <div className="volume-bar"
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