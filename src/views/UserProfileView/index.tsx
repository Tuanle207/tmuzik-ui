import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { DotSeperator, LinearEffectBackground, Link, ViewWrapper } from '../../components';
import { IntroCard } from '../../components';
import { IUserProfileViewParams } from '../../routings';
import { uiSelector } from '../../store/selectors';
import { Follower, Following, PublicPlaylist, RecentPlay, Upload } from './Sections';
import { authApiService } from '../../api/services';
import { toast } from 'react-toastify';
import { taskStateAction } from '../../store/actions';
import { taskStateSelectorCreator } from '../../utils/selectorCreators';
import styles from './index.module.scss';

interface IUserProfileView {
  
}

export const UserProfileView: FC<IUserProfileView> = () => {

  const { userId } = useParams<IUserProfileViewParams>();

  const [ userInfo, setUserInfo ] = useState<API.UserInfo>();
  const [ playlists, setPlaylists ] = useState<API.SimplePlaylist[]>([]); 
  const [ followers, setFollowers ] = useState<API.SimpleUserProfile[]>([]); 
  const [ followings, setFollowings ] = useState<API.SimpleUserProfile[]>([]);
  const [ uploads, setUploads ] = useState<API.AudioItem[]>();
  const [ recentPlays, setRecentPlays ] = useState<API.AudioItem[]>();
  
  const dispatch = useDispatch();
  const dominentColor = useSelector(uiSelector.dominantColor);
  const getUserProfileState = useSelector(
    taskStateSelectorCreator(taskStateAction.getUserProfile.toString()));

  useEffect(() => {
    if (userId) {
      dispatch(taskStateAction.getUserProfile({state: 'processing'}));
      authApiService.getUserProfileAsync(userId)
        .then((data) => {
          setUserInfo(data.userInfo);
          setPlaylists(data.playlists);
          setFollowers(data.followers);
          setFollowings(data.followings);
          setUploads(data.uploads);
          setRecentPlays(data.recentPlays);
        })
        .catch((err: any) => {
          const message = err.message;
          toast.error(message);
        })
        .finally(() => {
          dispatch(taskStateAction.getUserProfile({state: 'idle'}));
        });
    }
  }, [userId, dispatch]);

  return (
    <ViewWrapper title="Hồ sơ" contentReady={getUserProfileState.state !== 'processing'}>
      <IntroCard 
        title={userInfo?.fullName || ''} 
        coverUrl={userInfo?.avatar}
        roundCover
        prominentColor={dominentColor}
        category="Hồ sơ"
      >
        <p>
          {playlists.length} Playlist công khai
        </p>
        <DotSeperator />
        <Link>
          {followers.length} người theo dõi
        </Link>
        <DotSeperator />
        <Link>
          {followings.length} đang theo dõi
        </Link>
      </IntroCard>
      <div className={styles.content}>
        <LinearEffectBackground color={dominentColor} />
        <RecentPlay />
        {
          uploads && (
            <Upload items={uploads} />
          )
        }
        <PublicPlaylist items={playlists} />
        <Follower items={followers} />
        <Following items={followings} />
      </div>
    </ViewWrapper>

  );
};