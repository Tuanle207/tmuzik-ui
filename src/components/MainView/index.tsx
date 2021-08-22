import { FC, useEffect, useRef, useState } from 'react';
import { Sidebar } from '../Sidebar';
import { NowPlayingBar } from '../NowPlayingBar';
import { Header } from '../Header';
import { Footer } from '../Footer';
import styles from './index.module.scss';

interface IMainViewProps {
  header?: (transparent: boolean) => JSX.Element;
}

export const MainView: FC<IMainViewProps> = ({ 
  children,
  header
}) => {

  const [ transparentBg, setTransparentBg ]  = useState(false);

  const onScrolled = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.nativeEvent.target || { scrollTop: 0 };
    const yOffset = (target as any).scrollTop;
    
    if (yOffset > 100) {
      setTransparentBg(false);
    } else {
      setTransparentBg(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.viewContainter} onScroll={onScrolled}>
          { header ? header(transparentBg) : (
              <Header transparent={transparentBg} />
          )}
          <div className={styles.viewContent}>
            { children }
            <Footer />
          </div>
        </div>
      </div>
      <NowPlayingBar />
    </div>
  );
};


