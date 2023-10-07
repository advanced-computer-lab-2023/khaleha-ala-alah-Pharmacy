import React from 'react';
import { Avatar, Button, Card } from 'antd';
import { FileDoneOutlined, PlusOutlined } from '@ant-design/icons/lib';
import { IDepartment } from '../../../interfaces/patient';

import './Department.scss';

type Props = { department: IDepartment; className?: string };

const Department = ({ department, className = '' }: Props) => (
  <>
    <Card
      className={`department ${className}`}
      cover={<img alt={`${department.title} avatar`} src={department.img} />}
    >
      <h3 className='h4 mt-0'>{department.title}</h3>

      <div className='team d-flex align-items-center mb-4'>
        <strong className='mr-3'>Team:</strong>

        {department.team.map((src, i) => (
          <Avatar className='avatar' src={src} key={i} />
        ))}
        <Button shape='circle' type='primary' icon={<PlusOutlined />} />
      </div>

      <p>{department.desc}</p>

      <div className='button-box pb-2'>
        <Button type='primary'>
          More <FileDoneOutlined className='ml-2' />
        </Button>
      </div>
    </Card>
  </>
);

export default Department;
