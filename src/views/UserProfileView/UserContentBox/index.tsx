import { FC } from 'react';
import { CardList, Playlist, Typography } from '../../../components';
import styles from './index.module.scss';

interface IUserContentBoxProps { }

const UserContentBox: FC<IUserContentBoxProps> = () => {

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.about}>
          <Typography variant="h3" className={styles.title}>
            Nghe gần đây
          </Typography>
          <Typography variant="p2">
            Chỉ hiển thị với bạn
          </Typography>
        </div>
        <Playlist />
      </div>
      <div className={styles.section}>
        <div className={styles.about}>
          <Typography variant="h3" className={styles.title}>Tải lên</Typography>
          <Typography variant="p2">
            Chỉ hiển thị với bạn
          </Typography>
        </div>
        <Playlist />
      </div>
      <div className={styles.section}>
        <div className={styles.about}>
          <Typography variant="h3" className={styles.title}>
            Playlist công khai
          </Typography>
        </div>
        <CardList />
      </div>
      <div className={styles.section}>
        <div className={styles.about}>
          <Typography variant="h3" className={styles.title}>
            Người theo dõi
          </Typography>
        </div>
        <CardList />
      </div>
      <div className={styles.section}>
        <div className={styles.about}>
          <Typography variant="h3" className={styles.title}>
            Đang theo dõi
          </Typography>
        </div>
        <CardList />
      </div>
    </div>
  );
};

export default UserContentBox;