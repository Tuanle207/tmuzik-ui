import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Playlist, PlaylistHeader, PlaylistItem, Typography, ViewWrapper } from '../../components';
import { PLAYLIST_MENU_ID } from '../../components/Playlist/PlaylistMenu';
import { audioAction } from '../../store/actions';
import { audioSelector, queueSelector } from '../../store/selectors';
import { PageModelRequest } from '../../utils/interfaces';
import styles from './index.module.scss';

interface IUploadedListViewProps { }

export const UploadedListView: FC<IUploadedListViewProps> = () => {

  const [ pageModel, setPageModel ] = useState<PageModelRequest>({
    pageIndex: 1,
  });
  
  const dispatch = useDispatch();

  const uploadedList = useSelector(audioSelector.uploadedList);
  const playingItem = useSelector(queueSelector.current);

  useEffect(() => {
    dispatch(audioAction.getUserUploadAudio(pageModel));
  }, [ pageModel, dispatch ]);

  return (
    <ViewWrapper title="Danh sách tải lên">
      <div className={styles.container}>
        <Typography variant="h3" className={styles.title}>Danh sách tải lên</Typography>
        <Typography variant="p2" className={styles.note}>Chỉ hiển thị với bạn</Typography>
        <Playlist showHeader data={uploadedList.items}
          activeItemId={playingItem?.id}
          render={(data, index) => (<PlaylistItem
              index={index}
              key={data.id}
              data={data}
              contextMenuId={PLAYLIST_MENU_ID}
              hidden={{creationTime: false}}
              isActiveItem={data.id === playingItem?.id}
            />)}
          renderHeader={() => <PlaylistHeader
              hidden={{ creationTime: false }}
            />}
         />
      </div>
    </ViewWrapper>
  );
};