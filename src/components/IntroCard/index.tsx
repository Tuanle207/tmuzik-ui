import { FC } from 'react';
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

  const onClicked = () => {
    if (editable) {
      onEditClicked();
    }
  };

  return (
    <div className={styles.container} style={prominentColor ? {backgroundColor: prominentColor} : {}}>
      <CardCover
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
        <p className={styles.descriptionText}>
        { description }
        </p>
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