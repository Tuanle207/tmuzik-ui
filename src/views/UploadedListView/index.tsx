import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Playlist, Typography, ViewWrapper } from '../../components';
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
    if (uploadedList.items.length === 0) {
      dispatch(audioAction.getUserUploadAudio(pageModel))
    }
  }, [ pageModel, uploadedList, dispatch ]);

  return (
    <ViewWrapper>
      <div className={styles.container}>
        <Typography variant="h3" className={styles.title}>Danh sách tải lên</Typography>
        <Typography variant="p2" className={styles.note}>Chỉ hiển thị với bạn</Typography>
        <Playlist showHeader data={uploadedList.items.map((el) => ({
            id: el.id,
            name: el.name,
            length: el.length,
            artist: el.artists,
            album: el.albumTag,
            creationTime: el.creationTime,
            photo: el.cover,
            url: el.file
          }))}
          activeItemId={playingItem?.id}
         />
      </div>
    </ViewWrapper>
  );
};