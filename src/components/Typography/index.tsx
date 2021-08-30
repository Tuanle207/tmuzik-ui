import { FC } from 'react';
import styles from './index.module.scss';

interface ITypographyProps {
  children?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'p1' | 'p2',
  className?: string;
}

export const Typography: FC<ITypographyProps> = ({
  children = '',
  variant,
  className
}) => {
  switch (variant) {
    case 'h1': 
      return <h1 className={[styles.heading1, className ?? ''].join(' ')}>{ children }</h1>;
    case 'h2':
      return <h2 className={[styles.heading2, className ?? ''].join(' ')}>{ children }</h2>
    case 'h3':
      return <h3 className={[styles.heading3, className ?? ''].join(' ')}>{ children }</h3>
    case 'p1':
      return <p className={[styles.paragraph1, className ?? ''].join(' ')}>{ children }</p>;
    case 'p2':
      return <p className={[styles.paragraph2, className ?? ''].join(' ')}>{ children }</p>;
    default:
      return <h3 className={[styles.heading3, className ?? ''].join(' ')}>{ children }</h3>
  }
};