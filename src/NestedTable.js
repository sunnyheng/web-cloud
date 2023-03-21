import React, { useCallback, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import locale from 'antd/es/locale/zh_CN';

import {Collapse, Table, Button, Space, Form, Input, Select, DatePicker, Badge, Dropdown , message} from 'antd';

{/* This is publish page, show the detailed information in table and publish data to iothub(c2d)*/}

const items = [
  {
    key: '1',
    label: 'Action 1',
  },
  {
    key: '2',
    label: 'Action 2',
  },
];

const {Panel} = Collapse;
//const {Option} = Select;
const {RangePicker} = DatePicker;

const NestedTable = () => {

  let[data, setData] = useState([])
  const [form] = Form.useForm();
  const formValues = form.getFieldsValue();
//  let[expandData, setExpendData] = useState([])

  const expandedRowRender = (record) => {
    console.log("record.events:", record.events)
    const columns = [
      {
        title: '模块',
        dataIndex: 'feature',
        key: 'feature',
      },
      {
        title: '使能',
        dataIndex: 'enable',
        key: 'enable',
        render: () => (
          <span>
            <Badge enable="true" />
            开通功能
          </span>
        ),
      },
      {
        title: '是否恢复',
        dataIndex: 'recovery',
        key: 'recovery',
        render: () => (
          <span>
            <Badge enable="false" />
            不恢复
          </span>
        ),
      },
      {
        title: '参数',
        dataIndex: 'param',
        key: 'param',
      },
      {
        title: '发布',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Space size="middle">
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown
              menu={{
                items,
              }}
            >
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
    ];
    const nested_data = record.events[0].actions;
    return <Table columns={columns} dataSource={nested_data} pagination={false} rowKey={(nested_data, index)=>index} />;
  };
  const columns = [
    {
      title: '场景名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '用户名',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '更改时间',
      dataIndex: 'lastUpdatedTime',
      key: 'lastUpdatedTime',
    },
    {
      title: 'Action',
      key: 'operation',
      render: (text, record) => (
          <Space size="middle">
            <a onClick={(e)=>publish(record)}>Publish</a>
            <a>Publish All</a>
          </Space>
        ),
    },
  ];

  const publish = (record) => {
    fetch('http://localhost:30001/publish',{
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(record),
    }).then(res =>{
        if(res.ok){
            console.log("Published successfully.")
            message.success('Published successfully')
        }
        else{message.error("Failed to publish")}
    })
  };


  const searchData = useCallback(
    (values)=>{
      // debugger
      console.log(values)
      const name = values.use_case_id
      console.log("name:", name)
      const type = 'ScenarioSquare';
      const url = 'http://localhost:30001/readFile?type='+type+'&name='+ name
      fetch(url).then(res =>{
        if(res.ok){
            res.json().then(data => {
                console.log("data:", data)
                setData(data)
                message.success('success')
            })
        }
        else{message.error("Not found")}
      })
//      filter.mobile = values && values.mobile !== undefined ? values.mobile : '';
//      filter.nickname = values && values.nickname !== undefined ? values.nickname : '';
//      filter.channel_id = values && values.channel_id !== undefined ? values.channel_id : 0;
//      filter.tag_key = values && values.tag_key !== undefined ? values.tag_key : '';
//      if(values && values.create_time !== undefined){
//        let min_create_time = parseInt(moment(values.create_time[0]).valueOf()/1000);
//        let max_create_time = parseInt(moment(values.create_time[1]).valueOf()/1000);
//        filter.min_create_time = min_create_time;
//        filter.max_create_time = max_create_time;
//      }else{
//        filter.min_create_time = 0;
//        filter.max_create_time = 0;
//      }
    },[]
  )

  const reset = () => {
//    console.log("Testing get the form values:", formValues.use_case_id)
//    console.log("Testing get the form form.use_case_id:", form.use_case_id)
    form.resetFields();
    //此处尤其要注意，resetFields表单重置后会重新mount组件，因此不必在这里重新调用请求api的接口。
    //重置之后，会自动调用搜索列表的方法。
  }

  return (
    <div>
      <Collapse defaultActiveKey={['1']} style={{marginBottom:'20px'}} getContainer={false}>
        <Panel header="搜索条件" key="1">
          <Form className="list" autoComplete="off" layout="inline" name="wrap"
                form={form}
                initialValues={{remember: true}}
                onFinish={searchData} >
            <Form.Item label="场景名称" name="use_case_id">
              <Input allowClear/>
            </Form.Item>
            <Form.Item label="用户" name="user_id">
              <Input allowClear/>
            </Form.Item>
            <Form.Item label="VIN码" name="vin">
              <Input allowClear/>
            </Form.Item>
            <Form.Item label="创建时间" name="create_time">
              <RangePicker locale={locale}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button className="reset" onClick={reset}>重置</Button>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
      <Table
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        dataSource={data}
        rowKey={(data, index)=>index}
      />
    </div>
  );
};
export default NestedTable;