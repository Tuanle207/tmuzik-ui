import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ViewWrapper } from '../../components';
import { IUserProfileViewParams } from '../../routings';
import styles from './index.module.scss';
import UserContentBox from './UserContentBox';
import UserInfoBox from './UserInfoBox';

interface IUserProfileView {
  
}

export const UserProfileView: FC<IUserProfileView> = () => {

  const { userId } = useParams<IUserProfileViewParams>();

  return (
    <ViewWrapper>
      <UserInfoBox />
      <UserContentBox />
    </ViewWrapper>

  );
};