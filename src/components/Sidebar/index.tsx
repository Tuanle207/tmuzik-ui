import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Icon } from '../../assets';
import logger from '../../configs/logger';
import { paths } from '../../routings';
import styles from './index.module.scss';


export const Sidebar = () => {

  const history = useHistory();

  const navigate = (path: string) => {
    logger.info('navigating', 'gege');
    history.push(path);
  }

  useEffect(() => {
    logger.info('rendering');
    logger.info('navigating', 'gege');

  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Icon.Logo />
      </div>
      <ul>
        <li className={[styles.menuItem, styles.menuItemActive].join(' ')}
          onClick={() => navigate(paths.Home)}
        >
          <Icon.Home />
          <span>Trang chủ</span>
        </li>
        <li className={styles.menuItem}
          onClick={() => navigate(paths.Home)}
        >
          <Icon.Search />
          <span>Tìm kiếm</span>
        </li>
        <li className={styles.menuItem}
          onClick={() => navigate(paths.Library)}
        >
          <Icon.Library />
          <span>Thư viện</span>
        </li>
        <li className={styles.menuItem}>
          <Icon.Favorite />
          <span>Bài hát yêu thích</span>
        </li>
        <li className={styles.menuItem}>
          <Icon.AddPlaylist />
          <span>Tạo playlist</span>
        </li>
      </ul>
      <div className={styles.divider} />
      <div className={styles.playlist} >
        <ul>
          <li>
            <span>Nhạc hay tháng 12</span>
          </li>
          <li>
            <span>Những bài hát thể loại ballad rất là hay</span>
          </li>
          <li>
            <span>Nhạc hay tháng 12</span>
          </li>
          <li>
            <span>Những bài hát thể loại ballad rất là hay</span>
          </li>
          <li>
            <span>Nhạc hay tháng 12</span>
          </li>
          <li>
            <span>Những bài hát thể loại ballad rất là hay</span>
          </li>
          <li>
            <span>Nhạc hay tháng 12</span>
          </li>
          <li>
            <span>Những bài hát thể loại ballad rất là hay</span>
          </li>
          <li>
            <span>Nhạc hay tháng 12</span>
          </li>
          <li>
            <span>Những bài hát thể loại ballad rất là hay</span>
          </li>
          
        </ul>
      </div>
    </div>

  )
};