import { FC } from 'react';
import { Playlist, Typography } from '../../../components';
import styles from './index.module.scss';

interface IUploadProps {
  items: API.AudioItem[];
}

export const Upload: FC<IUploadProps> = ({
  items
}) => {

  return (
    <div className={styles.section}>
      <div className={styles.about}>
        <Typography variant="h3" className={styles.title}>Tải lên</Typography>
        <Typography variant="p2">
          Chỉ hiển thị với bạn
        </Typography>
      </div>
      <Playlist data={items} />
    </div>
  );
};