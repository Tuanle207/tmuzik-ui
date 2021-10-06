import { FC, ReactNode } from 'react';
import styles from './index.module.scss';

export type CheckboxValue = string | number; 

export interface CheckboxOptions {
  value: CheckboxValue;
  label?: string;
  component?: ReactNode;
}

interface ICheckboxProps {
  value: CheckboxValue;
  selectedValues?: CheckboxValue[]; 
  label?: string;
  component?: ReactNode;
  onChange?: (checked: boolean, value: CheckboxValue) => void;
  className?: string; 
}

export const Checkbox: FC<ICheckboxProps> = ({
  value,
  label,
  selectedValues = [],
  component,
  onChange = () => {},
  className = ''
}) => {

  return (
    <div className={[ styles.container, className ].join(' ')}>
      <input
        className={styles.input} 
        id={`checkbox-${value}`} 
        hidden 
        type="checkbox"
        checked={selectedValues.includes(value)}
        onChange={(e) => onChange(e.target.checked, value)}
      />
      <label
        className={[styles.label, component ? styles.labelWithComponent : ''].join(' ')} 
        htmlFor={`checkbox-${value}`}
      >
        { 
          component
        }
        <div className={styles.checkbox} />
        { !component && (label || '') }
      </label>
    </div>
  );
};