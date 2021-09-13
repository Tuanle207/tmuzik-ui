import { FC } from 'react';
import { Icon } from '../../../assets';
import { Button, Link } from '../../../components';
import { paths } from '../../../routings';
import styles from './index.module.scss';

interface IUploadSuccessProps {
  onContinue?: () => void;
}

const UploadSuccess: FC<IUploadSuccessProps> = ({
  onContinue = () => {}
}) => {

  return (
    <div className={styles.container}>
      <p className={styles.inform}>Tải lên thành công!</p>
      <Icon.CheckmarkRound className={styles.icon} />
      <p className={styles.note}>Bạn có thể đi đến <Link to={paths.UploadedList}>danh sách tải lên</Link> để kiểm tra bản ghi audio của bạn.</p>
      <Button 
        className={styles.continue}
        variant="text"
        title="Tiếp tục tải lên"
        onClick={onContinue}
      />
    </div>
  );
};

export default UploadSuccess;