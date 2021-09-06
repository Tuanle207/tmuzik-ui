import { FC } from 'react';
import styles from './index.module.scss';

interface ILinearEffectBackgroundProps {
  color?: string;
}

export const LinearEffectBackground: FC<ILinearEffectBackgroundProps> = ({
  color
}) => {

  return color && color.trim() !== ''
    ? <div className={styles.root} style={{ backgroundColor: color }}></div>
    : null;
};