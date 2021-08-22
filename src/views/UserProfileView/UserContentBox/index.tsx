import { FC } from 'react';
import { CardList, Playlist } from '../../../components';
import styles from './index.module.scss';

interface IUserContentBoxProps { }

const UserContentBox: FC<IUserContentBoxProps> = () => {

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.about}>
          <h3 className={styles.title}>Nghe gần đây</h3>
          <p className={styles.noteText}>Chỉ hiển thị với bạn</p>
        </div>
        <Playlist />
      </div>
      <div className={styles.section}>
        <div className={styles.about}>
          <h3 className={styles.title}>Tải lên</h3>
          <p className={styles.noteText}>Chỉ hiển thị với bạn</p>
        </div>
        <Playlist />
      </div>
      <div className={styles.section}>
        <div className={styles.about}>
          <h3 className={styles.title}>Playlist công khai</h3>
        </div>
        <CardList />
      </div>
      <div className={styles.section}>
        <div className={styles.about}>
          <h3 className={styles.title}>Người theo dõi</h3>
        </div>
        <CardList />
      </div>
      <div className={styles.section}>
        <div className={styles.about}>
          <h3 className={styles.title}>Đang theo dõi</h3>
        </div>
        <CardList />
      </div>
    </div>
  );
};

export default UserContentBox;