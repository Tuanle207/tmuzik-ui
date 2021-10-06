import { FC } from 'react';
import { CardList, Typography } from '../../../components';
import styles from './index.module.scss';

interface IFollowingProps {
  items: API.SimpleUserProfile[];
}

export const Following: FC<IFollowingProps> = ({
  items
}) => {

  return (
    <div className={styles.section}>
      <div className={styles.about}>
        <Typography variant="h3" className={styles.title}>
          Đang theo dõi
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