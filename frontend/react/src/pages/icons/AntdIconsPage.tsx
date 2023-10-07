import * as React from 'react';

import * as AntdIcons from '@ant-design/icons';

import { IconWrap } from './IconWrap';
import { usePageData } from '../../hooks/usePage';

import { IPageData } from '../../interfaces/page';

import { categories, CategoriesKeys } from './antd-icons';

export enum ThemeType {
  Filled = 'Filled',
  Outlined = 'Outlined',
  TwoTone = 'TwoTone'
}

const Category = ({ icons, title }) => {
  const categoryTitle = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <div>
      <h4 className='section-title mb-4'>{categoryTitle}</h4>

      <div className='row'>
        {icons.map(({ icon, name }, i) => {

          return (
            <div className='col-lg-2 col-md-3 col-sm-4 col-6' key={i}>
              <IconWrap>
                {React.createElement(allIcons[icon])}
                <span className='selector'>{name}</span>
              </IconWrap>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const allIcons: {
  [key: string]: any;
} = AntdIcons;

const pageData: IPageData = {
  title: 'Ant icons',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Home',
      route: 'default-dashboard'
    },
    {
      title: 'UI Kit ',
      route: 'default-dashboard'
    },
    {
      title: 'Ant icons'
    }
  ]
};

const AntdIconsPage = () => {
  usePageData(pageData);
  const theme = ThemeType.Outlined;

  return (
    <>
      {Object.keys(categories)
        .map((key) => {
          const iconList = categories[key];

          return {
            category: key,
            icons: iconList
              .map((iconName) => ({ icon: iconName + theme, name: iconName }))
              .filter(({ icon }) => allIcons[icon])
          };
        })
        .map(({ category, icons }) => (
          <Category key={category} title={category as CategoriesKeys} icons={icons} />
        ))}
    </>
  );
};

export default AntdIconsPage;
