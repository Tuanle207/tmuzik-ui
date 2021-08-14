import { DetailedHTMLProps, FC, InputHTMLAttributes, useMemo, useState } from 'react';
import { Util } from '../../../utils/interfaces';
import styles from './index.module.scss';


interface ITextFieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  // id: string;
  value?: string;
  type?: 'text' | 'password';
  onValueChange?: (value: string) => void;
  variant?: any;
  label?: string;
  multipleLine?: boolean;
  lineCount?: number;
  validate?: Util.IInputError[]; 
}

export const TextField: FC<ITextFieldProps> = ({
  id, 
  variant,
  label, 
  placeholder,
  value,
  validate = [],
  required, 
  type = 'text', 
  onValueChange = () => {},
  ...args
}) => {

  const error = validate.find((err) => err.when);

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input} 
          id={id} 
          value={value} 
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          type={type}
          {...args}
        />
        { label && 
          <label 
            className={styles.label} 
            htmlFor={id}>
              { label }
              {required ? <span>{' *'}</span> : ''}
          </label>
        }
      </div>
      {
        error ? 
        <span className={styles.error}>{error.message}</span> :
        <span className={styles.noError}>no error</span>
      }
    </div>
  );
};