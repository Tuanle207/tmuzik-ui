import { FC } from 'react';
import styles from './index.module.scss';

interface IButtonProps {
  icon?: JSX.Element;
  title: string;
  variant?: 'contained' | 'text' | 'outlined' | 'round';
  iconPosition?: 'left' | 'right';
  size?: 'small' | 'medium';
  className?: string;
  type?: 'button' | 'submit';
  form?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: FC<IButtonProps> = ({
  icon,
  iconPosition = 'left',
  title,
  variant = 'contained',
  className,
  size = 'medium',
  type = 'button',
  form,
  onClick = () => {}
}) => {

  return (
    <button 
      className={[
        styles.button, 
        variant === 'text' ? styles.buttonText :
        variant === 'outlined' ? styles.buttonOutlined : '',
        variant === 'round' ? styles.buttonRound : '',
        size === 'medium' ? styles.buttonMedium : '',
        className || ''
      ].join(' ')}
      form={form}
      type={type}
      onClick={onClick}
    >
      { iconPosition === "left" ? icon : null }
      <span className={icon ? '' : styles.alignMiddle}>{ title }</span>
      { iconPosition === "right" ? icon : null  }
    </button>
  );
}