import React from 'react';
import { ICON } from '../../assets';
import './index.scss';

export const Sidebar = () => {

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <ICON.LOGO />
      </div>
      <ul className="sidebar__menu">
        <li className="sidebar__menu-item sidebar__menu-item--active">
          <ICON.HOME />
          <span>Trang chủ</span>
        </li>
        <li className="sidebar__menu-item ">
          <ICON.SEARCH />
          <span>Tìm kiếm</span>
        </li>
        <li className="sidebar__menu-item">
          <ICON.LIBRARY />
          <span>Thư viện</span>
        </li>
        <li className="sidebar__menu-item ">
          <ICON.FAVOURITE />
          <span>Bài hát yêu thích</span>
        </li>
        <li className="sidebar__menu-item">
          <ICON.ADD_PLAYLIST />
          <span>Tạo playlist</span>
        </li>
      </ul>
      <div className="divider" />
      <div className="sidebar__playlist">
        <ul>
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