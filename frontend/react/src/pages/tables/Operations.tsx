import { Table, Button } from 'antd';
import React, { useState } from 'react';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  }
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  });
}

const Operations: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const start = () => {
    setLoading(false);

    setTimeout(() => {
      setSelectedRows([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = selectedRows => {
    setSelectedRows(selectedRows);
  };

  const rowSelection = {
    selectedRows,
    onChange: onSelectChange
  };
  const hasSelected = selectedRows.length > 0;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type='primary' onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRows.length} items` : ''}
        </span>
      </div>
      <Table
        pagination={{ pageSize: 5 }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default Operations;
