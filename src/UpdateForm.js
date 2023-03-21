
import React, { useCallback, createContext, useState} from 'react';
import {Collapse, Button, Form, Input, Select, message, Divider} from 'antd';

import locale from 'antd/es/locale/zh_CN';

import DataContext from './createContext'
import EditableDraggableTable from './EditableDraggableTable'

import TriggerForm from './TriggerForm'

const {Panel} = Collapse;
const {TextArea} = Input



{/*This is edit/update component and it include child component(table)*/}

function UpdateForm() {

  const [form] = Form.useForm();

// this is trigger in data in event('confirmWhenAuto','triggerCondition','triggerType','triggers')
  let [triggerInForm, setTriggerInForm] = useState({})
// will called by children component(TriggerForm)
  const handleInForm = (inFormData) => setTriggerInForm(inFormData);

// this is trigger out data in event('confirmWhenAuto','triggerCondition','triggerType','triggers')
  let [triggerOutForm, setTriggerOutForm] = useState({})
// will called by children component(TriggerForm)
  const handleOutForm = (outFormData) => setTriggerOutForm(outFormData);

//  this is trigger in actions length, each of item like(category, enable, id, isSupport, needRecovery, param)
  let [inLength, setInLength] = useState(0)
  const setDataInLength = (length) => setInLength(length);

//  this is trigger out actions length, each of item like(category, enable, id, isSupport, needRecovery, param)
  let [outLength, setOutLength] = useState(0)
  const setDataOutLength = (length) => setOutLength(length);

//  this is trigger in actions in event[0], each of item like(category, enable, id, isSupport, needRecovery, param)
  let [triggerInData, setTriggerInData] = useState([])
// will called by children component(EditableDraggableTable)
  const handleTriggerIn = (triggerInData) => {
//    triggerInData.map((item) => delete item.index);
    setTriggerInData(triggerInData)
    console.log('father triggerInData:', triggerInData)
  }

//  this is trigger out actions in event[1], each of item like(category, enable, id, isSupport, needRecovery, param)
  let [triggerOutData, setTriggerOutData] = useState([])
// will called by children component(EditableDraggableTable)
  const handleTriggerOut = (triggerOutData) => {
    setTriggerOutData(triggerOutData)
    console.log('father triggerOutData:', triggerOutData)
  }

// the final data uploaded to azure blob
  let [uploadContent, setUploadContent] = useState('');

// upload data format
  const resolveDataFormat = () => {
    let formValues = form.getFieldsValue();
    if(triggerInData.length==0){
        message.error("Please save the trigger data, then upload data.")
    }
    else{
        let eventsJson = {};
        let events = [];
        triggerInData.actions.map((item) => delete item.index);
        events.push(triggerInData);
        if(triggerOutData.length!=0 &&triggerOutData.actions.length!=0){
            triggerOutData.actions.map((item) => delete item.index);
            events.push(triggerOutData);
        }
        else{
            message.success("Success! Empty trigger out data.")
        }
        eventsJson["events"] = events
        let finalRe = Object.assign(formValues, eventsJson)
        setUploadContent(finalRe);
        console.log('uploadContent:', uploadContent)
    }
  }

  const uploadData = e =>{
    resolveDataFormat();
    fetch('http://localhost:30001/upload',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(uploadContent)
    })
    .then(res => {
        console.log(res)
        if(res.ok){
            res.json().then(data => {
                message.success("Uploaded scenario template: "+ data.file_name + " successfully.");
            })
        }
        else if(res.status == 400){
          console.log('Uploaded data invalid.')
          message.error(res.statusText + ". Reason: Uploaded data invalid");
        }
        else{
          console.log('Server error. Cannot upload data')
          message.error(res.statusText + ". Reason: Failed to upload to azure blob.");
        }
    })
     .catch((err)=>{
      console.log(err);
     })
  }

  const addIndex = (tmpData) => {

    const newArr = tmpData.map((itm, index) =>{
        return {'index': index+1, ...itm}
    })
    console.log('initial trigger newArr:', newArr)
    return newArr;

  }

// show data format
  const parseData = (reData) => {
  // mock data
    let tmpData = reData[0]

//    let tmpData = reData
    let events = tmpData.events
    console.log('archive events:', events)

    form.setFieldsValue({
        id: tmpData.id,
        name: tmpData.name,
        description: tmpData.description,
        type: tmpData.type,
        enable: tmpData.enable,
        repeatTime: tmpData.repeatTime
    });

    let actionsIn = addIndex(events[0].actions);
    setTriggerInData(actionsIn);
    setInLength(actionsIn.length);
    let tmpInData = getFormData(events[0]);
    setTriggerInForm(tmpInData)

    if(events.length ==2){
      let actionsOut = addIndex(events[1].actions);
      setTriggerOutData(actionsOut);
      setInLength(actionsOut.length);
      let tmpOutData = getFormData(events[1]);
      setTriggerOutForm(tmpOutData)
    }
  }

  const getFormData = (triggerJson) =>{
    let dataMap = {};
    Object.keys(triggerJson).forEach(function(key) {
      if(key != "actions"){
        dataMap[key] = triggerJson[key];
      }
      if(key == "triggers"){
        let tmpArray = [];
        for(let i=0; i<triggerJson[key].length; i++){

        }
      }
    });
    console.log("getFormData:", dataMap)
    return dataMap;
  }

  const searchData = (values)=>{
//      let id = values.id;
//      let name = values.name;
//      console.log("id:", id)
//      if(!id && !name){
//        message.warning("Please input id or name!")
//      }
//      else if(id){
//        const type = 'ScenarioSquare';
//        const url = 'http://localhost:30001/readFile?type='+type+'&name='+ id
//        fetch(url).then(res =>{
//          if(res.ok){
//            res.json().then(reData => {
//                parseData(reData)
//            })
//          }
//          else{message.error("Not found")}
//        })
//      }

    fetch('/mock/data.json').then(res => {
      if(res.ok){
        res.json()
        .then(data =>{
            console.log('data:', data)
          parseData(data)
        })
      }
    })

    }


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
              label="模板编号"
              name="id" >
              <Input allowClear />
            </Form.Item>
            <Form.Item
              label="模板名称"
              name="name" >
              <Input allowClear />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{
                        marginLeft: 5,
                        }}
                    type="primary" htmlType="upload" onClick={uploadData}>上传</Button>
            </Form.Item>
            <Divider />
            <Form.Item
              label="描述"
              name="description" >
              <Input allowClear />
            </Form.Item>
            <Form.Item
                name="type"
                label="类型"
                /*rules={[
                  {
                    required: true,
                    message: '不能为空',
                  },]}*/ >
                <Select
                    placeholder="请选择"
                    options={[
                      {label:'不可变数据',
                      value:0},{label:'预设数据',
                      value:1},
                    ]}
                />
            </Form.Item>
            <Form.Item
                name="enable"
                label="是否可用"
                /*rules={[
                  {
                    required: true,
                    message: '不能为空',
                  },]}*/ >
                <Select
                    placeholder="请选择"
                    options={[
                      {label:'不是',
                      value:false},{label:'是',
                      value:true},
                    ]}
                />
            </Form.Item>
            <Form.Item
                name="repeatTime"
                label="重复次数"
                /*rules={[
                  {
                    required: true,
                    message: '不能为空',
                  },]} */>
                <Select
                    placeholder="请选择"
                    options={[
                    {label:'满足条件执行',
                      value:-1},
                      {label:'不执行',
                      value:0},{label:'执行1次',
                      value:1},
                      {label:'执行2次',
                      value:2},
                    ]}
                />
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>

      <Divider orientation="left" plain>triggerIn</Divider>
      <TriggerForm dataSource={triggerInForm} setForm={handleInForm} />
      <EditableDraggableTable dataSource={triggerInData} length={inLength} setData={handleTriggerIn} setLength={setDataInLength} />

      <Divider orientation="left" plain>triggerOut</Divider>
      <TriggerForm dataSource={triggerOutForm} setForm={handleOutForm} />
      <EditableDraggableTable dataSource={triggerOutData} length={outLength} setData={handleTriggerOut} setLength={setDataOutLength} />

    </div>
  );
}

export default UpdateForm;
