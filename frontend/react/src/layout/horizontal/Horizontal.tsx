import React, { useEffect, useState } from 'react';

import axios from 'axios';

import BaseLayout from '../base/BaseLayout';

import Logo from '../components/logo/Logo';
import Menu from '../components/menu/Menu';
import Navbar from '../components/navbar/Navbar';
import Search from '../components/search/Search';

import LogoSvg from './../../assets/img/logo.svg';

import Actions from '../components/actions/Actions';

import { useSearchData } from '../../hooks/useSearchData';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../redux/settings/actions';

import { IAppState } from '../../interfaces/app-state';

import './Horizontal.scss';

type Props = {
  children: any;
};

const HorizontalLayout = ({ children }: Props) => {
  const dispatch = useDispatch();

  const settings = useSelector((state: IAppState) => state.settings);

  const searchData = useSearchData();
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    async function fetchMenuData() {
      const result = await axios('/data/menu-horizontal.json');
      setMenuData(result.data);
    }

    fetchMenuData().catch((err) => console.log('Server Error', err));
  }, []);

  const handleCloseMenu = () => dispatch(toggleSidebar());

  const nav = (
    <Navbar
      orientation='horizontal'
      color={settings.topbarColor}
      background={settings.topbarBg}
      boxed={settings.boxed}
    >
      <button className='no-style navbar-toggle d-lg-none' onClick={handleCloseMenu}>
        <span />
        <span />
        <span />
      </button>

      <Logo src={LogoSvg} />

      <Search layout='vertical' data={searchData} />

      <Actions />
    </Navbar>
  );

  const additionalNav = (
    <Navbar
      minHeight={40}
      boxed={settings.boxed}
      color={settings.sidebarColor}
      background={settings.sidebarBg}
      opened={settings.sidebarOpened}
      onClickOutside={handleCloseMenu}
      orientation='horizontal-vertical'
    >
      <div className='navbar-mobile-header'>
        <Logo src={LogoSvg} />
        <button
          onClick={handleCloseMenu}
          className='no-style navbar-close icofont-close-line d-lg-none ml-2'
        />
      </div>
      <Menu
        onCloseSidebar={handleCloseMenu}
        opened={settings.sidebarOpened}
        orientation='horizontal'
        data={menuData}
      />
    </Navbar>
  );

  return (
    <>
      <BaseLayout orientation='horizontal' nav={nav} topNav={additionalNav}>
        {children}
      </BaseLayout>
    </>
  );
};

export default HorizontalLayout;
