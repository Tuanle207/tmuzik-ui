import { FC } from 'react';
import { Icon } from '../../assets';
import styles from './index.module.scss';

interface ISpinLoaderProps {
  loading?: boolean;
  text?: string;
}

export const SpinLoader: FC<ISpinLoaderProps> = ({
  loading = true,
  text
}) => {

  return loading ? (
    <div className={styles.container}>
      <Icon.SpinningLoader />
      {
        text && <p>{ text }</p>
      }
    </div>
  ) : null;
};