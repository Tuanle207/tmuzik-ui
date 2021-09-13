import { FC, useEffect, useState } from 'react';
import { ContextMenu, MenuItem, SubMenu } from 'react-contextmenu';
import { useDispatch, useSelector } from 'react-redux';
import { playlistAction, queueAction } from '../../store/actions';
import { playlistSelector, queueSelector } from '../../store/selectors';

interface IPlaylistMenuProps {
  data?: API.AudioItem[];
}

export const PLAYLIST_MENU_ID = 'PLAYLIST_MENU_ID'; 
const ITEM_ID_ATTR = 'itemId';
const PLAYLIST_ID_ATTR = 'playlistId';

export const PlaylistMenu: FC<IPlaylistMenuProps> = ({
  data = []
}) => {

  const [ itemId, setItemId ] = useState('');

  const dispatch = useDispatch();
  const userPlaylists = useSelector(playlistSelector.userPlaylists);
  const queue = useSelector(queueSelector.queue);

  useEffect(() => {
    console.log('render menu');
  }, []);

  const onMenuShow = (e: any) => {
    console.log('menu showed');
    const id = e?.detail?.target?.getAttribute(ITEM_ID_ATTR);
    setItemId(id);
  };

  const onAddToQueue = (e: 
    | React.TouchEvent<HTMLDivElement> 
    | React.MouseEvent<HTMLDivElement, MouseEvent>, 
    cdata: Object, 
    target: HTMLDivElement) => {
    console.log('adding');
    const id = target.getAttribute(ITEM_ID_ATTR);
    const item = data.find((x) => x.id === id);
    if (!item) return;

    dispatch(queueAction.addAudio(item));
  };

  const onRemoveFromQueue = (e: 
    | React.TouchEvent<HTMLDivElement> 
    | React.MouseEvent<HTMLDivElement, MouseEvent>, 
    cdata: Object, 
    target: HTMLDivElement) => {
    console.log('removing');
    const id = target.getAttribute(ITEM_ID_ATTR);
    const item = data.find((x) => x.id === id);
    if (!item) return;

    dispatch(queueAction.removeAudio(item));
  };

  const onAddToPlaylistClicked = (e: 
    | React.TouchEvent<HTMLDivElement> 
    | React.MouseEvent<HTMLDivElement, MouseEvent>, 
    cdata: any, 
    target: HTMLDivElement) => {
    console.log('onAddToPlaylistClicked');

    const playlistId = cdata[PLAYLIST_ID_ATTR];
    const id = target.getAttribute(ITEM_ID_ATTR);
    if (!id) return;
    
    dispatch(playlistAction.addPlaylistItem({
      id: playlistId, 
      items: [ id ]
    }));
  };

  const removable = queue.findIndex((x) => x.id === itemId) !== -1; 

  return (
    <ContextMenu id={PLAYLIST_MENU_ID} onShow={onMenuShow}>
      <MenuItem onClick={onAddToQueue}>
        Thêm vào danh sách chờ
      </MenuItem>
      <MenuItem onClick={onRemoveFromQueue} disabled={!removable}>
        Xóa danh sách chờ
      </MenuItem>
      <MenuItem divider />
      <MenuItem onClick={() => {console.log('koasfnklsadfkosa')}}>
        Chuyển tới nghệ sĩ
      </MenuItem>
      <MenuItem onClick={() => {}}>
        Chuyển tới album
      </MenuItem>
      <MenuItem divider />
      <MenuItem onClick={() => {}}>
        Thêm vào danh sách yêu thích
      </MenuItem>
      <SubMenu title="Thêm vào danh sách phát">
      {
        userPlaylists.map((playlist) => (
          <MenuItem 
            key={playlist.id} 
            data={{ [PLAYLIST_ID_ATTR]: playlist.id }}
            onClick={onAddToPlaylistClicked}
          >
            { playlist.name }
          </MenuItem>
        ))
      }
      </SubMenu>
    </ContextMenu>
  );
};