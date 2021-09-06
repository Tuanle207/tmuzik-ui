import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { DotSeperator, LinearEffectBackground, Link, ViewWrapper } from '../../components';
import { IntroCard } from '../../components';
import { IUserProfileViewParams } from '../../routings';
import UserContentBox from './UserContentBox';
import styles from './index.module.scss';

interface IUserProfileView {
  
}

export const UserProfileView: FC<IUserProfileView> = () => {

  const { userId } = useParams<IUserProfileViewParams>();

  const [ predominentColor, setPredominentColor ] = useState<string | undefined>();

  useEffect(() => {
    console.log({userId});
  }, [userId]);

  return (
    <ViewWrapper>
      <IntroCard 
        title={'Lê Anh Tuấn'} 
        coverUrl={"https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340"}
        roundCover
        category="Hồ sơ"
      >
        <p>
          1 Playlist công khai
        </p>
        <DotSeperator />
        <Link>
          1 người theo dõi
        </Link>
        <DotSeperator />
        <Link>
          13 đang theo dõi
        </Link>
      </IntroCard>
      <div className={styles.content}>
        <LinearEffectBackground color={predominentColor} />
        <UserContentBox />
      </div>
    </ViewWrapper>

  );
};