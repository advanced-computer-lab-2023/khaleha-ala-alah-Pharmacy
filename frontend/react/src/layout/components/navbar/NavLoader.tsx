import React from 'react';
import './NavLoader.scss';

type Props = {
  type: 'top-bar' | 'nav-bar';
  loaded: boolean;
};

const NavLoader = ({ type, loaded }: Props) => {
  const verticalLoader = (
    <>
      <div className='top-part'>
        <div className='sk-logo bg animated-bg' />
        <div className='sk-menu'>
          <span className='sk-menu-item menu-header bg-1 animated-bg' />
          <span className='sk-menu-item bg animated-bg w-75' />
          <span className='sk-menu-item bg animated-bg w-80' />
          <span className='sk-menu-item bg animated-bg w-50' />
          <span className='sk-menu-item bg animated-bg w-75' />
          <span className='sk-menu-item bg animated-bg w-50' />
          <span className='sk-menu-item bg animated-bg w-60' />
        </div>
        <div className='sk-menu'>
          <span className='sk-menu-item menu-header bg-1 animated-bg' />
          <span className='sk-menu-item bg animated-bg w-60' />
          <span className='sk-menu-item bg animated-bg w-40' />
          <span className='sk-menu-item bg animated-bg w-60' />
          <span className='sk-menu-item bg animated-bg w-40' />
          <span className='sk-menu-item bg animated-bg w-40' />
          <span className='sk-menu-item bg animated-bg w-40' />
          <span className='sk-menu-item bg animated-bg w-40' />
        </div>

        <div className='sk-menu'>
          <span className='sk-menu-item menu-header bg-1 animated-bg' />
          <span className='sk-menu-item bg animated-bg w-60' />
          <span className='sk-menu-item bg animated-bg w-50' />
        </div>
        <div className='sk-button animated-bg w-90' />
      </div>

      <div className='bottom-part'>
        <div className='sk-menu'>
          <span className='sk-menu-item bg-1 animated-bg w-60' />
          <span className='sk-menu-item bg-1 animated-bg w-80' />
        </div>
      </div>

      <div className='horizontal-menu'>
        <span className='sk-menu-item bg animated-bg' />
        <span className='sk-menu-item bg animated-bg' />
        <span className='sk-menu-item bg animated-bg' />
        <span className='sk-menu-item bg animated-bg' />
        <span className='sk-menu-item bg animated-bg' />
        <span className='sk-menu-item bg animated-bg' />
      </div>
    </>
  );

  const horizontalLoader = (
    <>
      <div className='left-part d-flex align-items-center'>
        <span className='navbar-button bg animated-bg d-lg-none' />
        <span className='sk-logo bg animated-bg d-none d-lg-block' />
        <span className='search d-none d-md-block bg animated-bg' />
      </div>

      <div className='right-part d-flex align-items-center'>
        <div className='icon-box'>
          <span className='icon bg animated-bg' />
          <span className='badge' />
        </div>
        <span className='avatar bg animated-bg' />
      </div>
    </>
  );

  return (
    <div className={`navbar-skeleton ${type} ${loaded ? 'invisible' : ''}`}>
      {type === 'top-bar' ? horizontalLoader : verticalLoader}
    </div>
  );
};

export default NavLoader;
