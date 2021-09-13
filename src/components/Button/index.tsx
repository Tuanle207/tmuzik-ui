import { FC } from 'react';
import { Icon } from '../../assets';
import styles from './index.module.scss';

interface IButtonProps {
  loading?: boolean;
  loadingText?: string;
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
  loading = false,
  loadingText = 'Đang xử lí',
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

  const onClicked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!loading) {
      console.log({loading});
      onClick(e);
    }
  };

  const renderIcon = loading 
    ? <Icon.SpinningLoader className={styles.loader} />
    : icon ? icon : null;
  const renderTitle = loading ? loadingText : title;

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
      onClick={onClicked}
    >
      { iconPosition === "left" ? renderIcon : null }
      <span className={icon ? '' : styles.alignMiddle}>{ renderTitle }</span>
      { iconPosition === "right" ? renderIcon : null  }
    </button>
  );
}