import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { taskStateAction, uiAction } from '../../store/actions';
import { getPaletteFromImage } from '../../utils/getPaletteFromImage';
import { CardCover } from './CardCover';
import styles from './index.module.scss';

interface IIntroCardProps {
  category?: string;
  coverUrl?: string;
  secondaryCoverUrl?: string;
  roundCover?: boolean;
  title?: string;
  description?: string;
  editable?: boolean;
  prominentColor?: string;
  onEditClicked?: () => void;
  defaultIcon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

export const IntroCard: FC<IIntroCardProps> = ({
  title,
  description = '',
  category = '',
  coverUrl,
  secondaryCoverUrl,
  roundCover = false,
  children,
  editable = false,
  onEditClicked = () => {},
  prominentColor,
  defaultIcon
}) => {

  const dispatch = useDispatch();

  const onClicked = () => {
    if (editable) {
      onEditClicked();
    }
  };

  const setDominentColorCallback = useCallback((element: HTMLImageElement) => {
    dispatch(taskStateAction.getDominantColor({state: 'processing'}));
    getPaletteFromImage(element)
      .then((palatte) => {
        const color = palatte ? palatte.Vibrant?.hex : palatte;
        dispatch(uiAction.setDominantColor(color));
        dispatch(taskStateAction.getDominantColor({state: 'success'}));
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ dispatch, coverUrl ]);

  const bgStyle = prominentColor ? {
    backgroundColor: prominentColor
  } : {};

  return (
    <div className={styles.container} style={bgStyle}>
      {
        secondaryCoverUrl && (
          <img
            alt="secondary-cover"
            src={secondaryCoverUrl}
            className={styles.background}
          />
        )
      }
      <CardCover
        ref={setDominentColorCallback}
        coverUrl={coverUrl}
        roundBorder={roundCover}
        onClick={onClicked}
        editable={editable}
        defaultIcon={defaultIcon}
      />
      <div className={styles.info}>
        <p>{ category }</p>
        <h2 onClick={onClicked}>
        { title }
        </h2>
        <div className={styles.descriptionText}>
        { description?.split('\n').map((text, index) => <p key={index}>{ text }</p>) }
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