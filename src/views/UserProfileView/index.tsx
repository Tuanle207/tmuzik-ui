import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MainView } from '../../components';
import { IUserProfileViewParams } from '../../routings';
import styles from './index.module.scss';
import UserContentBox from './UserContentBox';
import UserInfoBox from './UserInfoBox';

interface IUserProfileView {
  
}

export const UserProfileView: FC<IUserProfileView> = () => {

  const { userId } = useParams<IUserProfileViewParams>();

  return (
    <MainView>
     <div className={styles.container}>
        <UserInfoBox />
        <UserContentBox />
     </div>
    </MainView>
  );
};