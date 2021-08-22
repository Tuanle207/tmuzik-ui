import { FC } from 'react';
import { Link } from '../../../components';
import styles from './index.module.scss';

interface IUserInfoBox {

}

const UserInfoBox: FC<IUserInfoBox> = () => {

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <img
          alt={"user avatar"} 
          src={"https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340"} 
        />
      </div>
      <div className={styles.userInfo}>
        <h2>{ "Lê Anh Tuấn" }</h2>
        <div className={styles.userStats}>
          <p>
            1 Playlist công khai
          </p>
          <div className={styles.dot} />
          <Link>
            1 người theo dõi
          </Link>
          <div className={styles.dot} />
          <Link>
            13 đang theo dõi
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserInfoBox;