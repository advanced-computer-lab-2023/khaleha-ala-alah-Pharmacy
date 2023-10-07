import React from 'react';
import { IPageData } from '../../interfaces/page';

import Department from '../../layout/components/department/Department';

import { useFetchPageData, usePageData } from '../../hooks/usePage';
import { IDepartment } from '../../interfaces/patient';

const pageData: IPageData = {
  title: 'Departments',
  fulFilled: false,
  breadcrumbs: [
    {
      title: 'Medicine',
      route: 'default-dashboard'
    },
    {
      title: 'Departments'
    }
  ]
};

const Departments = () => {
  const [departments] = useFetchPageData<IDepartment[]>('./data/departments.json', []);
  usePageData(pageData);

  const depClass = (i, length) => {
    if (i === length - 1) {
      return 'mb-0';
    }

    if (i > length - 4) {
      return 'mb-md-0';
    }

    return '';
  };

  return (
    <div className='row'>
      {departments.map((dep, i) => (
        <div className='col-md-4 col-sm-12' key={i}>
          <Department department={dep} className={`white-bg ${depClass(i, departments.length)}`} />
        </div>
      ))}
    </div>
  );
};

export default Departments;
