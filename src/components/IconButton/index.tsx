import { FC } from 'react';
import styles from './index.module.scss';

interface IIConButtonProps {
  onClick?: () => void;
  className?: string;
}

export const IconButton: FC<IIConButtonProps> = ({
  children,
  onClick = () => {},
  className = ''
}) => {
  


  return (
    <button onClick={onClick} type="button" className={[styles.container, className].join(' ')}>
      {
        children
      }
    </button>
  )
};