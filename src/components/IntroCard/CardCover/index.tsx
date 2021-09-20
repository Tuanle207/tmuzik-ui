
import { forwardRef } from 'react';
import { Icon } from '../../../assets';
import styles from './index.module.scss';

interface ICardCoverProps {
  roundBorder?: boolean;
  onClick?: () => void;
  coverUrl?: string;
  editable?: boolean;
  defaultIcon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

export const CardCover= forwardRef<HTMLImageElement, ICardCoverProps>(({
  roundBorder = false,
  coverUrl,
  editable = false,
  onClick = () => {},
  defaultIcon: DefaultIcon
}, ref) => {

  const onClicked = () => {
    if (editable) {
      onClick();
    }
  };

  const renderDefaulIcon = () => {
    return (
      DefaultIcon ? DefaultIcon({className: [styles.defaultCover, editable ? styles.hideOnHover : ''].join(' ')}) :
          <Icon.MusicCover className={[styles.defaultCover, editable ? styles.hideOnHover : ''].join(' ')} />
    );
  };

  return (
    <div className={[styles.root, roundBorder ? styles.roundBorder : ''].join(' ')} onClick={onClicked}>
      {
        coverUrl ? (
          <img
            ref={ref}
            alt={"cover"} 
            src={coverUrl}
            className={styles.cover}
          />
        ): (
          renderDefaulIcon()
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
});