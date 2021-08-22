import { FC } from 'react';
import styles from './index.module.scss';

interface IFooterProps {

}

export const Footer: FC<IFooterProps> = () => {

  return (
    <div className={styles.container}>
      footer
    </div>
  );
};