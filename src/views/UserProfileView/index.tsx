import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { DotSeperator, LinearEffectBackground, Link, ViewWrapper } from '../../components';
import { IntroCard } from '../../components';
import { IUserProfileViewParams } from '../../routings';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import { uiSelector } from '../../store/selectors';
import { Follower, Following, PublicPlaylist, RecentPlay, Upload } from './Sections';

interface IUserProfileView {
  
}

export const UserProfileView: FC<IUserProfileView> = () => {

  const { userId } = useParams<IUserProfileViewParams>();

  const dominentColor = useSelector(uiSelector.dominantColor);

  useEffect(() => {
    console.log({userId});
  }, [userId]);

  return (
    <ViewWrapper title="Hồ sơ">
      <IntroCard 
        title={'Lê Anh Tuấn'} 
        coverUrl={"https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340"}
        roundCover
        prominentColor={dominentColor}
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
        <LinearEffectBackground color={dominentColor} />
        <RecentPlay />
        <Upload />
        <PublicPlaylist />
        <Follower />
        <Following />
      </div>
    </ViewWrapper>

  );
};