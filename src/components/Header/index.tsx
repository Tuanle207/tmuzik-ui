import { push } from 'connected-react-router';
import { FC, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../assets';
import { useHiddenOnBlurred } from '../../hooks';
import { paths } from '../../routings';
import { authAction } from '../../store/actions';
import { authSelector, uiSelector } from '../../store/selectors';
import { IconButton } from '../IconButton';
import styles from './index.module.scss';



interface IHeaderMenuProps { userId: string; }

const HeaderMenu: FC<IHeaderMenuProps> = ({ 
  userId
}) => {

  const dispatch = useDispatch();

  const onSignoutClicked = () => {
    dispatch(authAction.postLogout());
  };

  const onAccountClicked = () => {

  };

  const onProfileClicked = () => {
    dispatch(push(paths.Profile.replace(':userId', userId)));
  };

  const onPremiumUpgradeClicked = () => {

  };

  return (
    <ul className={styles.menuList}>
      <li className={styles.menuItem} onClick={onAccountClicked}>
        <span>
          Tài khoản
        </span>
        <Icon.NewWindow />
      </li>
      <li className={styles.menuItem} onClick={onProfileClicked}>
        <span>
          Hồ sơ
        </span>
      </li>
      <li className={styles.menuItem} onClick={onPremiumUpgradeClicked}>
        <span>
          Nâng cấp lên Premium
        </span>
        <Icon.NewWindow />
      </li>
      <li className={styles.menuItem} onClick={onSignoutClicked}>
        <span>
          Đăng xuất
        </span>
      </li>
    </ul>
  );
};

interface IHeaderProps {
  opacity?: number;
}

export const Header: FC<IHeaderProps> = ({
  opacity = 1
}) => {
  
  const menuRef = useRef<HTMLDivElement>(null);

  const [ showMenu, setShowMenu ] = useState(false);

  const dispatch = useDispatch();
  const dominentColor = useSelector(uiSelector.dominantColor);
  const userProfile = useSelector(authSelector.userProfile); 

  useHiddenOnBlurred({
    display: showMenu,
    displaySetter: setShowMenu,
    exceptSpaceNodes: [ menuRef ]
  });

  const onMenuClicked = () => {
    setShowMenu((prev) => !prev);
  };

  const onUploadButtonClicked = () => {
    dispatch(push(paths.Upload));
  };

  const backgroundStyle = dominentColor
    ? { backgroundColor: dominentColor, opacity }
    : { backgroundColor: '#333333', opacity };

  return (
    <div 
      className={styles.container}
    >
      <div className={styles.bgColor} style={backgroundStyle} />
      <div className={styles.navigation}>
        <IconButton>
          <Icon.Left />
        </IconButton>
        <IconButton>
          <Icon.Right />
        </IconButton>
      </div>
      <div className={styles.customChildren}>

      </div>
      <div className={styles.buttonGroup}>
        <IconButton className={styles.uploadButton} onClick={onUploadButtonClicked}>
          <Icon.Upload />
        </IconButton>
      </div>
      <div className={styles.menuView} ref={menuRef}>
        <div 
          className={[styles.button, showMenu ? styles.buttonBgLight : ''].join(' ')} 
          onClick={onMenuClicked}
        >
          <img 
            src={ userProfile?.avatar || "https://i.pinimg.com/originals/eb/b0/2a/ebb02aedec9bc74f65e38311c7e14d34.png" } 
            alt={ userProfile?.fullName || '' } 
          />
          <p>{ userProfile?.fullName || '' }</p>
          {
            showMenu ? 
            <Icon.CarretUp /> :
            <Icon.CarretDown />
          }
        </div>
        {
          showMenu && (
            <div  id="header-menu" className={styles.menu}>
              <HeaderMenu userId={userProfile?.id || ''} />
            </div>
          )
        }
      </div>
    </div>
  )
};