import { FC, useRef, useState } from 'react';
import { Icon } from '../../assets';
import { useHiddenOnBlurred } from '../../hooks';
import { IconButton } from '../IconButton';
import styles from './index.module.scss';

interface ISelectProps {
  id: string;
  value?: string;
  type?: 'text' | 'password';
  label?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  options?: ISelectOption[];
  selected?: string;
  onSelectedOptionChange?: (value: string) => void;
}

interface ISelectOption {
  label: string;
  value: string;
}

export const Select: FC<ISelectProps> = ({
  id, 
  label, 
  placeholder = '',
  value,
  required, 
  type = 'text', 
  className,
  options = [],
  selected,
  onSelectedOptionChange = () => {}
}) => {

  const selectRef = useRef(null);

  const [ dropdown, setDropdown ] = useState(false);
  const [ keyword, setKeyword ] = useState(
    options.find(x => x.value === selected) ?? options.length > 0 ? options[0].label : '');
  const [ selectedOption, setSelectedOption ] = useState<ISelectOption>(
    options.find(x => x.value === selected) ??
    options.length > 0 ? options[0] : {} as ISelectOption
  );

  useHiddenOnBlurred({
    display: dropdown,
    displaySetter: setDropdown,
    exceptSpaceNodes: [selectRef],
    callback: () => {
      setKeyword(selectedOption.label);
    }
  });

  const onTextChange = (value: string) => {
    if (!dropdown) {
      setDropdown(true);
    }
    setKeyword(value);
  };

  const onInputFocused = () => {
    setDropdown(true);
  };

  const onOptionSelect = (option: ISelectOption) => {
    onSelectedOptionChange(option.value);
    setSelectedOption(option);
    setKeyword(option.label);
    setDropdown(false);
  };

  const onDropdownButtonClicked = () => {
    setDropdown((prev) => !prev);
  };

  return (
    <div className={[styles.container, className || ''].join(' ')}>
      <div ref={selectRef} className={styles.inputWrapper} >
        <div className={styles.select}>
          <input
            className={styles.input} 
            id={id} 
            value={keyword} 
            onChange={(e) => onTextChange(e.target.value)}
            placeholder={placeholder}
            type={type}
            onFocus={onInputFocused}
            autoComplete="off"
          />
          <IconButton className={styles.dropDownBtn} onClick={onDropdownButtonClicked}>
            <Icon.CarretDown />
          </IconButton>
        </div>
        { label && 
          <label 
            className={styles.label} 
            htmlFor={id}>
              { label }
              {required ? <span>{' *'}</span> : ''}
          </label>
        }
        {
          dropdown && (
            <div className={styles.dropdownList}>
            {
              options.filter((x) => x.label.toLowerCase().includes(keyword.toLowerCase())).map((el) => (
                <p key={el.value} onClick={() => onOptionSelect(el)} className={styles.activeOption}>
                  { el.label }
                </p>
              ))
            }
            {
              options.filter((x) => x.label.toLowerCase().includes(keyword.toLowerCase())).length === 0 && (
                <span>Không có lựa chọn nào</span>
              )
            }
            </div>
          )
        }
      </div>
      {
        <span className={styles.noError}>no error</span>
      }
    </div>
  );
};