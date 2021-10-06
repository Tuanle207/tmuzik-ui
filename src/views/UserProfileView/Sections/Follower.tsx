import { FC } from 'react';
import { CardList, Typography } from '../../../components';
import styles from './index.module.scss';

interface IFollowerProps {
  items: API.SimpleUserProfile[];
}

export const Follower: FC<IFollowerProps> = ({
  items
}) => {

  return (
    <div className={styles.section}>
      <div className={styles.about}>
        <Typography variant="h3" className={styles.title}>
          Người theo dõi
        </Typography>
      </div>
      <CardList
        data={items.map((el) => ({
          id: el.id,
          title: el.name,
          cover: el.avatar
        }))} 
      />
    </div>
  );
};