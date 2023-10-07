import React from 'react';
import { NavLink } from 'react-router-dom';
import { IMenuItemIcon } from '../../../interfaces/main-menu';

type Props = {
  title: string;
  routing: string;
  layout: string;
  icon: IMenuItemIcon;
};

const SimpleItem = ({ routing, title, layout, icon }: Props) => (
  <li className='menu-item'>
    <NavLink
      className={`item-link ${({ isActive }) => (isActive ? 'active' : 'inactive')}`}
      to={`/${layout}/${routing}`}
      replace
    >
      {icon && (
        <span
          className={`link-icon ${icon.class}`}
          style={{ backgroundColor: icon.bg, color: icon.color }}
        />
      )}
      <span className='link-text'>{title}</span>
    </NavLink>
  </li>
);

export default SimpleItem;
