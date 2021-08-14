import { FC } from 'react';
import { Sidebar } from '../Sidebar';
import { NowPlayingBar } from '../NowPlayingBar';
import styles from './index.module.scss';

interface IMainViewProps { }

export const MainView: FC<IMainViewProps> = ({ children }) => {

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Sidebar />
        { children }
      </div>
      <NowPlayingBar />
    </div>
  )
};


