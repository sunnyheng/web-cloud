
import React, { useCallback, useEffect, useState} from 'react';
import {Collapse, Button, Form, Input, DatePicker, Select, message} from 'antd';

import locale from 'antd/es/locale/zh_CN';

import BlobTable from './BlobTable'

const {Panel} = Collapse;
const {RangePicker} = DatePicker;

{/*This is search component and it include child component(table)*/}

function SearchBlob() {
  const ul = "http://20.239.59.174:30001"
  let[data, setData] = useState([])
  const [select_val, setSelectVal] = useState('ScenarioUser');
  let [type, setType] = useState('')
  //点击搜索按钮触发的方法
  const searchData = useCallback(
    (values)=>{
//      console.log(values)
//      console.log(values.type)
      let name = values.use_case_id
      let type = values.type
      setType(type)
      const url_single = ul +'/readFile?name='+name+'&type='+type
      const url_all = ul + '/readFile?type='+type

      const url = name? url_single: url_all
//      console.log("url:", url)
      fetch('/mock/data.json').then(res => {
      if(res.ok){
        res.json()
        .then(data =>{
          console.log('data:', data)
          setData(data)
        })
      }
    })

//      fetch(url).then(res =>{
//        console.log(res)
//        if(res.status==200){
//            message.success('success')
//            console.log("response:", res)
//            res.json().then(data => {
//                console.log('data:', data)
//                setData(data)
//            })
//        }
//        else{
//            message.error(res.statusText)
//            setData([])
//            }
//      })
//      .catch(err => {
//        console.log(err);
//        message.error(err)
//      })
    },[]
  )

  const [form] = Form.useForm();
  const reset = ()=>{
    form.resetFields();
  }

  const handleChange = (value: string) => {
      setSelectVal(value);
    };

  return (
    <div>
      <Collapse defaultActiveKey={['1']} style={{marginBottom:'20px'}}>
        <Panel header="搜索条件" key="1">
          <Form className="list"
                autoComplete="off"
                layout="inline"
                name="basic"
                form={form}
                initialValues={{remember: true}}
                onFinish={searchData}
          >
            <Form.Item
              label="场景名称"
              name="use_case_id"
            >
              <Input allowClear/>
            </Form.Item>
            <Form.Item
              label="用户"
              name="user_id"
            >
              <Input allowClear/>
            </Form.Item>
            <Form.Item
              label="VIN码"
              name="vin">
            <Input allowClear/>
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
            <Form.Item
              label="创建时间"
              name="create_time"
            >
              <RangePicker locale={locale}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button htmlType="submit" className="reset" onClick={reset}>
                重置
              </Button>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
      <BlobTable data={data} type={type}/>
    </div>
  );
}

export default SearchBlob;
