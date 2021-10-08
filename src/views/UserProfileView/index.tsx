import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { DotSeperator, LinearEffectBackground, Link, Modal, ViewWrapper } from '../../components';
import { IntroCard } from '../../components';
import { IUserProfileViewParams } from '../../routings';
import { authSelector, uiSelector } from '../../store/selectors';
import { Follower, Following, PublicPlaylist, RecentPlay, Upload } from './Sections';
import { authApiService } from '../../api/services';
import { toast } from 'react-toastify';
import { taskStateAction } from '../../store/actions';
import { taskStateSelectorCreator } from '../../utils/selectorCreators';
import styles from './index.module.scss';
import { Icon } from '../../assets';
import { UpdateInfoModalContent } from './UpdateInfoModalContent';

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
  const [ showEditModal, setShowEditModal ] = useState(false);

  
  const dispatch = useDispatch();
  const dominentColor = useSelector(uiSelector.dominantColor);
  const getUserProfileState = useSelector(
    taskStateSelectorCreator(taskStateAction.getUserProfile.toString()));
  const userProfile = useSelector(authSelector.userProfile);

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
          document.title = `Tmuzik - ${data.userInfo.fullName}`;
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
        roundCover
        coverUrl={userInfo?.avatar}
        secondaryCoverUrl={userInfo?.cover}
        prominentColor={dominentColor}
        category="Hồ sơ"
        defaultIcon={Icon.Avatar}
        editable={userProfile?.id === userId}
        onEditClicked={() => setShowEditModal(true)}
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
      <Modal
        className={styles.modal}
        isOpen={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
        title="Chi tiết hồ sơ"
      >
        <UpdateInfoModalContent
          cover={userProfile?.cover}
          fullName={userProfile?.fullName}
        />
      </Modal>
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