import { FC } from 'react';
import styles from './index.module.scss';

interface IIConButtonProps {
  onClick?: () => void;
}

export const IconButton: FC<IIConButtonProps> = ({
  children,
  onClick = () => {}
}) => {
  


  return (
    <button onClick={onClick} type="button" className={styles.container}>
      {
        children
      }
    </button>
  )
};