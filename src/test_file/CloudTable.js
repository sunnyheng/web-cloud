import React, { Component } from 'react';
import { Table } from 'antd';


class CloudTable extends Component{
    render(){
        const columns = [
      {
        title: 'Category',
        dataIndex: 'category',
        filters: [
          {
            text: 'Joe',
            value: 'Joe',
          },
          {
            text: 'Category 1',
            value: 'Category 1',
          },
          {
            text: 'Category 2',
            value: 'Category 2',
          },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.name.startsWith(value),
        width: '30%',
      },
      {
        title: 'Service Id',
       dataIndex: 'service_id',
      },
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Enable',
        dataIndex: 'enable',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'MinAdjustValue',
        dataIndex: 'minadjustvalue',
      },
      {
        title: 'MaxAdjustValue',
        dataIndex: 'maxadjustvalue',
      },
      {
        title: 'Accuracy',
        dataIndex: 'accuracy',
      },
    ];
        const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
      },
    ];

        const onChange = (pagination, filters, sorter, extra) => {
            console.log('params', pagination, filters, sorter, extra);
        };

        return (
            <Table columns={columns} dataSource={data} onChange={onChange} />
            );
    }
}

export default CloudTable;