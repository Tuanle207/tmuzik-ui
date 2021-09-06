import moment from 'moment';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Icon } from '../../assets';
import { DotSeperator, IntroCard, LinearEffectBackground, Link, Playlist, ViewWrapper } from '../../components';
import { IconButton } from '../../components/IconButton';
import { PlaylistHeader, PlaylistItem } from '../../components/Playlist/PlaylistItem';
import { IPlaylistViewParams, paths } from '../../routings';
import { playlistAction, uiAction } from '../../store/actions';
import { playlistDetailSelectorCreator } from '../../utils/selectorCreators';
import { getPaletteFromImage } from '../../utils/getPaletteFromImage';
import { authSelector, uiSelector } from '../../store/selectors';
import styles from './index.module.scss';
import { UpdatePlaylistModal } from './UpdatePlaylistModal';
interface IPlaylistViewProps { }

export const PlaylistView: FC<IPlaylistViewProps> = () => {

  const { playlistId } = useParams<IPlaylistViewParams>();

  const [ openEditModal, setOpenEditModal ] = useState(false);

  const dispatch = useDispatch();
  const userProfileId = useSelector(authSelector.userProfileId);
  const playlistDetail = useSelector(playlistDetailSelectorCreator(playlistId));
  const dominentColor = useSelector(uiSelector.dominantColor);

  useEffect(() => {
    if (!playlistDetail) {
      dispatch(playlistAction.getPlaylistDetail(playlistId));
    } else {
      getPaletteFromImage(playlistDetail.cover)
        .then((palatte) => {
          const color = palatte ? palatte.Vibrant?.hex : palatte;
          dispatch(uiAction.setDominantColor(color));
        });
    }

  }, [ dispatch, playlistDetail, playlistId ]);

  const onEditClicked = () => {
    setOpenEditModal(true);
  };
  const onModalClosed = () => {
    setOpenEditModal(false);
  };

  const durationInSec = playlistDetail 
    ? playlistDetail.items.map((x) => x.length).reduce((a, b) => a + b, 0) 
    : 0;
  const durationInMin = moment(durationInSec * 1000).format(`mm:ss`);
  const [ min, sec ] = durationInMin.split(':');

  return (
    <ViewWrapper>
      <UpdatePlaylistModal
        shouldCloseOnOverlayClick={true}
        onRequestClose={onModalClosed}
        isOpen={openEditModal}
        initData={playlistDetail}
      />
      <IntroCard 
        title={playlistDetail?.name}
        description={playlistDetail?.description}
        coverUrl={playlistDetail?.cover || ''}
        category="Playlist"
        prominentColor={dominentColor}
        editable={userProfileId === playlistDetail?.creator.id}
        onEditClicked={onEditClicked}
      >
        <Link to={playlistDetail && paths.Profile.replace(':userId', playlistDetail.creator.id)}>
          {playlistDetail?.creator.fullName || ''}
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
          <IconButton className={styles.playButton}>
            <Icon.Play />
          </IconButton>
          <IconButton className={styles.optionButton}>
            <Icon.ThreeDot />
          </IconButton>
        </div>
        <div className={styles.itemsList}>
          <Playlist
            data={playlistDetail?.items.map((x) => ({
              id: x.id,
              name: x.name,
              album: x.albumTag,
              artist: x.albumTag,
              length: x.length,
              photo: x.cover,
              url: x.file,
              creationTime: x.creationTime
            }))}
            render={(data, index) => (
              <PlaylistItem
                key={data.id} 
                index={index + 1} 
                data={data} 
                hidden={{creationTime: false}} 
                contextMenuId={'context-menu-id'}
                // isActiveItem={el.id === activeItemId}
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