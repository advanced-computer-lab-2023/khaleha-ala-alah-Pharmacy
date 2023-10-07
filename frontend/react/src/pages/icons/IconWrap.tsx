import React from 'react';

export const IconWrap = ({ children, style = 'default' }) => (
  <div className={`icon-wrap ${style}`}>{children}</div>
);
