import React, { useState } from 'react';

import { Avatar, Card, Skeleton, Switch } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import { usePageData } from '../../hooks/usePage';
import { IPageData } from '../../interfaces/page';

const { Meta } = Card;

const tabList = [
  {
    key: 'tab1',
    tab: 'Tab1'
  },
  {
    key: 'tab2',
    tab: 'Tab2'
  }
];

const contentList = {
  tab1: <p>Content1</p>,
  tab2: <p>Content2</p>
};

const tabListNoTitle = [
  {
    key: 'article',
    tab: 'Article'
  },
  {
    key: 'app',
    tab: 'App'
  },
  {
    key: 'project',
    tab: 'Project'
  }
];

const contentListNoTitle = {
  article: <p>Article content</p>,
  app: <p>App content</p>,
  project: <p>Project content</p>
};

const pageData: IPageData = {
  title: 'Cards',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'UI Kit',
      route: 'default-dashboard'
    },
    {
      title: 'Components',
      route: 'default-dashboard'
    },
    {
      title: 'Cards'
    }
  ]
};

const CardsPage = () => {
  usePageData(pageData);

  const [loading, setLoading] = useState<boolean>(true);
  const [noTitleKey, setNoTitleKey] = useState('app');
  const [key, setKey] = useState('tab1');

  const onTabChange = (setter: (val: string) => void) => (key: string) => {
    setter(key);
  };

  return (
    <>
      <h4 className='section-title mt-0'>Simple cards</h4>

      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <Card title='With title'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore enim, nemo
            nihil non omnis temporibus? Blanditiis culpa labore velit.Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Dicta, provident?
          </Card>
        </div>

        <div className='col-md-6 col-sm-12'>
          <Card>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore enim, nemo
              nihil non omnis temporibus? Blanditiis culpa labore velit.Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Dicta, provident?
            </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, reprehenderit.</p>
          </Card>
        </div>
      </div>

      <h4 className='section-title'>Colored cards</h4>

      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <Card className='bg-color-500' title='Accent'>
            <p className='text-contrast-500'>
              Standard card. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
              dolore enim, nemo nihil non omnis temporibus? Blanditiis culpa labore velit.Lorem
              ipsum dolor sit amet, consectetur adipisicing elit. Dicta, provident?
            </p>
          </Card>
        </div>

        <div className='col-md-6 col-sm-12'>
          <Card className='bg-color-info' title='Info'>
            <p className='text-contrast-500'>
              Standard card. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
              dolore enim, nemo nihil non omnis temporibus? Blanditiis culpa labore velit.Lorem
              ipsum dolor sit amet, consectetur adipisicing elit. Dicta, provident?
            </p>
          </Card>
        </div>

        <div className='col-md-6 col-sm-12'>
          <Card className='bg-color-success' title='Success'>
            <p className='text-contrast-500'>
              Standard card. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
              dolore enim, nemo nihil non omnis temporibus? Blanditiis culpa labore velit.Lorem
              ipsum dolor sit amet, consectetur adipisicing elit. Dicta, provident?
            </p>
          </Card>
        </div>

        <div className='col-md-6 col-sm-12'>
          <Card className='bg-color-warning' title='Warning'>
            <p className='text-contrast-500'>
              Standard card. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
              dolore enim, nemo nihil non omnis temporibus? Blanditiis culpa labore velit.Lorem
              ipsum dolor sit amet, consectetur adipisicing elit. Dicta, provident?
            </p>
          </Card>
        </div>

        <div className='col-md-6 col-sm-12'>
          <Card className='bg-color-error' title='Error'>
            <p className='text-contrast-500'>
              Standard card. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
              dolore enim, nemo nihil non omnis temporibus? Blanditiis culpa labore velit.Lorem
              ipsum dolor sit amet, consectetur adipisicing elit. Dicta, provident?
            </p>
          </Card>
        </div>

        <div className='col-md-6 col-sm-12'>
          <Card className='bg-color-orange' title='Custom'>
            <p className='text-contrast-500'>
              Standard card. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
              dolore enim, nemo nihil non omnis temporibus? Blanditiis culpa labore velit.Lorem
              ipsum dolor sit amet, consectetur adipisicing elit. Dicta, provident?
            </p>
          </Card>
        </div>
      </div>

      <h4 className='section-title'>With tabs</h4>

      <Card
        style={{ width: '100%' }}
        title='Card title'
        extra={<a href='#'>More</a>}
        tabList={tabList}
        activeTabKey={key}
        onTabChange={onTabChange(setKey)}
      >
        {contentList[key]}
      </Card>

      <Card
        style={{ width: '100%' }}
        tabList={tabListNoTitle}
        activeTabKey={noTitleKey}
        onTabChange={onTabChange(setNoTitleKey)}
      >
        {contentListNoTitle[noTitleKey]}
      </Card>

      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <h4 className='section-title'>Content loading</h4>

          <Card className='bg-color-white mb-5' loading={loading} style={{ maxWidth: 450 }}>
            <p>
              Suspendisse lobortis dapibus nibh eu tincidunt. Nam egestas molestie purus vel
              suscipit.Donec viverra congue nisl vitae lobortis. Mauris neque eros, sollicitudin id
              consequat eget, ultricies at velit.
            </p>
          </Card>

          <Card
            className='bg-color-white'
            actions={[<SettingOutlined />, <EditOutlined />, <EllipsisOutlined />]}
            style={{ maxWidth: 450 }}
          >
            <Skeleton loading={loading} avatar active className='mb-2'>
              <Meta
                className='mb-2 p-2'
                avatar={<Avatar src='./content/user-40-4.jpg' />}
                title='Card title'
                description='This is the description'
              />
              <p className='mb-2'>
                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                himenaeos, lobortis dapibus nibh.
              </p>
            </Skeleton>
          </Card>

          <Switch checked={!loading} onChange={() => setLoading(!loading)} />
        </div>

        <div className='col-md-6 col-sm-12'>
          <h4 className='section-title'>Custom content configuration</h4>

          <Card
            className='mb-0 bg-color-white p-0'
            style={{ maxWidth: 450 }}
            cover={<img alt='example' src='./content/bg-card-1.jpg' />}
            actions={[<SettingOutlined />, <EditOutlined />, <EllipsisOutlined />]}
          >
            <Meta
              className='p-2'
              avatar={<Avatar src='./content/user-40-4.jpg' />}
              title='Card title'
              description='This is the description'
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default CardsPage;
