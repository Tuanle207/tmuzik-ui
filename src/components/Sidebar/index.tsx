import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Icon } from '../../assets';
import { IPlaylistViewParams, routes } from '../../routings';
import { playlistAction } from '../../store/actions';
import { playlistSelector } from '../../store/selectors';
import { paramsSelectorCreator } from '../../utils/selectorCreators';
import styles from './index.module.scss';


export const Sidebar = () => {

  const history = useHistory();
  
  const dispatch = useDispatch();
  const userPlaylists = useSelector(playlistSelector.userPlaylists);
  const { playlistId } = useSelector(paramsSelectorCreator<IPlaylistViewParams>(routes.Playlist));

  useEffect(() => {
    dispatch(playlistAction.getUserPlaylists());
  }, [dispatch]);

  const navigate = (path: string) => {
    history.push(path);
  };

  const navigateToPlaylist = (id: string) => {
    const path = routes.Playlist.replace(':playlistId', id);
    history.push(path);
  };

  const onCreatePlaylistClicked = () => {
    const PLAYLIST_COUNT = userPlaylists.length;
    const name = `Playlist #${PLAYLIST_COUNT + 1}`;
    dispatch(playlistAction.createPlaylist({
      name,
      description: ''
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo} onClick={() => navigate(routes.Home)}>
        <Icon.Logo />
        <p>Tmuzik</p>
      </div>
      <ul>
        <li className={[styles.menuItem, styles.menuItemActive].join(' ')}
          onClick={() => navigate(routes.Home)}
        >
          <Icon.Home />
          <span>Trang chủ</span>
        </li>
        <li className={styles.menuItem}
          onClick={() => navigate(routes.Search)}
        >
          <Icon.Search />
          <span>Tìm kiếm</span>
        </li>
        <li className={styles.menuItem}
          onClick={() => navigate(routes.Library)}
        >
          <Icon.Library />
          <span>Thư viện</span>
        </li>
        <li className={styles.menuItem}>
          <Icon.Favorite />
          <span>Bài hát yêu thích</span>
        </li>
        <li className={styles.menuItem}
          onClick={onCreatePlaylistClicked}
        >
          <Icon.AddPlaylist />
          <span>Tạo playlist</span>
        </li>
      </ul>
      <div className={styles.divider} />
      <div className={styles.playlist} >
        <ul>
        {
          userPlaylists.map(({ id, name}) => (
            <li 
              key={id} 
              className={playlistId === id ? styles.activeColor : ''}
              onClick={() => navigateToPlaylist(id)}
            >
              <span>{ name }</span>
            </li>
          ))
        }
        </ul>
      </div>
    </div>

  )
};