import React, { useState } from 'react';

import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

import { usePageData, useFetchPageData } from '../../hooks/usePage';
import { IPageData } from '../../interfaces/page';

import { worldMapOptions } from './worldMapOptions';

const pageData: IPageData = {
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
      title: 'World map'
    }
  ]
};

const mapUrl = './data/world.json';

const WorldMapPage = () => {
  const [mapOptions, setMapOptions] = useState(null);

  useFetchPageData(mapUrl, null, setOptions);
  usePageData(pageData);

  function setOptions(geoJson: any) {
    echarts.registerMap('HK', geoJson);
    setMapOptions(worldMapOptions);
  }

  return (
    <div className='full-height-page p-4'>
      {mapOptions ? (
        <ReactEcharts
          option={mapOptions}
          style={{ height: '100%', width: '100%' }}
          className='echarts-for-echarts'
        />
      ) : null}
    </div>
  );
};

export default WorldMapPage;
