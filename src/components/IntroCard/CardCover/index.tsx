
import { FC } from 'react';
import { Icon } from '../../../assets';
import styles from './index.module.scss';

interface ICardCoverProps {
  roundBorder?: boolean;
  onClick?: () => void;
  coverUrl?: string;
  editable?: boolean;
}

export const CardCover: FC<ICardCoverProps> = ({
  roundBorder = false,
  coverUrl,
  editable = false,
  onClick = () => {}
}) => {

  const onClicked = () => {
    if (editable) {
      onClick();
    }
  };

  return (
    <div className={[styles.root, roundBorder ? styles.roundBorder : ''].join(' ')} onClick={onClicked}>
      {
        coverUrl ? (
          <img
            alt={"cover"} 
            src={coverUrl}
            className={styles.cover}
          />
        ): (
          <Icon.MusicCover className={[styles.defaultCover, editable ? styles.hideOnHover : ''].join(' ')} />
        )
      }
      {
        editable && (
          <div className={styles.edit}>
            <Icon.Edit className={styles.editIcon} />
            <p>Chọn ảnh</p>
          </div>
        )
      }
    </div>
  )
};