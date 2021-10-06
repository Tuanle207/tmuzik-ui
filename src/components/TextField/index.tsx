import React, { FC, forwardRef, MutableRefObject, 
  useCallback , useState } from 'react';
import { Icon } from '../../assets';
import { IInputError } from '../../utils/interfaces';
import { IconButton } from '../IconButton';
import styles from './index.module.scss';


interface ITextFieldProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  value?: string;
  type?: 'text' | 'password';
  onValueChange?: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  variant?: 'normal' | 'search-bar';
  mode?: 'light' | 'dark';
  label?: string;
  validate?: IInputError[];
  required?: boolean;
  className?: string;
  placeholder?: string;
  autoComplete?: string;
  clearButton?: boolean;
}

interface ITextAreaProps extends Omit<ITextFieldProps, 'onBlur'> {
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  lineCount?: number;
  inputClass?: string;
}

export const TextField = forwardRef<HTMLInputElement, ITextFieldProps>(({
  id, 
  variant = 'normal',
  mode = 'light',
  clearButton = true,
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

  const [ inputEl, setInputEl ] = useState<HTMLInputElement>();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value);
    onChange(e);
  };

  const onClearClicked = () => {
    if (inputEl) {
      inputEl.value = '';
      inputEl.focus();
    }
  };

  const inputRefCallback = useCallback((node: HTMLInputElement) => {
    setInputEl(node);
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as MutableRefObject<HTMLInputElement>).current = node;
    }
  }, [ref]);

  const error = validate.find((err) => err.when);

  return (
    <div className={[ styles.container, className || '' ].join(' ')}
    >
      <div className={[
        styles.inputWrapper,
        variant === 'search-bar' ? styles.searchBar : '',
        mode === 'light' ? styles.inputWrapperLight : ''
        ].join(' ')}
      >
        <input
          ref={inputRefCallback}
          className={[
            styles.input, 
            type === 'password' ? styles.password : '',
            mode === 'light' ? styles.inputLight : ''
          ].join(' ')} 
          id={id} 
          value={value} 
          onChange={handleOnChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onBlur={onBlur}
          onClick={onClick}
          {...rest}
        />
        {
          variant === 'search-bar' && (
            <Icon.Search className={styles.searchIcon} />
          )
        }
        {
          value && value?.length > 0 && clearButton ? (
            <IconButton className={styles.clearButton} onClick={onClearClicked}>
              <Icon.Close className={styles.clearIcon} />
            </IconButton>
          ) : null
        }
        { variant === 'normal' && label && 
          <label 
            className={[
              styles.label,
              mode === 'light' ? styles.label : ''
            ].join(' ')}
            htmlFor={id}>
              { label }
              {required ? <span>{' *'}</span> : ''}
          </label>
        }
      </div>
      {
        variant === 'normal' && (
          <div className={styles.error}>
          {
            error && <span className={styles.error}>{error.message}</span>
          }
          </div>
        )
      }
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