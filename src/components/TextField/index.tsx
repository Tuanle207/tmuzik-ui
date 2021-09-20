import React, { FC, forwardRef } from 'react';
import { IInputError } from '../../utils/interfaces';
import styles from './index.module.scss';


interface ITextFieldProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  value?: string;
  type?: 'text' | 'password';
  onValueChange?: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  variant?: any;
  label?: string;
  validate?: IInputError[];
  required?: boolean;
  className?: string;
  placeholder?: string;
  autoComplete?: string;
}

interface ITextAreaProps extends Omit<ITextFieldProps, 'onBlur'> {
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  lineCount?: number;
  inputClass?: string;
}

export const TextField = forwardRef<HTMLInputElement, ITextFieldProps>(({
  id, 
  variant,
  label, 
  placeholder = '',
  value,
  validate = [],
  required, 
  type = 'text', 
  onValueChange = () => {},
  onChange = () => {},
  onBlur,
  onClick,
  className,
  autoComplete = 'off',
  ...rest
}, ref) => {

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value);
    onChange(e);
  };

  const error = validate.find((err) => err.when);

  return (
    <div className={[styles.container, className || ''].join(' ')}>
      <div className={styles.inputWrapper}>
        <input
          ref={ref}
          className={[styles.input, type === 'password' ? styles.password : ''].join(' ')} 
          id={id} 
          value={value} 
          onChange={handleOnChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onBlur={onBlur}
          onClick={onClick}
          {...rest}
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
      <div className={styles.error}>
      {
        error &&
        <span className={styles.error}>{error.message}</span>
      }
      </div>
    </div>
  );
});



export const TextArea: FC<ITextAreaProps> = ({
  id, 
  variant,
  label, 
  placeholder = '',
  value,
  validate = [],
  required, 
  type = 'text', 
  inputClass = '',
  onValueChange = () => {},
  onBlur = () => {},
  className,
  autoComplete = 'off',
  lineCount = 3
}) => {

  const error = validate.find((err) => err.when);

  return (
    <div className={[styles.container, className || ''].join(' ')}>
      <div className={styles.inputWrapper}>
        <textarea
          className={[styles.input, inputClass && ''].join(' ')}
          id={id} 
          value={value} 
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          rows={lineCount}
          onBlur={(e) => onBlur(e)}
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
      <div className={styles.error}>
      {
        error &&
        <span className={styles.error}>{error.message}</span>
      }
      </div>
    </div>
  );
};