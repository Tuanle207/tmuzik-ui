import { FC } from 'react';
import styles from './index.module.scss';

interface IRectangleCardProps {
  cover?: string;
  title?: string;
}

export const RectangleCard: FC<IRectangleCardProps> = ({
  cover = 'https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340',
  title = 'Playlist'
}) => {

  return (
    <div className={styles.container}>
      <img
        className={styles.cover}
        alt={ title } 
        src={ cover }
      />
      <p className={styles.title}>
        { title }
      </p>
    </div>
  );
};