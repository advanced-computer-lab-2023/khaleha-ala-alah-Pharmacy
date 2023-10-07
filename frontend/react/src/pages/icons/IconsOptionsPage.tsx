import React from 'react';

import { Card } from 'antd';
import
  Icon,
{
  BellOutlined,
  BookOutlined,
  BugOutlined,
  BulbOutlined,
  BuildOutlined,
  CalculatorOutlined,
  CalendarOutlined,
  CameraOutlined,
  CarOutlined,
  CarryOutOutlined,
  CloudOutlined,
  CodeOutlined,
  DislikeOutlined,
  EnvironmentOutlined,
  ExperimentOutlined,
  EyeOutlined,
  FileOutlined,
  FilterOutlined,
  FireOutlined,
  FlagOutlined,
  FolderOutlined,
  FolderOpenOutlined,
  BellFilled,
  BookFilled,
  BugFilled,
  BulbFilled,
  BuildFilled,
  CalculatorFilled,
  CalendarFilled,
  CameraFilled,
  CarFilled,
  CarryOutFilled,
  CloudFilled,
  CodeFilled,
  DislikeFilled,
  EnvironmentFilled,
  ExperimentFilled,
  EyeFilled,
  FileFilled,
  FilterFilled,
  FireFilled,
  FlagFilled,
  FolderFilled,
  FolderOpenFilled,
  BellTwoTone,
  BookTwoTone,
  BugTwoTone,
  BulbTwoTone,
  BuildTwoTone,
  CalculatorTwoTone,
  CalendarTwoTone,
  CameraTwoTone,
  CarTwoTone,
  CarryOutTwoTone,
  CloudTwoTone,
  CodeTwoTone,
  DislikeTwoTone,
  EnvironmentTwoTone,
  ExperimentTwoTone,
  EyeTwoTone,
  FileTwoTone,
  FilterTwoTone,
  FireTwoTone,
  FlagTwoTone,
  FolderTwoTone,
  FolderOpenTwoTone,
}
  from '@ant-design/icons';

import { IPageData } from '../../interfaces/page';
import { usePageData } from '../../hooks/usePage';

const outlinedIcons = [
  BellOutlined,
  BookOutlined,
  BugOutlined,
  BulbOutlined,
  BuildOutlined,
  CalculatorOutlined,
  CalendarOutlined,
  CameraOutlined,
  CarOutlined,
  CarryOutOutlined,
  CloudOutlined,
  CodeOutlined,
  DislikeOutlined,
  EnvironmentOutlined,
  ExperimentOutlined,
  EyeOutlined,
  FileOutlined,
  FilterOutlined,
  FireOutlined,
  FlagOutlined,
  FolderOutlined,
  FolderOpenOutlined,
];

const filledIcons = [
  BellFilled,
  BookFilled,
  BugFilled,
  BulbFilled,
  BuildFilled,
  CalculatorFilled,
  CalendarFilled,
  CameraFilled,
  CarFilled,
  CarryOutFilled,
  CloudFilled,
  CodeFilled,
  DislikeFilled,
  EnvironmentFilled,
  ExperimentFilled,
  EyeFilled,
  FileFilled,
  FilterFilled,
  FireFilled,
  FlagFilled,
  FolderFilled,
  FolderOpenFilled,
];

const twoToneIcons = [
  BellTwoTone,
  BookTwoTone,
  BugTwoTone,
  BulbTwoTone,
  BuildTwoTone,
  CalculatorTwoTone,
  CalendarTwoTone,
  CameraTwoTone,
  CarTwoTone,
  CarryOutTwoTone,
  CloudTwoTone,
  CodeTwoTone,
  DislikeTwoTone,
  EnvironmentTwoTone,
  ExperimentTwoTone,
  EyeTwoTone,
  FileTwoTone,
  FilterTwoTone,
  FireTwoTone,
  FlagTwoTone,
  FolderTwoTone,
  FolderOpenTwoTone,
];

const pageData: IPageData = {
  title: 'Icons options',
  fulFilled: true,
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
      title: 'Icons Options'
    }
  ]
};

const IconsOptionsPage = () => {
  usePageData(pageData);

  const displayIcons = (icons, props) => (
    <div className='elem-list'>
      {icons.map((icon, index) => (
        <Icon key={index} component={icon} {...props} />
      ))}
    </div>
  );

  const smallFZ = { fontSize: 16 };
  const mediumFZ = { fontSize: 20 };
  const largeFZ = { fontSize: 24 };

  return (
    <>
      <Card title='Default icons'>
        {displayIcons(outlinedIcons, null)}
      </Card>

      <Card title='Icon sizes'>
        <h6 className='section-title mt-0'>16px font size</h6>
        {displayIcons(outlinedIcons, { style: smallFZ })}

        <h6 className='section-title'>20px font size</h6>
        {displayIcons(outlinedIcons, { style: mediumFZ })}

        <h6 className='section-title'>24px font size</h6>
        {displayIcons(outlinedIcons, { style: largeFZ })}
      </Card>

      <Card title='Icon theme' className='mb-0'>
        <h6 className='section-title mt-0'>Outlined</h6>
        {displayIcons(outlinedIcons, { style: mediumFZ })}

        <h6 className='section-title'>Filled</h6>
        {displayIcons(filledIcons, { style: mediumFZ })}

        <h6 className='section-title'>Two tones</h6>
        {displayIcons(twoToneIcons, { style: mediumFZ })}
      </Card>
    </>
  );
};

export default IconsOptionsPage;
