
import React, { useCallback, useEffect, useState} from 'react';
import {Collapse, Button, Form, Input, DatePicker,} from 'antd';

import locale from 'antd/es/locale/zh_CN';

//single table
//import BlobTable from './BlobTable'

import ServiceTable from './ServiceTable'

const {Panel} = Collapse;
const {RangePicker} = DatePicker;

{/*This is search component and it include child component(table)*/}

function SearchBlob() {

  let[data, setData] = useState([])
  //点击搜索按钮触发的方法
  const searchData = useCallback(
    (values)=>{
      // debugger
      console.log(values)
      const name = values.use_case_id
      console.log("name:", name)
//      const url = 'http://localhost:30001/readFile?name='+ name
      const url = 'http://52.131.85.114:50001/index'
      fetch(url).then(res =>{
        if(res.ok){
            console.log("response:", res)
            res.json().then(data => {
                console.log("data:", data)
//                this.state.data = data
                setData(data)
            })
        }
      })
    },[]
  )

  const [form] = Form.useForm();
  const reset = ()=>{
    form.resetFields();
  }

  return (
    <div>
      <h1>用户列表</h1>
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
              label="服务名称"
              name="service_name"
            >
              <Input allowClear/>
            </Form.Item>
            {/*<Form.Item
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
              label="创建时间"
              name="create_time"
            >
              <RangePicker locale={locale}/>
            </Form.Item>*/}
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
      {/*single blob table
      <BlobTable data={data}/>*/}
      <ServiceTable data={data} />
    </div>
  );
}

export default SearchBlob;
