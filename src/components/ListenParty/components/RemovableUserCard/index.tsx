import { FC } from 'react';
import { Icon } from '../../../../assets';
import { IconButton } from '../../../IconButton';
import styles from './index.module.scss';

interface IRemovableUserCardProps {
  id: string;
  name: string;
  avatar?: string;
  onRemove?: (id: string) => void;
  className?: string;
}

export const RemovableUserCard: FC<IRemovableUserCardProps> = ({
  id,
  name,
  avatar,
  onRemove = () => {},
  className = ''
}) => {

  const displayName = name.length > 12 ? name.substr(0, 12) + '...' : name; 

  return (
    <div className={[styles.container, className].join(' ')} onClick={() => onRemove(id)}>
      <div className={styles.photoWrapper}>
        {
          avatar ? (
            <img className={styles.photo} src={avatar} alt={name} draggable={false}/>
          ) : (
            <Icon.Avatar className={styles.photo} />
          )
        }
        <IconButton className={styles.removeButton}>
          <Icon.Close />
        </IconButton>
      </div>
      <p className={styles.name}>
        { displayName }
      </p>
    </div>
  );
};