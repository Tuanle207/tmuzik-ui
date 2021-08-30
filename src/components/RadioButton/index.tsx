import { FC } from 'react';
import styles from './index.module.scss';

interface IRadioButtonProps { 
  id: string;
  label: string;
  value: string;
  selected: string;
  name: string;
  onValueChange?: (value: string) => void;
}

export const RadioButton: FC<IRadioButtonProps> = ({
  id,
  label,
  value,
  name,
  selected,
  onValueChange = () => { }
}) => {


  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        hidden
        type="radio" 
        id={id} 
        name={name} 
        checked={value === selected}
        onChange={(e) => onValueChange(value)} 
      />
      <label htmlFor={id} className={styles.label}>
        <div className={styles.selectButton}/>
        <span>
          { label }
        </span>
      </label>
    </div>
  );
};