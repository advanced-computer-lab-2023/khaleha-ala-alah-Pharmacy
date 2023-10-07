import React from 'react';
import { NavLink } from 'react-router-dom';

import { IMenuItemSub } from '../../../interfaces/main-menu';

import { motion } from 'framer-motion';

import className from '../../../utils/class-names';

const isHorizontal = (layout: string) => window.innerWidth >= 992 && layout === 'horizontal';

type Props = {
  sub: IMenuItemSub[];
  title: string;
  onClick?: (routing: string) => void;
  location: Location;
  layout?: string;
  opened?: boolean;
};

const container = {
  hidden: { opacity: 0, height: 0 },
  show: {
    opacity: 1,
    height: 'auto'
  }
};

const ItemWithSub = ({ location, title, layout, sub, opened, onClick }: Props) => {
  const subItemClass = (routing: string) =>
    className({
      'menu-item': true,
      active: routing === location.pathname.split('/')[2]
    });

  const itemSub = sub.map((item: IMenuItemSub, i: number) => (
    <li className={subItemClass(item.routing)} key={i}>
      <NavLink
        to={`/${item.layout || layout}/${item.routing}`}
        className={`item-link ${({ isActive }) => (isActive ? 'active' : 'inactive')}`}
        replace
      >
        <span className='link-text'>{item.title}</span>
      </NavLink>
    </li>
  ));

  const handleOnClick = () => {
    onClick(title);
  };

  return (
    <li className={`menu-item has-sub ${opened ? 'active' : ''}`} onClick={handleOnClick}>
      <span className='item-link'>
        <span className='link-text'>{title}</span>

        <span className='link-caret icofont icofont-thin-right' />
      </span>

      {isHorizontal(layout) ? (
        <ul className='sub' onClick={(e) => e.stopPropagation()}>
          {itemSub}
        </ul>
      ) : (
        <motion.div
          initial='hidden'
          variants={container}
          animate={opened ? 'show' : 'hidden'}
          transition={{ type: 'tween', duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className='sub'>{itemSub}</ul>
        </motion.div>
      )}
    </li>
  );
};

export default ItemWithSub;
