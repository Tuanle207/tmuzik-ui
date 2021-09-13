import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { uiAction } from '../../store/actions';
import { getPaletteFromImage } from '../../utils/getPaletteFromImage';
import { CardCover } from './CardCover';
import styles from './index.module.scss';

interface IIntroCardProps {
  category?: string;
  coverUrl: string;
  roundCover?: boolean;
  title?: string;
  description?: string;
  editable?: boolean;
  prominentColor?: string;
  onEditClicked?: () => void;
}

export const IntroCard: FC<IIntroCardProps> = ({
  title,
  description = '',
  category = '',
  coverUrl,
  roundCover = false,
  children,
  editable = false,
  onEditClicked = () => {},
  prominentColor
}) => {

  const dispatch = useDispatch();

  const onClicked = () => {
    if (editable) {
      onEditClicked();
    }
  };

  const setDominentColorCallback = useCallback((element: HTMLImageElement) => {
    getPaletteFromImage(element)
      .then((palatte) => {
        const color = palatte ? palatte.Vibrant?.hex : palatte;
        dispatch(uiAction.setDominantColor(color));
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ dispatch, coverUrl ]);

  return (
    <div className={styles.container} style={prominentColor ? {backgroundColor: prominentColor} : {}}>
      <CardCover
        ref={setDominentColorCallback}
        coverUrl={coverUrl}
        roundBorder={roundCover}
        onClick={onClicked}
        editable={editable}
      />
      <div className={styles.info}>
        <p>{ category }</p>
        <h2 onClick={onClicked}>
        { title }
        </h2>
        <div className={styles.descriptionText}>
          <p>
          { description }
          </p>
        </div>
        <div className={styles.stats}>
        {
          children
        }
        </div>
      </div>
    </div>
  );
}; 

export * from './DotSeperator';
export * from './CardCover';