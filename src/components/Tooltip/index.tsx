import { FC } from 'react';
import styles from './index.module.scss';

interface ITooltipProps {
  className?: string;
  text?: string;
  position?: 'left' | 'right' | 'bottom' | 'top'
}

export const Tooltip: FC<ITooltipProps> = ({
  children,
  className,
  text = 'alo this is a tooltip text',
  position = 'right'
}) => {

  return (
    <div className={[styles.container, className ?? ''].join('')}>
    {
      children
    }
    {
      position === 'top' && (
        <span className={[styles.tooltipText, styles.tooltipTextTop].join(' ')}>{ text }</span>
      )
    }
    {
      position === 'right' && (
        <span className={[styles.tooltipText, styles.tooltipTextRight].join(' ')}>{ text }</span>
      )
    }
    {
      position === 'bottom' && (
        <span className={[styles.tooltipText].join(' ')}>{ text }</span>
      )
    }
    {
      position === 'left' && (
        <span className={[styles.tooltipText, styles.tooltipTextLeft].join(' ')}>{ text }</span>
      )
    }
    
    </div>
  );
};