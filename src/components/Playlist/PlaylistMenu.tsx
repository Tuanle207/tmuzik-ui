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
        Th??m v??o danh s??ch ch???
      </Item>
      <Item id="removeFromQueue" onClick={handleItemClick} disabled={isRemoveFromQueueDisable}>
        X??a kh???i danh s??ch ch???
      </Item>
      <Separator />
      <Item id="goToArtist" onClick={handleItemClick}>
        Chuy???n t???i ngh??? s??
      </Item>
      <Item id="goToAlbum" onClick={handleItemClick}>
        Chuy???n t???i album
      </Item>
      <Separator />
      <Item id="addToFavourite" onClick={handleItemClick}>
        Th??m v??o danh s??ch y??u th??ch
      </Item>
      <Submenu label="Th??m v??o danh s??ch ph??t">
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