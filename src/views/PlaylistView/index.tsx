import moment from 'moment';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Icon } from '../../assets';
import { DotSeperator, IntroCard, LinearEffectBackground,
  Link, Playlist, PlaylistHeader, PlaylistItem, ViewWrapper } from '../../components';
import { IconButton } from '../../components/IconButton';
import { IPlaylistViewParams, routes } from '../../routings';
import { playlistAction, queueAction, taskStateAction } from '../../store/actions';
import { playlistDetailSelectorCreator, taskStateSelectorCreator } from '../../utils/selectorCreators';
import { authSelector, queueSelector, uiSelector } from '../../store/selectors';
import { UpdatePlaylistModal } from './UpdatePlaylistModal';
import { PLAYLIST_MENU_ID } from '../../components/Playlist/PlaylistMenu';
import styles from './index.module.scss';

interface IPlaylistViewProps { }

export const PlaylistView: FC<IPlaylistViewProps> = () => {

  const { playlistId } = useParams<IPlaylistViewParams>();

  const [ openEditModal, setOpenEditModal ] = useState(false);

  const dispatch = useDispatch();
  const playingItem = useSelector(queueSelector.current);
  const userProfileId = useSelector(authSelector.userProfileId);
  const playlistDetail = useSelector(playlistDetailSelectorCreator(playlistId));
  const getPlaylistDetailState = useSelector(
    taskStateSelectorCreator(taskStateAction.getPlaylistDetail.toString()));
  const dominentColor = useSelector(uiSelector.dominantColor);

  useEffect(() => {
    if (getPlaylistDetailState.state === 'success')
      dispatch(taskStateAction.getPlaylistDetail({state: 'idle'}));
  }, [ getPlaylistDetailState,  dispatch]);

  useEffect(() => {
    if (!playlistDetail) {
      dispatch(playlistAction.getPlaylistDetail(playlistId));
    } 
  }, [ dispatch, playlistDetail, playlistId ]);

  const onEditClicked = () => {
    setOpenEditModal(true);
  };
  const onModalClosed = () => {
    setOpenEditModal(false);
  };

  const onPlayClicked = () => {
    const items = playlistDetail?.items || [];
    dispatch(queueAction.playAlbumOrPlaylist(items));
  };

  const durationInSec = playlistDetail 
    ? playlistDetail.items.map((x) => x.length).reduce((a, b) => a + b, 0) 
    : 0;
  const durationInMin = moment(durationInSec * 1000).format(`mm:ss`);
  const [ min, sec ] = durationInMin.split(':');

  return (
    <ViewWrapper title="Danh sách phát" contentReady={getPlaylistDetailState.state !== 'processing'}>
      {
        getPlaylistDetailState.state === 'idle' && (
          <UpdatePlaylistModal
            shouldCloseOnOverlayClick={true}
            onRequestClose={onModalClosed}
            isOpen={openEditModal}
            handleClose={() => setOpenEditModal(false)}
            initData={{
              id: playlistDetail?.id || '',
              name: playlistDetail?.name || '',
              description: playlistDetail?.description,
              cover: playlistDetail?.cover
            }}
          />
        )
      }
      <IntroCard 
        title={playlistDetail?.name}
        description={playlistDetail?.description}
        coverUrl={playlistDetail?.cover || ''}
        category="Playlist"
        prominentColor={dominentColor}
        editable={userProfileId === playlistDetail?.creator?.id}
        onEditClicked={onEditClicked}
      >
        <Link to={playlistDetail && routes.Profile.replace(':userId', playlistDetail?.creator?.id)}>
          {playlistDetail?.creator?.fullName || ''}
        </Link>
        <DotSeperator />
        <p>
          {playlistDetail?.items.length || 0} bài hát
        </p>
        <DotSeperator />
        <p>
          {min} phút {sec} phút 
        </p>
      </IntroCard>
      <div className={styles.content}>
        <LinearEffectBackground color={dominentColor} />
        <div className={styles.actions}>
          {
            (playlistDetail?.items ?? []).length > 0 && (
              <IconButton className={styles.playButton} onClick={onPlayClicked}>
                <Icon.PlayV2 />
              </IconButton>
            )
          }
          <IconButton className={styles.optionButton}>
            <Icon.ThreeDot />
          </IconButton>
        </div>
        <div className={styles.itemsList}>
          <Playlist
            data={playlistDetail?.items}
            render={(data, index) => (
              <PlaylistItem
                key={data.id} 
                index={index} 
                data={data} 
                hidden={{creationTime: false}} 
                contextMenuId={PLAYLIST_MENU_ID}
                isActiveItem={data.id === playingItem?.id}
              />
            )}
            showHeader
            renderHeader={() => <PlaylistHeader hidden={{creationTime: false}} />}
          />
        </div>
      </div>
    </ViewWrapper>
  );
};