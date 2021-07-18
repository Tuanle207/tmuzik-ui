import React from 'react';
import './index.scss';

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

  const rangedInputRef = React.useRef<any>();

  return (
    <div className="slider-input">
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
      <div className="slider-input__face-mask"></div>
    </div>
  );
};