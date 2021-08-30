import { FC, useState } from 'react';
import { Footer, Header } from '..';
import styles from './index.module.scss';

interface IViewWrapperProps {
  header?: (transparent: boolean) => JSX.Element;
  className?: string;
}

export const ViewWrapper: FC<IViewWrapperProps> = ({
  header,
  children,
  className
}) => {

  const [ transparentBg, setTransparentBg ]  = useState(false);

  const onScrolled = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.nativeEvent.target || { scrollTop: 0 };
    const yOffset = (target as any).scrollTop;    
    setTransparentBg(yOffset <= 100);
  };

  return (
    <div className={styles.viewContainter} onScroll={onScrolled}>
      { header ? header(transparentBg) : (
          <Header transparent={transparentBg} />
      )}
      <div className={styles.viewContent}>
        <div className={[styles.content, className ?? ''].join(' ')}>
        {
          children
        }
        </div>
      <Footer />
      </div>
    </div>
  );
};