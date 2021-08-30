import { FC, useEffect, useState } from 'react';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import { useDispatch, useSelector } from 'react-redux';
import { Playlist, Typography, ViewWrapper } from '../../components';
import { audioAction } from '../../store/actions';
import { audioSelector } from '../../store/selectors';
import { PageModelRequest } from '../../utils/interfaces';
import styles from './index.module.scss';

interface IUploadedListViewProps { }

export const UploadedListView: FC<IUploadedListViewProps> = () => {

  const [ pageModel, setPageModel ] = useState<PageModelRequest>({
    pageIndex: 1,
  });
  
  const dispatch = useDispatch();

  const uploadedList = useSelector(audioSelector.uploadedList);

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
        <Playlist data={uploadedList.items.map((el) => ({
          id: el.id,
          name: el.name,
          length: el.length,
          artist: el.artists,
          album: el.albumTag,
          creationTime: el.creationTime,
          photo: el.cover,
          url: el.file
        }))}
         />
        <ContextMenuTrigger id={'MENU_TYPE'} holdToDisplay={1000}>
          <div className='well'>right click to see the menu</div>
        </ContextMenuTrigger>
       
        <ContextMenu id={'MENU_TYPE'}>
            <MenuItem data={{ item: 'item 1' }}>Menu Item 1</MenuItem>
            <MenuItem data={{ item: 'item 2' }}>Menu Item 2</MenuItem>
            <MenuItem divider />
            <MenuItem data={{ item: 'item 3' }}>Menu Item 3</MenuItem>
        </ContextMenu>
      </div>
    </ViewWrapper>
  );
};