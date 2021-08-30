import { forwardRef } from 'react';
import styles from './index.module.scss';

interface IIConButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  className?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IIConButtonProps>((props, ref) => {
  const {
    children,
    onClick = () => {},
    className = ''
  } = props;

  return (
    <button ref={ref} onClick={onClick} type="button" className={[styles.container, className].join(' ')}>
      {
        children
      }
    </button>
  )
});