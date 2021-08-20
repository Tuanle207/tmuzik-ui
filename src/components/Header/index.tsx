import { FC, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../assets';
import { useHiddenOnBlurred } from '../../hooks';
import { authAction } from '../../store/actions';
import { authSelectors } from '../../store/selectors';
import { IconButton } from '../IconButton';
import styles from './index.module.scss';


interface IHeaderProps {

}

const HeaderMenu = () => {

  const dispatch = useDispatch();

  const onSignoutClicked = () => {
    dispatch(authAction.postLogout());
  };

  const onAccountClicked = () => {

  };

  const onProfileClicked = () => {

  };

  const onPremiumUpgradeClicked = () => {

  }

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
}

export const Header: FC<IHeaderProps> = () => {

  const menuRef = useRef(null);
  const buttonMenuRef = useRef(null);

  const [ showMenu, setShowMenu ] = useState(false);
  
  const userProfile = useSelector(authSelectors.userProfile); 

  useHiddenOnBlurred({
    display: showMenu,
    displaySetter: setShowMenu,
    exceptSpaceRef: [ menuRef, buttonMenuRef ]
  });

  const onMenuClicked = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div className={styles.container}>
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
      <div className={styles.menuView}>
        <div 
          ref={buttonMenuRef} 
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
            <div ref={menuRef} id="header-menu" className={styles.menu}>
              <HeaderMenu />
            </div>
          )
        }
      </div>
    </div>
  )
};