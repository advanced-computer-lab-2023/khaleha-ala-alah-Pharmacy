import React from 'react';

interface MenuGroupTitleProps {
  title: string;
}

const MenuGroupTitle: React.FC<MenuGroupTitleProps> = ({ title }) => (
  <li className='menu-item group'>
    <span className='group-title'>{title}</span>
  </li>
);

export default MenuGroupTitle;
