import { FC, useEffect } from 'react';
import { Item, ItemParams, PredicateParams, Menu, Separator, Submenu } from 'react-contexify';

import { useDispatch, useSelector } from 'react-redux';
import { playlistAction, queueAction } from '../../store/actions';
import { playlistSelector, queueSelector } from '../../store/selectors';

interface IPlaylistMenuProps {
  data?: API.AudioItem[];
}

export const PLAYLIST_MENU_ID = 'PLAYLIST_MENU_ID'; 

export interface IPlaylistMenuItemProps {
  itemId?: string;
}

export interface IPlaylistMenuItemData {
  playlistId?: string;
}


export const PlaylistMenu: FC<IPlaylistMenuProps> = ({
  data = []
}) => {

  const dispatch = useDispatch();
  const userPlaylists = useSelector(playlistSelector.userPlaylists);
  const queue = useSelector(queueSelector.queue);

  useEffect(() => {
    console.log('render menu');
  }, []);

  const handleItemClick = ({ event, triggerEvent, data = {}, props = {} }:
    ItemParams<IPlaylistMenuItemProps, IPlaylistMenuItemData>) => {
      const menuItemId = event.currentTarget.id;

      switch(menuItemId) {
        case 'addToQueue':
          return onAddToQueue(props);
        case 'removeFromQueue':
          return onRemoveFromQueue(props);
        case 'goToArtist':
        case 'goToAlbum':
        case 'addToFavourite':
        case menuItemId.match(/^playlist/)?.input:
          return onAddToPlaylist(data, props);
      }
  };

  const onAddToQueue = (props: IPlaylistMenuItemProps) => {
    const { itemId } = props;
    const item = data.find((x) => x.id === itemId);
    if (!item) return;
    dispatch(queueAction.addAudio(item));
  };

  const onRemoveFromQueue = (props: IPlaylistMenuItemProps) => {
    const { itemId } = props;
    const item = data.find((x) => x.id === itemId);
    if (!item) return;
    dispatch(queueAction.removeAudio(item));
  };

  const onAddToPlaylist = (data: IPlaylistMenuItemData, props: IPlaylistMenuItemProps) => {

    const { playlistId } = data;
    const { itemId } = props;
    if (!itemId || !playlistId) return;
    
    dispatch(playlistAction.addPlaylistItem({
      id: playlistId, 
      items: [ itemId ]
    }));
  };

  const isRemoveFromQueueDisable = ({ props = {} }: PredicateParams<IPlaylistMenuItemProps, IPlaylistMenuItemData>) => {
    const { itemId } = props;
    if (!itemId) return false;
    const isNotInQueue = queue.findIndex((x) => x.id === itemId) === -1;
    return isNotInQueue;
  };

  return (
    <Menu id={PLAYLIST_MENU_ID} >
      <Item id="addToQueue" onClick={handleItemClick}>
        Thêm vào danh sách chờ
      </Item>
      <Item id="removeFromQueue" onClick={handleItemClick} disabled={isRemoveFromQueueDisable}>
        Xóa khỏi danh sách chờ
      </Item>
      <Separator />
      <Item id="goToArtist" onClick={handleItemClick}>
        Chuyển tới nghệ sĩ
      </Item>
      <Item id="goToAlbum" onClick={handleItemClick}>
        Chuyển tới album
      </Item>
      <Separator />
      <Item id="addToFavourite" onClick={handleItemClick}>
        Thêm vào danh sách yêu thích
      </Item>
      <Submenu label="Thêm vào danh sách phát">
      {
        userPlaylists.map((playlist) => (
          <Item
            id={`playlist-${playlist.id}`} 
            key={playlist.id} 
            data={{ playlistId: playlist.id } as IPlaylistMenuItemData}
            onClick={handleItemClick}
          >
            { playlist.name }
          </Item>
        ))
      }
      </Submenu>
    </Menu>
  );
};