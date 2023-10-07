import React from 'react';

import Classes from './Avatar.module.scss';

type Props = {
  img: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
};

const Avatar = ({ img, size = 'md' }: Props) => (
  <div className={`${Classes.avatarBlock} avatar=${size} mr-5`}>
    <img src={img as string} alt={`${name} user photo`} />
  </div>
);

export default Avatar;
