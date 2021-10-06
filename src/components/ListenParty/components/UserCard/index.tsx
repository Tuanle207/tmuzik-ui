import { FC } from 'react';
import { Link } from '../../..';
import { Icon } from '../../../../assets';
import styles from './index.module.scss';

interface IUserCardProps {
  name: string;
  avatar?: string;
  note?: string;
}

export const UserCard: FC<IUserCardProps> = ({
  name,
  avatar,
  note
}) => {

  return (
    <div className={styles.container}>
      {
        avatar ? (
          <img className={styles.photo} src={avatar} alt={name} />
        ) : (
          <div className={styles.photo}>
            <Icon.Avatar />
          </div>
        )
      }
      <div className={styles.text}>
        <Link target="_blank">
          <span className={styles.name}>{ name }</span>
        </Link>
        
        {
          note && (
          <p className={styles.note}>{ note }</p>
          )
        }
      </div>
    </div>
  );
};