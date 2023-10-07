import React from 'react';

import { useFetchPageData, usePageData } from '../../hooks/usePage';
import { IconWrap } from './IconWrap';
import { IPageData } from '../../interfaces/page';

const iconsUrl = '/data/icons-icofont.json';

const pageData: IPageData = {
  title: 'Icofont Icons',
  breadcrumbs: [
    {
      title: 'Home',
      route: 'dashboard'
    },
    {
      title: 'UI Kit ',
      route: 'dashboard'
    },
    {
      title: 'Icons SLI'
    }
  ]
};

const IcofontIconsPage = () => {
  usePageData(pageData);
  const [icons] = useFetchPageData<string[]>(iconsUrl, []);

  return (
    <>
      <div className='elem-list'>
        {icons.map((icon) => (
          <IconWrap style='simple' key={icon}>
            <span key={icon} className={icon} style={{ fontSize: 28 }} />
          </IconWrap>
        ))}
      </div>
    </>
  );
};

export default IcofontIconsPage;
