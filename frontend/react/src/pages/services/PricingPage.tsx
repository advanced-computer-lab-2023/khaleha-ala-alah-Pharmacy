import React from 'react';
import { IPageData } from '../../interfaces/page';
import { Button, Card } from 'antd';
import { IPricing } from '../../interfaces/pricing';
import { usePageData } from '../../hooks/usePage';
import { useGetPricing } from '../../hooks/useGetPricing';

const pageData: IPageData = {
  title: 'Pricing',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Apps',
      route: 'default-dashboard'
    },
    {
      title: 'Service pages',
      route: 'default-dashboard'
    },
    {
      title: 'Pricing'
    }
  ]
};

const PricingItem = ({ children, check = false }) => (
  <li className='d-flex align-items-center py-2 nowrap'>
    <span
      className={`mr-1 px-1 icofont-${check ? 'check' : 'close'}-circled`}
      style={{ color: '#8f8f90', fontSize: '1.4rem', lineHeight: '30px' }}
    />
    <span className='ml-1'>{children}</span>
  </li>
);

type PricingProps = {
  pricing: IPricing;
  type: 'primary' | 'default';
  accentColor?: string;
  className?: string;
  cardColor?: string;
  buttonColor?: string;
};

const Pricing = ({
  pricing,
  type = 'default',
  className,
  cardColor = '#fbfbfb',
  buttonColor = null
}: PricingProps) => {
  const {
    accounts,
    diskSpace,
    freeSupport,
    monthlyBandwith,
    price,
    subdomainsLimit,
    title
  } = pricing;

  const accentColor = type === 'primary' ? '#336cfb' : '#000';
  const button = (
    <Button type={type} className={`mb-3 ${buttonColor ? `bg-color-${buttonColor}` : ''}`} block>
      <span className={buttonColor ? 'text-color-500' : null}>Purchase now</span>
    </Button>
  );
  return (
    <Card
      title={title}
      className={`with-shadow  ${className || ''}`}
      style={{ textAlign: 'center', backgroundColor: cardColor }}
    >
      <div className='d-flex justify-content-center align-items-center'>
        <div className='mr-2' style={{ fontSize: 50, color: accentColor, lineHeight: '70px' }}>
          {price}
        </div>
        <div className='text-color-200'>
          <div style={{ fontSize: 20 }}>USD</div>
          <div>month</div>
        </div>
      </div>

      <hr className='my-4' />

      <ul className='list-unstyled text-left'>
        <PricingItem check>{diskSpace}GB Disk Space</PricingItem>

        <PricingItem check>{monthlyBandwith}GB Monthly Bandwith</PricingItem>

        <PricingItem check>{accounts} Email Accounts</PricingItem>

        <PricingItem check={subdomainsLimit}>Unlimited Subdomains</PricingItem>

        <PricingItem check={freeSupport}>Free support</PricingItem>
      </ul>

      {button}
    </Card>
  );
};

const PricingPage = () => {
  usePageData(pageData);
  const [personal, developers, premium] = useGetPricing();

  return (
    <>
      <div className='row'>
        <div className='col-sm-12 col-md-4'>
          <Pricing className='mb-md-0' buttonColor='success' pricing={personal} type='default' />
        </div>

        <div className='col-sm-12 col-md-4'>
          <Pricing
            type='primary'
            className='mb-md-0'
            pricing={developers}
            cardColor='rgb(246, 250, 253)'
          />
        </div>

        <div className='col-sm-12 col-md-4'>
          <Pricing
            className='mb-md-0 mb-0'
            buttonColor='success'
            pricing={premium}
            type='default'
          />
        </div>
      </div>
    </>
  );
};

export default PricingPage;
