import React from 'react';
import { Avatar, Button, Card, Rate, Tag, Timeline } from 'antd';
import { IPageData } from '../../interfaces/page';
import { usePageData } from '../../hooks/usePage';

const pageData: IPageData = {
  title: 'User profile',
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
      title: 'User profile'
    }
  ]
};

const UserPreview = () => {
  const userCover = `${window.origin}/content/user-profile.jpg`;
  const userAvatar = `${window.origin}/content/user-400-1.jpg`;

  return (
    <Card
      cover={<img src={userCover} alt='user-cover' />}
      className='personal-info-card with-shadow'
    >
      <div
        className='d-flex align-items-center justify-content-between'
        style={{ marginTop: '-50px' }}
      >
        <Avatar src={userAvatar} size={100} />

        <Button
          style={{
            backgroundColor: '#e91e63',
            borderRadius: 500,
            color: '#fff',
            border: 'none'
          }}
        >
          Subscribe
        </Button>
      </div>

      <div className='d-flex align-items-center justify-content-between'>
        <h5 className='mb-0 mt-0 mr-1'>Liam Jouns</h5>

        <Rate value={4} />
      </div>

      <p style={{ color: '#8f8f90' }}>UI/UX Designer</p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore enim, nemo nihil
        non omnis temporibus? Blanditiis culpa labore velit.Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Dicta, provident?
      </p>
    </Card>
  );
};

const Socials = () => {
  return (
    <Card className='with-shadow' title='Websites & social channel'>
      <div className='row align-items-center mb-3'>
        <div className='col col-auto'>
          <span className='icofont-github' style={{ fontSize: 30, color: '#24292e' }} />
        </div>
        <div className='col'>
          <div>Github</div>
          <a href='#' onClick={(e) => e.preventDefault()}>
            github.com/liam-jouns
          </a>
        </div>
      </div>

      <div className='row align-items-center mb-3'>
        <div className='col col-auto'>
          <span className='icofont-twitter' style={{ fontSize: 30, color: '#1da1f2' }} />
        </div>
        <div className='col'>
          <div>Twitter</div>
          <a href='#' onClick={(e) => e.preventDefault()}>
            twitter.com/liam-jouns
          </a>
        </div>
      </div>

      <div className='row align-items-center mb-3'>
        <div className='col col-auto'>
          <span className='icofont-linkedin' style={{ fontSize: 30, color: '#0073b1' }} />
        </div>
        <div className='col'>
          <div>LinkedIn</div>
          <a href='#' onClick={(e) => e.preventDefault()}>
            linkedin.com/liam-jouns
          </a>
        </div>
      </div>

      <div className='row align-items-center mb-3'>
        <div className='col col-auto'>
          <span className='icofont-youtube' style={{ fontSize: 30, color: '#ff0000' }} />
        </div>
        <div className='col'>
          <div>YouTube</div>
          <a href='#' onClick={(e) => e.preventDefault()}>
            youtube.com/liam-jouns
          </a>
        </div>
      </div>
    </Card>
  );
};

const ContactInfo = () => {
  return (
    <Card title='Contact information' className='mb-md-0 with-shadow'>
      <div className='row align-items-center mb-3'>
        <div className='col col-auto'>
          <span className='icofont-ui-touch-phone' style={{ fontSize: 30, color: '#8f8f90' }} />
        </div>
        <div className='col'>
          <div>Mobile</div>
          0126596578
        </div>
      </div>

      <div className='row align-items-center mb-3'>
        <div className='col col-auto'>
          <span className='icofont-slack' style={{ fontSize: 30, color: '#8f8f90' }} />
        </div>
        <div className='col'>
          <div>Slack</div>
          @liam.joun
        </div>
      </div>

      <div className='row align-items-center mb-3'>
        <div className='col col-auto'>
          <span className='icofont-skype' style={{ fontSize: 30, color: '#8f8f90' }} />
        </div>
        <div className='col'>
          <div>Skype</div>
          liam0jouns
        </div>
      </div>

      <div className='row align-items-center mb-3'>
        <div className='col col-auto'>
          <span className='icofont-location-pin' style={{ fontSize: 30, color: '#8f8f90' }} />
        </div>
        <div className='col'>
          <div>Current Address</div>
          71 Pilgrim Avenue Chevy Chase, MD 20815
        </div>
      </div>
    </Card>
  );
};

const Experience = ({items}) => {
  return (
    <Card title='Experience' className='with-shadow'>
      <Timeline items={items} />
    </Card>
  );
};

const Education = ({items}) => {
  return (
    <Card title='Education' className='with-shadow'>
      <Timeline items={items} />
    </Card>
  );
};

const Skills = () => {
  const skills = [
    'HTML',
    'PHP',
    'CSS',
    'SCSS',
    'ANGUlAR',
    'REACT',
    'VUE.JS',
    'JAVASCRIPT',
    'TYPESCRIPT'
  ];

  return (
    <Card title='Skills' className='with-shadow mb-0'>
      <div className='elem-list skills-list'>
        {skills.map((skill, i) => (
          <Tag
            key={i}
            color='#336cfb'
            style={{
              backgroundColor: 'transparent',
              borderColor: '#336cfb',
              borderRadius: 500,
              color: '#336cfb',
              fontSize: 12
            }}
          >
            {skill}
          </Tag>
        ))}
      </div>
    </Card>
  );
};
const UserProfilePage = () => {
  usePageData(pageData);

  const experienceItems = [
    {
      color: 'green',
      children: (
        <>
          <div style={{ opacity: 0.8 }} className='date w-100 mb-2'>
            20017 - Present
          </div>
          <span className='primary-text mb-4'>
            <strong>UI/UX Designers</strong> - IronSketch
          </span>
        </>
      )
    },
    {
      color: 'blue',
      children: (
        <>
          <div style={{ opacity: 0.8 }} className='date w-100 mb-2'>
            2015 - 2017
          </div>
          <span className='primary-text mb-4'>
            <strong>Art & Multimedia From</strong> - Oxford University
          </span>
        </>
      )
    },
    {
      color: 'red',
      children: (
        <>
          <div style={{ opacity: 0.8 }} className='date w-100 mb-2'>
            2013 - 2015
          </div>
          <span className='primary-text mb-4'>
            <strong>Web Designer</strong> - WebDev Company
          </span>
        </>
      )
    },
    {
      color: 'red',
      children: (
        <>
          <div style={{ opacity: 0.8 }} className='date w-100 mb-2'>
            2009 - 2013
          </div>
          <span className='primary-text mb-4'>
            <strong>UI/UX Designer</strong> - Design ArtData
          </span>
        </>
      )
    }
  ];
  const educationItems = [
    {
      color: 'red',
      children: (
        <>
          <div style={{ opacity: 0.8 }} className='date w-100 mb-2'>
            2008 - 2009
          </div>
          <span className='primary-text mb-4'>
            <strong>Special schools</strong> - Edison Schools
          </span>
        </>
      )
    },
    {
      color: 'red',
      children: (
        <>
          <div style={{ opacity: 0.8 }} className='date w-100 mb-2'>
            2007 - 2008
          </div>
          <span className='primary-text mb-4'>
            <strong>Technical schools</strong> - Jules E. Mastbaum Technical High School
          </span>
        </>
      )
    },
    {
      color: 'red',
      children: (
        <>
          <div style={{ opacity: 0.8 }} className='date w-100 mb-2'>
            2005 - 2007
          </div>
          <span className='primary-text mb-4'>
            <strong>High schools</strong> - Benjamin Franklin High School
          </span>
        </>
      )
    },
    {
      color: 'green',
      children: (
        <>
          <div style={{ opacity: 0.8 }} className='date w-100 mb-2'>
            1996 - 2004
          </div>
          <span className='primary-text mb-4'>
            <strong>Middle schools</strong> - Bethune, Mary Mcleod School
          </span>
        </>
      )
    }
  ];

  return (
    <div className='row'>
      <div className='col-md-6 col-sm-12'>
        <UserPreview />
        <Socials />
        <ContactInfo />
      </div>

      <div className='col-md-6 col-sm-12'>
        <Experience items={experienceItems} />
        <Education items={educationItems} />
        <Skills />
      </div>
    </div>
  );
};

export default UserProfilePage;
