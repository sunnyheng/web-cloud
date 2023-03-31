import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Form, Input, Cascader, Select, Button } from 'antd';

const {TextArea} = Input

function SubForm(props, ref){
  const [form] = Form.useForm();
  const formRef = useRef();
//  let [formData] = useState(props.dataSource)
//  console.log('TriggerForm data:', props.childData)


    useEffect(() => {
        form.setFieldsValue({
            triggerType: props.dataSource.triggerType,
            confirmWhenAuto: props.dataSource.confirmWhenAuto,
            triggers: props.dataSource.triggers,
            triggerCondition: props.dataSource.triggerCondition,
            actionDescription: props.dataSource.actionDescription,
            durationTime: props.dataSource.durationTime
        })
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
                {label:'低光束输出灯开', value:141},
                {label:'低光束输出灯关', value:142},
                {label:'刹车灯开', value:143},
                {label:'刹车灯关', value:144},
                {label:'高光束输出灯开', value:145},
                {label:'低光束输出灯关', value:146},
                {label:'制动踏板启动', value:201},
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

const test = ()=>{
console.log("======================")
console.log(form.getFieldsValue())
}

  useImperativeHandle(ref, () => ({
//  formFields: form.getFieldsValue()
    getTriggerForm(){

        let formValues = form.getFieldsValue();
         console.log('formValue123:', form.getFieldsValue())
        let triggers = formValues['triggers']
//        console.log('triggers:', triggers)
        const newTriggers = [];
        if(triggers){
            triggers.map((item, index) => {
                let tmpDict = {};
                if(item.length ==1){
                    tmpDict['id']=item[0]
                    newTriggers.push(tmpDict)
                }
                if(item.length ==2){
                    tmpDict['id']=item[0]
                    tmpDict['param']=item[1]
                    newTriggers.push(tmpDict)
                }
            })
        }
        console.log('useImperativeHandle:', newTriggers)
        formValues['triggers'] = newTriggers
        console.log('formValue:', form.getFieldsValue())
        return formValues;


    }
  }));

  return (
    <Form
        layout="inline"
        form={form}
        name="trigger_form"
        ref={formRef}
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
            value={props.dataSource.triggerType}
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
      >
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
      <Form.Item
              label="动作描述"
              name="actionDescription" >
          <TextArea allowClear style={{width: 400}}/>
      </Form.Item>
      <Form.Item
              label="持续时间"
              name="durationTime" >
          <Input allowClear style={{width: 400}}/>
      </Form.Item>

    </Form>
  );

};
const TriggerForm = forwardRef(SubForm);
export default TriggerForm;