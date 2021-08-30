import { FC, useState } from 'react';
import { RadioButton } from '../RadioButton';
import styles from './index.module.scss';

interface IRadioGroupProps {
  name: string;
  direction?: 'row' | 'column';
  options?: {
    value: string; 
    label: string;
  }[];
  selectedValue?: string;
  onValueChange?: (value: string) => void;
}

export const RadioGroup: FC<IRadioGroupProps> = ({
  direction = 'row',
  name,
  onValueChange = () => {},
  options = [],
  selectedValue,
  children
}) => {

  const [ value, setValue ] = useState(selectedValue || (options.length > 0 && options[0].value) || '');

  const onChange = (value: string) => {
    setValue(value);
    onValueChange(value);
  };

  return (
    <div className={[styles.container, direction === 'column' ? styles.vertical : ''].join(' ')}>
      {
        options.map((option) => (
          <RadioButton
            id={option.value} 
            key={option.value}
            name={name}
            label={option.label}
            value={option.value}
            onValueChange={onChange}
            selected={value}
          />
        ))
      }
      {
        children
      }
    </div>
  );
};