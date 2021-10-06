import { FC } from 'react';
import { CardList, Typography } from '../../../components';
import styles from './index.module.scss';

interface IPublicPlaylistProps {
  items: API.SimplePlaylist[];
}

export const PublicPlaylist: FC<IPublicPlaylistProps> = ({
  items
}) => {

  return (
    <div className={styles.section}>
      <div className={styles.about}>
        <Typography variant="h3" className={styles.title}>
          Playlist công khai
        </Typography>
      </div>
      <CardList 
        data={items.map((el) => ({
          id: el.id,
          cover: el.cover,
          title: el.name
        }))}
      />
    </div>
  );
};