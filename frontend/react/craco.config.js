const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#336cfb',
              '@link-color': '#64B5F6',
              '@success-color': '#b7ce63',
              '@warning-color': '#e9e165',
              '@error-color': '#ed5564',
              '@heading-color': '#1f2022',
              '@text-color': '#1f2022',
              '@border-radius-base': '6px',
              '@box-shadow-base': '0 18px 24px rgba(0,0,0,0.12)'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};