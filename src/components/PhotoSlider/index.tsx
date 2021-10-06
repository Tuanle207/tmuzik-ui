import { FC, useState } from 'react';
import { Icon } from '../../assets';
import { IconButton } from '../IconButton';
import styles from './index.module.scss';

interface IPhotoSliderProps {
  items: string[];
}

export const PhotoSlider: FC<IPhotoSliderProps> = ({
  items
}) => {

  const [ activeIndex, setActiveIndex ] = useState(0);

  const onPrevious = () => {
    setActiveIndex((prev) => prev - 1);
  };

  const onNext = () => {
    setActiveIndex((prev) => prev + 1);
  };

  return (
    <div className={styles.container}>
      {
        activeIndex > 0 && (
          <IconButton 
            className={[styles.button, styles.buttonLeft].join(' ')}
            onClick={onPrevious}
          >
            <Icon.Left />
          </IconButton>
        )
      }
      {
        items.map((item, index) => {
          const xOffset = `${(index - activeIndex) * 100}%`;
          return (
            <div
              key={index}
              className={styles.item}
              style={{
              transform: `translateX(${xOffset})`
            }}>
              <img
                key={index}
                src={item} 
                alt={`slider item ${index}`}
                draggable={false}
              />
            </div>
          )
        })
      }
      {
        activeIndex < items.length - 1 && (
          <IconButton
            className={[styles.button, styles.buttonRight].join(' ')}
            onClick={onNext}
          >
            <Icon.Right />
          </IconButton>
        )
      }
    </div>
  );
};