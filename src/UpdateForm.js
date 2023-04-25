
import React, { useCallback, createContext, useState, useRef, useEffect } from 'react';
import {Collapse, Button, Form, Input, Select, message, Divider} from 'antd';

import { useLocation } from 'react-router-dom'

import locale from 'antd/es/locale/zh_CN';

import DataContext from './createContext'
import EditableDraggableTable from './EditableDraggableTable'

import TriggerForm from './TriggerForm'

const {Panel} = Collapse;
const {TextArea} = Input


{/*This is edit/update component and it include child component(table)*/}

function UpdateForm() {
  const childFormRef = useRef()
  const [form] = Form.useForm();
  let location = useLocation();

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
  let [uploadContent, setUploadContent] = useState([]);

// upload data format
  const resolveDataFormat = (e) => {
    let finalRe = {};
    let formValues = form.getFieldsValue();

//    console.log("=====================")
//    console.log(formValues)
//    console.log("=====================")
    if(triggerInData.length===0){
        message.error("Please save the trigger data, then upload data.")
    }
    else{

        let eventsJson = {};
        let actions_in = {};

        let events = [];
        triggerInData.map((item) => delete item.index);
        actions_in["actions"] = triggerInData
        const inForm = childFormRef.current.getTriggerForm()

        //todo add form data here
        let event_in = Object.assign(inForm, actions_in)
//        let event_in = actions_in
        events.push(event_in)
        if(triggerOutData.length!==0 &&triggerOutData.actions.length!==0){
            let actions_out = {};
//            triggerOutData.map((item) => delete item.index);
            actions_out["actions"] = triggerOutData
            // todo add form data here
    //        let event_in = Object.assign(formValues, actions)
            let event_out = actions_out
            events.push(event_out);
        }
        else{
            message.success("Success! Empty trigger out data.")
        }
        eventsJson["events"] = events
        finalRe = Object.assign(formValues, eventsJson)
//        setUploadContent(finalRe);
        console.log('finalRe:', finalRe)
//        console.log('uploadContent:', uploadContent)
        return finalRe;
    }
  }

  const uploadData = e =>{
    let result = resolveDataFormat(e);

    fetch('http://20.239.59.174:30001/upload',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(result)
    })
    .then(res => {
        console.log("123456789")
//        console.log(res)
        if(res.ok){
            res.json().then(data => {
                console.log("response data:", data)
                message.success("Uploaded scenario template: "+ data.file_name + " successfully.");
                let responseData = JSON.parse(data.content)
                parseData(responseData)
            })
        }
        else if(res.status === 400){
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
//    console.log("-----------------1", triggerInData)
    setInLength(actionsIn.length);
    let tmpInData = getFormData(events[0]);
    setTriggerInForm(tmpInData)
//    console.log("-----------------2", triggerInForm)

    if(events.length ===2){
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
      if(key !== "actions"){
        dataMap[key] = triggerJson[key];
      }
      if(key === "triggers"){
        let tmpArray = [];
        for(let i=0; i<triggerJson[key].length; i++){

        }
      }
    });
//    console.log("getFormData:", dataMap)
    return dataMap;
  }


  useEffect(() => {
    console.log('location:', location)
    console.log('location.state1:', location.state)
    let locState = location.state
    console.log('locState:', locState)
    if(locState && locState.dataList){
        let previewData = locState.dataList
        console.log('location.state.dataList:', location.state.dataList)
        parseData(previewData)
        location.state = {};
        console.log('location.state2:', location.state)
    }
  },[location])

  const cleanData = () => {

//    form.resetFields();
//    setTriggerInData([])
//
//    setTriggerOutData([])

  }

  const searchData = ()=>{
      let id = form.getFieldsValue().id
//  let bb = aa.
      console.log("id:", id)
      if(!id){
        message.warning("Please input id or name!")
      }
      else if(id){
        const type = 'ScenarioSquare';
        const url = 'http://20.239.59.174:30001/readFile1?type='+type+'&name='+ id
        fetch(url).then(res =>{
          if(res.ok){
            res.json().then(reData => {
                console.log("111111:", reData)
//                setUploadContent(reData)
                parseData(reData)
            })
          }
          else{message.error("Not found")}
        })
      }

//    fetch('/mock/data.json').then(res => {
//      if(res.ok){
//        res.json()
//        .then(data =>{
//            console.log('data:', data)
//          parseData(data)
//        })
//      }
//    })

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
//                onFinish={searchData}
                >
            <Form.Item
              label="场景编号(广场)"
              name="id"
              rules={[
                  {
                    required: true,
                    message: '不能为空',
                  },]}
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item
              label="场景名称(广场)"
              name="name"
              /*rules={[
                  {
                    required: true,
                    message: '不能为空',
                  },]}*/>
              <Input allowClear />
            </Form.Item>
            <Form.Item
                name="type"
                label="场景类型"
                /*rules={[
                  {
                    required: true,
                    message: '不能为空',
                  },]}*/ >
                <Select
                    placeholder="请选择"
                    options={[
                      {label:'预设',
                      value:1},
                      {label:'不可变',
                      value:0},
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
                    {label:'是',
                      value:true},
                      {label:'不是',
                      value:false},
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
                  },]}*/ >
                <Select
                    autosize="true"
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
            <Form.Item>
                <Button type="primary" htmlType="delete" onClick={cleanData}>清空</Button>
                <Button type="primary" htmlType="submit" onClick={searchData}>查询</Button>
                <Button style={{
                        marginLeft: 5,
                        }}
                    type="primary" htmlType="upload" onClick={uploadData}>上传</Button>
            </Form.Item>
            <Divider />
            <Form.Item
              label="描述"
              name="description"
              /*rules={[
                  {
                    required: true,
                    message: '不能为空',
                  },]}*/>
              <Input allowClear style={{width: 500}}/>
            </Form.Item>

          </Form>
        </Panel>
      </Collapse>

      <Divider orientation="left" plain>triggerIn</Divider>
      <TriggerForm dataSource={triggerInForm} setForm={handleInForm} ref={childFormRef} />
      <EditableDraggableTable dataSource={triggerInData} length={inLength} setData={handleTriggerIn} setLength={setDataInLength} />

      <Divider orientation="left" plain>triggerOut</Divider>

      <EditableDraggableTable dataSource={triggerOutData} length={outLength} setData={handleTriggerOut} setLength={setDataOutLength} />

    </div>
  );
}

export default UpdateForm;
