import { FC } from 'react';
import { Icon } from '../../../assets';
import styles from './index.module.scss';

interface IRemovableFileItemProps { 
  src?: string;
  alt: string;
  element?: 'img' | 'div';
  removable?: boolean;
  onRemoveClick?: (src: string) => void;
  className?: string;
}

export const RemovableFileItem: FC<IRemovableFileItemProps> = ({
  src,
  alt,
  removable = true,
  onRemoveClick = () => {},
  className = '',
  element = 'img'
}) => {

  const onClicked = () => {
    if (removable) {
      const key = src || alt;
      onRemoveClick(key);
    }
  };

  return (
    <div className={[styles.container, className].join(' ')} onClick={onClicked}>
      {
        element === 'img' ? (
          <img src={src} alt={alt} className={styles.cover} />
        ) : (
          <div className={styles.alt}>{alt}</div>
        )
      }
      {
        removable && (
          <div className={styles.remove}>
            <Icon.TrashBin className={styles.removeIcon} />
            <p>
            {
              element === 'img' ? 'Bỏ ảnh' : 'Bỏ tệp'
            }
            </p>
          </div>
        )
      }
    </div>
  );
};