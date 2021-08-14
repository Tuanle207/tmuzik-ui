import { FC, MouseEventHandler } from 'react';
import styles from './index.module.scss';

interface IButtonProps {
  icon?: JSX.Element;
  title: string;
  variant?: 'contained' | 'text' | 'outlined';
  iconPosition?: 'left' | 'right';
  size?: 'small' | 'medium';
  className?: string;
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<IButtonProps> = ({
  icon,
  iconPosition = 'left',
  title,
  variant = 'contained',
  className,
  size = 'medium',
  type = 'button',
  onClick = () => {}
}) => {

  return (
    <button 
      className={[
        styles.button, 
        variant === 'text' ? styles.buttonText :
        variant === 'outlined' ? styles.buttonOutlined : '',
        size === 'medium' ? styles.buttonMedium : '',
        className ? className : ''
      ].join(' ')}
      type={type}
      onClick={onClick}
    >
      { iconPosition === "left" ? icon : null }
      <span className={icon ? '' : styles.alignMiddle}>{ title }</span>
      { iconPosition === "right" ? icon : null  }
    </button>
  );
}