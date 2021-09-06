import { FC, useState } from 'react';
import { Footer, Header } from '..';
import styles from './index.module.scss';

interface IViewWrapperProps {
  header?: (input: { opacity: number; }) => JSX.Element;
  className?: string;
}

export const ViewWrapper: FC<IViewWrapperProps> = ({
  header,
  children,
  className
}) => {

  const [ headerOpacity, setHeaderOpacity ] = useState(0);

  const onScrolled = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.nativeEvent.target || { scrollTop: 0 };
    const yOffset = (target as any).scrollTop;
    const END_YOFFSET = 200;
    let opacity = yOffset / END_YOFFSET;
    if (opacity > 1) opacity = 1
    setHeaderOpacity(opacity);
  };

  return (
    <div className={styles.viewContainter}>
      { header ? header({ opacity: headerOpacity}) : (
          <Header opacity={headerOpacity} />
      )}
      <div className={styles.viewContent} onScroll={onScrolled}>
        <div className={styles.scrollBar}></div>
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