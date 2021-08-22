import { FC } from 'react';
import styles from './index.module.scss';

interface ISquareCardProps {
  cover?: string;
  title?: string;
  subTitle?: string;
}

export const SquareCard: FC<ISquareCardProps> = ({
  cover = 'https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340',
  title = 'An Idiom a day',
  subTitle = 'Native Tongue English Native Tongue English'
}) => {

  return (
    <div className={styles.container}>
      <img
        className={styles.cover}
        alt={ title } 
        src={ cover } 
      />
      <div className={styles.content}>
        <p className={styles.title}>
          { title }
        </p>
        <p className={styles.description}>
          { subTitle }
        </p>
      </div>
    </div>
  );
};