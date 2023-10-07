import React, { CSSProperties } from 'react';

import './Logo.scss';

type Props = {
  src: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
  style?: CSSProperties;
};

const Logo = ({ alt = '', height = 'auto', width = 'auto', src, style = {} }: Props) => {
  return (
    <div className='logo' style={style}>
      <img src={src} alt={alt} width={width} height={height} className='logo-img' />
    </div>
  );
};

export default Logo;
