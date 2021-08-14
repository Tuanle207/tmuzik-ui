import { useRef } from 'react';
import styles from './index.module.scss';

interface ISliderInputProps {
  value?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const SliderInput = ({ 
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  onValueChange = () => {}
}: ISliderInputProps) => {

  const rangedInputRef = useRef<any>();

  return (
    <div className={styles.container}>
      <input
        ref={rangedInputRef}
        type="range" 
        min={min}
        max={max}
        step={step} 
        value={value} 
        onChange={(e) => onValueChange(e.target.valueAsNumber)}
        style={{  }}
      >
      </input>
      <div style={{ width: `${value}%` }}></div>
      <div className={styles.faceMask}></div>
    </div>
  );
};