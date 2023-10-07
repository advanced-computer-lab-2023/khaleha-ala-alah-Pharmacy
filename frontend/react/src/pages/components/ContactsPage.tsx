import React from 'react';

import { useFetchPageData, usePageData } from '../../hooks/usePage';

import Contact from '../../layout/components/doctor/Contact';
import className from '../../utils/class-names';

import { IUser } from '../../interfaces/user';
import { IPageData } from '../../interfaces/page';

const pageData: IPageData = {
  fulFilled: false,
  title: 'Contacts',
  breadcrumbs: [
    {
      title: 'UI Kit',
      route: 'default-dashboard',
    },
    {
      title: 'Components',
      route: 'default-dashboard',
    },
    {
      title: 'Contacts',
    },
  ],
};

const ContactsPage = () => {
  const [users] = useFetchPageData<IUser[]>('data/contacts.json', []);
  usePageData(pageData);

  const getClass = (index: number, length: number) =>
    className({
      'mb-0': index === length - 1,
      'mb-md-0': index === length - 2 || index === length - 3,
    });

  return (
    <div className='row'>
      {users.map((user, index) => (
        <div key={index} className='col-sm-12 col-md-6 col-lg-4'>
          <Contact className={getClass(index, users.length)} {...user} />
        </div>
      ))}
    </div>
  );
};

export default ContactsPage;
