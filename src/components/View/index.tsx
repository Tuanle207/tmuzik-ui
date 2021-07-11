import React from 'react';
import { Sidebar } from '../Sidebar';
import { NowPlayingBar } from '../NowPlayingBar';
import './index.scss';

interface IProps { }

export const View : React.FC<IProps> = ({ children }) => {

  return (
    <div className="view">
      <div className="view__main">
        <Sidebar />
        <div>
          {
            children
          }
        </div>
      </div>
      <div className="view__bottom">
        <NowPlayingBar />
      </div>
    </div>
  )
}