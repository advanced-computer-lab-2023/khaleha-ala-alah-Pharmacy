import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'antd';

import { IUser } from '../../../interfaces/user';

import './Contact.scss';

type OwnProps = {
  className?: string;
};

type Props = IUser & OwnProps;

const Contact = ({ address, img, name, role, social, className, profileLink }: Props) => {
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    navigate(`../${profileLink}`);
  };

  return (
    <div className={`contact ${className}`}>
      <div className='img-box'>
        <img width='400' src={img as string} height='400' alt='avatar' />
      </div>

      <div className='info-box'>
        <h4 className='name'>{name}</h4>

        <p className='role'>{role}</p>

        <div className='social'>
          {social &&
            social.map((item, index) => (
              <a key={index} href={item.link} className={`link ${item.icon}`} />
            ))}
        </div>

        <p className='address'>{address}</p>

        <div className='button-box'>
          <Button type='primary' onClick={handleGoToProfile}>
            View profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
