import { FC, useState } from 'react';
import { IData, PlaylistItem, PlaylistHeader } from './PlaylistItem';
import styles from './index.module.scss';
import { ContextMenu, MenuItem, SubMenu } from 'react-contextmenu';
import { IPlayingAudioItem } from '../../store/interface/queue';
import { useDispatch } from 'react-redux';
import { queueAction } from '../../store/actions';



interface IPlaylistProps {
  data?: IData[];
  render?: (data: IData, index: number) => JSX.Element;
  showHeader?: boolean;
}

export const Playlist: FC<IPlaylistProps> = ({
  data = [],
  render,
  showHeader = false,
}) => {

  const [ menuId ] = useState('context-menu-id');

  const dispatch = useDispatch();

  const onAddToQueue = (e: 
    | React.TouchEvent<HTMLDivElement> 
    | React.MouseEvent<HTMLDivElement, MouseEvent>, 
    cdata: Object, 
    target: HTMLDivElement) => {
    const id = target.getAttribute('itemid')
    if (!id) { return };
    const item = data.find((x) => x.id === id);
    if (!item) { return; }

    const itemAdded: IPlayingAudioItem = {
      id,
      name: item.name,
      albumTag: item.album,
      artist: item.artist,
      cover: item.photo,
      length: item.length,
      url: item.url
    };

    dispatch(queueAction.addAudio(itemAdded));
  };

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {
          showHeader && (
            <div className={styles.header}>
              <PlaylistHeader hidden={{creationTime: false}} />
            </div>
          )
        }
        {
          render ? data.map((el, index) => render(el, index + 1)) :
          data.map((el, index) => 
          <PlaylistItem 
            key={el.id} 
            index={index + 1} 
            data={el} 
            hidden={{creationTime: false}} 
            contextMenuId={menuId}
          />)
        }
        <ContextMenu id={menuId}>
          <MenuItem data={{foo: 'bar'}} onClick={onAddToQueue}>
            Thêm vào danh sách chờ
          </MenuItem>
          <MenuItem divider />
          <MenuItem data={{foo: 'bar'}} onClick={() => {}}>
            Chuyển tới nghệ sĩ
          </MenuItem>
          <MenuItem data={{foo: 'bar'}} onClick={() => {}}>
            Chuyển tới album
          </MenuItem>
          <MenuItem divider />
          <MenuItem data={{foo: 'bar'}} onClick={() => {}}>
            Thêm vào danh sách yêu thích
          </MenuItem>
          <SubMenu title="Thêm vào danh sách phát">
            <MenuItem>
              SubItem 1
            </MenuItem>
            <MenuItem>
              SubItem 2
            </MenuItem>
            <MenuItem>
              SubItem 3
            </MenuItem>
          </SubMenu>
        </ContextMenu>
      </div>
    </div>
  );
};