import React, { useState, useImperativeHandle } from 'react';
import { Form, Input, Cascader, Select, Button } from 'antd';


function TriggerForm(props){
  const [form] = Form.useForm();
//  let [formData] = useState(props.dataSource)
//  console.log('TriggerForm data:', props.childData)

//  useEffect(() => {
//    form.setFieldsValue({
//        triggerType: props.dataSource.triggerType,
//        confirmWhenAuto: props.dataSource.confirmWhenAuto,
//        triggers: props.dataSource.triggers,
//        triggerCondition: props.dataSource.triggerCondition,
//    })
//
//  },[])


  form.setFieldsValue({
        triggerType: props.dataSource.triggerType,
        confirmWhenAuto: props.dataSource.confirmWhenAuto,
        triggers: props.dataSource.triggers,
        triggerCondition: props.dataSource.triggerCondition,
    })

  const triggerOptions = [
                {
                    label:'日期触发',
                    value:11,
                    children:[
                      {value:1, label:'Sunday'},
                      {value:2, label:'Monday'},
                      {value:4, label:'Tuesday'},
                      {value:8, label:'Wednesday'},
                      {value:16, label:'Thursday'},
                      {value:32, label:'Friday'},
                      {value:64, label:'Saturday'},
                    ]
                },
                {label:'时间触发', value:12},
                {label:'系统进入运行时触发', value:101},
                {label:'驾驶员侧窗户开启', value:111},
                {label:'驾驶员侧窗户关闭', value:112},
                {label:'乘客侧窗户开启', value:113},
                {label:'乘客侧窗户关闭', value:114},
                {label:'检测下雨时触发', value:131},
  ];

//  const testSearch1 = async (props) => {
//
//        const row = await form.validateFields();
//        let formValues = form.getFieldsValue();
//        let triggers = formValues['triggers']
////        console.log('triggers:', triggers)
//        const newTriggers = [];
//        triggers.map((item, index) => {
//            let tmpDict = {};
//            if(item.length ==1){
//                tmpDict['id']=item[0]
//                newTriggers.push(tmpDict)
//            }
//            if(item.length ==2){
//                tmpDict['id']=item[0]
//                tmpDict['param']=item[1]
//                newTriggers.push(tmpDict)
//            }
//        })
////        console.log('newTrigger:', newTriggers)
//        formValues['triggers'] = newTriggers
//        console.log('formValue:', formValues)
//        return formValues;
//
//
//  }

//  useImperativeHandle(ref, () => ({
//    async testSearch(){
//
//      try{
//        if(props.dataSource.length > 0){
//            const row = await form.validateFields()
//
//            let formValues = form.getFieldsValue();
//            let triggers = formValues['triggers']
//    //        console.log('triggers:', triggers)
//            const newTriggers = [];
//            if(triggers){
//                triggers.map((item, index) => {
//                    let tmpDict = {};
//                    if(item.length ==1){
//                        tmpDict['id']=item[0]
//                        newTriggers.push(tmpDict)
//                    }
//                    if(item.length ==2){
//                        tmpDict['id']=item[0]
//                        tmpDict['param']=item[1]
//                        newTriggers.push(tmpDict)
//                    }
//                })
//            }
//    //        console.log('newTrigger:', newTriggers)
//            formValues['triggers'] = newTriggers
//    //        console.log('formValue:', formValues)
//            return formValues;
//        }
//      }catch(e){
//        console.log('error:', e)
//        return '';
//      }
//  }
//  }));

  const test = () =>{
    let triggerValues = form.getFieldsValue();
    console.log('triggerValues:', triggerValues)
  }

  return (
    <Form
        layout="inline"
        form={form}

        name="trigger_form"
        style={{
          marginBottom: 10,
        }}>
      <Form.Item
        name="triggerType"
        label="触发类型"
        rules={[
          {
            required: true,
            message: '不能为空',
          },]} >
        <Select

            placeholder="请选择"
            options={[
              {label:'自动触发',
              value:0},{label:'手动触发',
              value:1},
            ]}
        />
      </Form.Item>
      <Form.Item
        name="confirmWhenAuto"
        label="是否二次确认"
        rules={[
          {
            required: true,
            message: '不能为空',
          },]}
        >
        <Select
            allowClear
            placeholder="请选择"
            style={{ width: 150,}}
            options={[
                {label: "手动确认触发",
                value: "true",},
                {label: "不用确认",
                value: "false",}
            ]}
        />
      </Form.Item>
      <Form.Item
        name="triggers"
        label="触发条件"
        rules={[
          {
            required: true,
            message: '不能为空',
          },]} >
        <Cascader
            multiple
            allowClear
            placeholder="请选择"
            options={triggerOptions}
            style={{ width: 150,}}
        />
      </Form.Item>
      <Form.Item
        name="triggerCondition"
        label="触发关系"
        rules={[
          {
            required: true,
            message: '不能为空',
          },]}
      >
        <Select
            allowClear
            placeholder="请选择"
            style={{ width: 150,}}
            options={[
                {label:'单个满足',
                value:'OR'},{label:'同时满足',
                value:'AND'},
            ]}
        />
      </Form.Item>
      <Button
        onClick={test}
        type="primary">save</Button>
    </Form>
  );

};

export default TriggerForm;