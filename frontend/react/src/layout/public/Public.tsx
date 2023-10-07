import React, { ReactNode } from 'react';
import './Public.scss';
import Logo from '../components/logo/Logo';
import LogoSvg from '../../assets/img/logo.svg';

type Props = { children: ReactNode; bgImg?: string; transparent?: boolean };

const PublicLayout = ({ children, bgImg, transparent = false }: Props) => (
  <div className='public-layout' style={{ backgroundImage: `url(${bgImg})` }}>
    <div className={`content-box ${transparent ? 'transparent' : null}`}>
      <div className='content-header'>
        <Logo src={LogoSvg} />
      </div>
      <div className='content-body'>{children}</div>
    </div>
  </div>
);

export default PublicLayout;
