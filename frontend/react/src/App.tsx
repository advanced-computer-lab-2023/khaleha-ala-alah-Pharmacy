import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ConfigProvider from 'antd/es/config-provider';
import VerticalLayout from './layout/vertical/Vertical';
import HorizontalLayout from './layout/horizontal/Horizontal';
import NotFound from './pages/sessions/404';
import { defaultRoutes, sessionRoutes } from './routing';
import { useHideLoader } from './hooks/useHideLoader';
import './App.scss';

const LayoutRoutes = ({ routes, layout = '' }) => (
  <Routes>
    {routes.map((route, index) => (
      <Route key={index} path={`/${route.path}`} element={<route.component />} />
    ))}

    <Route path='*' element={<Navigate replace to='/public/page-404' />} />
  </Routes>
);

const DefaultRoutes = ({ layout }) => <LayoutRoutes routes={defaultRoutes} layout={layout} />;

const SessionRoutes = () => <LayoutRoutes routes={sessionRoutes} layout='public' />;

const App = () => {
  useHideLoader();

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "'Lato', sans-serif",
        },
      }}
    >
      <Routes>
        <Route path='/' element={<Navigate replace to='/vertical/default-dashboard' />} />

        <Route path='/public/*' element={<SessionRoutes />} />

        <Route path='/horizontal/*' element={<HorizontalLayout><DefaultRoutes layout='horizontal' /></HorizontalLayout>} />

        <Route path='/vertical/*' element={<VerticalLayout><DefaultRoutes layout='vertical' /></VerticalLayout>} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </ConfigProvider>
  );
};

export default App;
