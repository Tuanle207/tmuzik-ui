import { FC } from 'react';
import { Icon } from '../../../assets';
import styles from './index.module.scss';

interface ISquareCardProps {
  cover?: string;
  title: string;
  subTitle?: string;
}

export const SquareCard: FC<ISquareCardProps> = ({
  cover = 'https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340',
  title,
  subTitle
}) => {

  return (
    <div className={styles.container}>
      {
        cover ? (
          <img
            className={styles.cover}
            alt={ title } 
            src={ cover } 
          />
        ) :(
          <Icon.Avatar className={styles.cover} />
        )
      }
      <div className={styles.content}>
        <p className={styles.title}>
          { title }
        </p>
        <p className={styles.description}>
          { subTitle || '' }
        </p>
      </div>
    </div>
  );
};