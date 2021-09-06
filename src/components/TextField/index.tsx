import { FC } from 'react';
import { IInputError } from '../../utils/interfaces';
import styles from './index.module.scss';


interface ITextFieldProps {
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
  autoComplete?: 'on' | 'off';
}

interface ITextAreaProps extends Omit<ITextFieldProps, 'onBlur'> {
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  lineCount?: number;
}

export const TextField: FC<ITextFieldProps> = ({
  id, 
  variant,
  label, 
  placeholder = '',
  value,
  validate = [],
  required, 
  type = 'text', 
  onValueChange = () => {},
  onBlur = () => {},
  className,
  autoComplete = 'off'
}) => {

  const error = validate.find((err) => err.when);

  return (
    <div className={[styles.container, className || ''].join(' ')}>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input} 
          id={id} 
          value={value} 
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={placeholder}
          type={type}
          autoComplete={autoComplete}
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
      {
        error ? 
        <span className={styles.error}>{error.message}</span> :
        <span className={styles.noError}>no error</span>
      }
    </div>
  );
};



export const TextArea: FC<ITextAreaProps> = ({
  id, 
  variant,
  label, 
  placeholder = '',
  value,
  validate = [],
  required, 
  type = 'text', 
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
          className={styles.input} 
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
      {
        error ? 
        <span className={styles.error}>{error.message}</span> :
        <span className={styles.noError}>no error</span>
      }
    </div>
  );
};