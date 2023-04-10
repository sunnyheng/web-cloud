import React, { useCallback, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import locale from 'antd/es/locale/zh_CN';

import {Collapse, Table, Button, Space, Form, Input, Select, DatePicker, Badge, Dropdown , message} from 'antd';
import BlobTable from './BlobTable'
{/* This is publish page, show the detailed information in table and publish data to iothub(c2d)*/}

var FileSaver = require('file-saver');

const {Panel} = Collapse;
//const {Option} = Select;
const {RangePicker} = DatePicker;

const NestedTable = () => {
    const [select_val, setSelectVal] = useState('ScenarioSquare');
  let [type, setType] = useState('')
  let[data, setData] = useState([])
  const [form] = Form.useForm();
  const formValues = form.getFieldsValue();
//  let[expandData, setExpendData] = useState([])

  const DetailedTable = (record) => {

//    let type = props.type

      const columns = [
      {
        title: '场景ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '场景名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: '更改时间',
        dataIndex: 'lastUpdatedTime',
        key: 'lastUpdatedTime',
      },
      {
        title: '预览',
        dataIndex: 'download',
        key: 'download',
        render: (text, record) => <a onClick={(e)=>download(record)}>预览</a>,
      },
      {
      title: '发布',
      key: 'publish',
      render: (text, record) => (
          <Space size="middle">
            <a onClick={(e)=>publishToUser(record)}>下发用户</a>
            <a disabled onClick={(e)=>publishToSquare(record)}>下发广场</a>
          </Space>
        ),
    },
//      {
//      title: '删除',
//      key: 'delete',
//      render: (text, record) => (
//          <Space size="delete">
//            <a onClick={(e)=>delRecord(record)}>删除</a>
//          </Space>
//        ),
//    },
    ]

    const publishToUser = (record) =>{
        fetch('http://20.239.59.174:30001/publish_user',{
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
    }

    const publishToSquare = (record) =>{
        fetch('http://20.239.59.174:30001/publish_square',{
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
    }

    const delRecord = (record) =>{
        console.log('id:', record.id)
        console.log('delete type:', type)
        let url = 'http://20.239.59.174:30001/delete'+'?id=' +record.id+ '&type='+type
        fetch(url,{
        method:'DELETE',
        }).then(res =>{
            if(res.ok){
                console.log("Delete successfully.")
                message.success('Delete successfully')
            }
            else{message.error("Failed to publish")}
        })

    }

    const download = (record) => {
        let name = record.name;
        let timestamp = Date.parse(new Date());
        let fileName = name + "_" + timestamp + ".json"

        let content = JSON.stringify(record)
        let blob = new Blob([content], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, fileName);

    };
    return (
      <>
        <Table
            columns={columns}
            expandable={{
                expandedRowRender: (record) => (
                    <p style={{
                        margin: 0,
                      }}>
                      {JSON.stringify(record)}
                    </p>
                ),
            }}
            dataSource={data}
            rowKey={record=>record.id}
        />
      </>
    );
//    const nested_data = record.events[0].actions;

  };


  const publish = (record) => {
    fetch('http://20.239.59.174:30001/publish',{
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

  const handleChange = (value: string) => {
      setSelectVal(value);
  };

  const searchData = useCallback(
    (values)=>{
      // debugger
      console.log(values)
      const name = values.use_case_id
      console.log("name:", name)
      const type = 'ScenarioSquare';
      const url = 'http://20.239.59.174:30001/readFile?type='+type+'&name='+ name
      fetch(url).then(res =>{
        if(res.ok){
            res.json().then(data => {
                console.log("data:", data)
                setData(data)
                message.success('success')
            })
        }
        else{
            message.error("Not found")
            setData([])
        }
      })
    },[]
  )

  const reset = () => {
    form.resetFields();

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
            <Form.Item
              label="数据类型"
              name="type"
              initialValue={select_val}>
              <Select
                style={{ width: 180 }}
                onChange={handleChange}
                options={[
                  { value: 'ScenarioSquare', label: '广场模版数据' },
                  { value: 'ScenarioUser', label: '用户自定义场景' },
                ]}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button className="reset" onClick={reset}>重置</Button>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
      <DetailedTable
        dataSource={data}
        rowKey={data=>data.id}
      />
    </div>
  );
};
export default NestedTable;