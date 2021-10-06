import { FC, useState } from 'react';
import { Checkbox, CheckboxOptions, CheckboxValue } from '..';
import { UserCard } from '../ListenParty/components';
import styles from './index.module.scss';

export interface ICheckboxItemParams {
  checked: boolean;
  value: CheckboxValue;
  selectedValues: Array<CheckboxValue>;
}

interface ICheckGroupProps {
  direction?: 'row' | 'column';
  options?: Array<CheckboxOptions>;
  selectedValues?: Array<CheckboxValue>;
  onValueChange?: (params: ICheckboxItemParams) => void;
  className?: string
}

export const CheckGroup: FC<ICheckGroupProps> = ({
  options = [
    {
      value: 1,
      label: 'label 1'
    },
    {
      value: 2,
      label: 'label 2'
    },
    {
      value: 3,
      label: 'label 3'
    },
    {
      value: 4,
      label: 'label 4'
    },
    {
      value: 5,
      label: 'label 5'
    },
    {
      value: 6,
      label: 'label 5'
    },
    {
      value: 7,
      label: 'label 5'
    },
    {
      value: 8,
      label: 'label 5'
    },
    {
      value: 9,
      label: 'label 5'
    }
  ],
  selectedValues = [],
  onValueChange = () => {},
  className = ''
}) => {

  const [ items, setItems ] = useState<Array<CheckboxValue>>(selectedValues);

  const handleItemChange = (checked: boolean, value: CheckboxValue )  => {
    const newSelection = [...items];
    if (checked) {
      newSelection.push(value);
    } else {
      const index = newSelection.findIndex((x) => x === value);
      if (index !== -1) {
        newSelection.splice(index, 1);
      }
    }
    setItems(newSelection);
    onValueChange({
      checked,
      value,
      selectedValues: [...newSelection]
    });
  }

  return (
    <div className={className}>
      {
        options.map((el, index) => (
          <Checkbox
            className={styles.items}
            key={index}
            value={el.value}
            label={el.label}
            component={(
              <UserCard name="Le Anh Tuan" />
            )}
            selectedValues={items}
            onChange={handleItemChange}
          />
        ))
      }
    </div>
  );
};