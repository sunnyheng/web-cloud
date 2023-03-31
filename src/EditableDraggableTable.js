import { Form, InputNumber, Popconfirm, Table, Typography, Input, Select, Button, message, Divider, Space } from 'antd';
import React, { useState, useEffect, useContext } from 'react';

import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import { MenuOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";



import DataContext from './createContext'

{/*This is a single page(includes: add/delete/edit functionality)*/}
{/*Note: But the rowKey(antd table) must be index, otherwise the drag functionality cannot work.*/}
{/*Note: Due to the limitation, the data should be included [index] element. Will add.remove index when show/upload data*/}

const { Option } = Select;

const DragHandle = SortableHandle(({active}) => (
  <MenuOutlined style={{ cursor: "grab", color: active ? "blue":"#999" }} />
));

const SortContainer = SortableContainer((props) => <tbody {...props} />);
const SortableItem = SortableElement((props) =><tr {...props} />);


const EditableDraggableTable = (props) => {
//  let [dataSource, length, setData, setLength] = props;
  let dataSource = props.dataSource;
  let dataLength = props.length;

  const [form] = Form.useForm();
//  const ref = React.useRef()

  let triggerActions = props.actions;
  let actionLength = props.length;

  const [editingKey, setEditingKey] = useState('');


  const [options, setOptions] = useState([])
//  const [idSelectValue, setIdSelectValue] = useState([])

  const [categoryId, setCategoryId] = useState(0)
  const [actionId, setActionId] = useState(0)

  const allIdOptions = {
      1: [
        {'value': 1, 'label':'设置主驾车窗位置'},
        {'value': 2, 'label':'设置副驾车窗位置'},
        {'value': 3, 'label':'设置二排左车窗位置'},
        {'value': 4, 'label':'设置二排右车窗位置'},
        {'value': 5, 'label':'设置所有车窗位置'},
        {'value': 11, 'label':'设置后排遮阳帘位置'},
      ],
      2:[
        {'value': 1, 'label':'设置前排空调状态'},
        {'value': 2, 'label':'设置前排空调自动模式'},
        {'value': 6, 'label':'设置前排空调风速'},
        {'value': 11, 'label':'设置主驾温度'},
        {'value': 12, 'label':'设置主驾吹风模式'},
        {'value': 21, 'label':'设置副驾温度'},
        {'value': 22, 'label':'设置副驾吹风模式'},
        {'value': 31, 'label':'设置二排空调状态'},
        {'value': 32, 'label':'设置二排空调自动模式'},
        {'value': 33, 'label':'设置二排温度'},
        {'value': 36, 'label':'设置二排空调风速'},
        {'value': 38, 'label':'设置二排吹风模式'},
        {'value': 61, 'label':'设置空调状态'},
        {'value': 62, 'label':'设置空调自动模式'},
        {'value': 63, 'label':'设置空调A/C模式'},
        {'value': 101, 'label':'恢复前排空调模式'},
        {'value': 102, 'label':'恢复二排空调模式'},
      ],
      3:[
        {'value': 1, 'label':'设置主驾座椅位置'},
        {'value': 11, 'label':'设置副驾座椅位置'},
        {'value': 21, 'label':'设置二排模式'},
      ],
      4:[
        {'value': 1, 'label':'设置氛围灯状态'},
        {'value': 2, 'label':'设置氛围灯亮度'},
        {'value': 3, 'label':'设置氛围灯颜色'},
        {'value': 11, 'label':'恢复氛围灯状态'},
        {'value': 12, 'label':'恢复氛围灯亮度'},
        {'value': 13, 'label':'恢复氛围灯颜色'},
      ],
      5:[
        {'value': 1, 'label':'设置遮阳顶棚位置'},
        {'value': 5, 'label':'设置前排遮阳顶棚位置'},
        {'value': 6, 'label':'设置后排遮阳顶棚位置'},
      ],
      11:[
        {'value': 1, 'label':'导航到固定地点'},
        {'value': 3, 'label':'导航到用户自定义POI位置'},
      ],
      12:[
        {'value': 1, 'label':'操作智能灯'},
      ],
      101:[
        {'value': 1, 'label':'文言说明'},
        {'value': 2, 'label':'语音提示'},
        {'value': 11, 'label':'延迟执行'},
        {'value': 21, 'label':'启动(带倒计时)沉浸模式'},
      ],
      102:[
        {'value': 1, 'label':'延迟执行'},
      ],
      103:[
        {'value': 1, 'label':'开启沉浸模式'}
      ]
  }

  const showOptionsValues = (key) => {
    console.log('change option key:', key)
    let tmpOptions = allIdOptions[key]
    setOptions(tmpOptions)
    setCategoryId(key)
  }

  const showActionId = (key) => {
    console.log('Change action id:', key)
    setActionId(key)
  }

  const nodeElement = (dataIndex) =>{
    if(dataIndex ==='category'){
        return (
              <Select placeholder="选择" onChange={showOptionsValues}>
                <Option key={1} value={1}>窗户</Option>
                <Option key={3} value={3}>座椅模式</Option>
                <Option key={2} value={2}>空调模式</Option>
                <Option key={4} value={4}>灯光模式</Option>
                <Option key={5} value={5}>遮阳顶棚</Option>
                <Option key={11} value={11}>导航控制命令</Option>
                <Option key={12} value={12}>IOT控制命令</Option>
                <Option key={101} value={101}>信息提示</Option>
                <Option key={102}n value={102}>延时控制</Option>
                <Option key={103} value={103}>沉浸模式</Option>
              </Select>
        );
    }
    if(dataIndex === 'id'){
        return (
              <Select placeholder="选择" onChange={showActionId}>
                {options.map((item) =>
                    <Option key={item.value} value={item.value}>{item.label}</Option>
                )}
              </Select>
        );
    }
    if("param"===dataIndex){
        if(categoryId ===3 && (actionId===1||actionId===11)){
            return <Input allowClear placeholder="座椅, 靠背, 靠背支撑, 脚靠, 前坐垫, 后坐垫,头枕,腿枕" />;
        }
        if(categoryId ===1 && [1,2,3,4,5].includes(actionId)){
            return <Input allowClear placeholder="车窗设置值0-100" />;
        }
        else{
            return  <Input allowClear />;
        }

    }
    if(dataIndex === "resource"){
        return(
            <Select allowClear placeholder="选择">
                <Option key={15} value={15}>二排全部</Option>
                <Option key={1} value={1}>一排左</Option>
                <Option key={2} value={2}>一排右</Option>
                <Option key={3} value={3}>一排</Option>
                <Option key={4} value={4}>二排左</Option>
                <Option key={8} value={8}>二排右</Option>
                <Option key={12} value={12}>二排</Option>
                <Option key={16} value={16}>二排中间</Option>
                <Option key={32} value={32}>三排左</Option>
                <Option key={64} value={64}>三排右</Option>
                <Option key={128} value={128}>三排中间</Option>
              </Select>

        );
    }
    if(dataIndex === "position"){
        return <InputNumber min={0} max={20} />
    }
    if(dataIndex === "visibleToUser"){
        return (
              <Select placeholder="选择">
                <Option value={undefined||true}>可见</Option>
                <Option value={false}>不可见</Option>
              </Select>
        );
    }
    if(dataIndex === "needRecover"){
        return (
              <Select placeholder="选择">
                <Option value={undefined||false}>否</Option>
                <Option value={true}>是</Option>
              </Select>
        );
    }
    else{
        return (
              <Select placeholder="选择">
                <Option value={true}>是</Option>
                <Option value={false}>否</Option>
              </Select>
        );
    }
  }

  const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
//  const inputNode = inputType === 'boolean' ?
//    <Input.Group compact>
//      <Select defaultValue={false}>
//        <Option value={true}>yes</Option>
//        <Option value={false}>no</Option>
//      </Select>
//    </Input.Group> : <Input />;
    const inputNode = nodeElement(dataIndex);
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={dataIndex ==='resource' ? [{
              required: false,
              message: '为空',
            },]: [{
              required: true,
              message: '不能为空',
            },]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

  const isEditing = (record) => record.index === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.index);
    let categoryId = record.category;
    if(categoryId){
        setOptions(allIdOptions[categoryId]);
    }
  };
  // saveCell
  const saveCell = async (key) => {
    try {
      const row = await form.validateFields();

      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.index);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        props.setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        props.setData(newData);
        setEditingKey('');
      }
      console.log("row:", row)
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const cancel = () => {
    setEditingKey('');
  };

// the merged data is shallow copy, so it cannot change the index value directly.
// Should use deep copy and then change the index
  const merge = (a, b, i = 0) => {
    const aa = [...a];
    let tmp = [...a.slice(0, i), ...b, ...aa.slice(i, aa.length)]
    // use deep copy to change index value after frag the row.
    const newArr = tmp.map((itm, index) =>{
        return {'index': index+1, ...itm}
    })
    return newArr;
  }

  const onSortEnd = ({oldIndex, newIndex} ) => {
    let tempDataSource = dataSource;
    console.log('onSortEnd oldIndex:', oldIndex)
    console.log('onSortEnd newIndex:', newIndex)
    console.log('onSortEnd dataSource:', dataSource)
    if (oldIndex !== newIndex) {
        let movingItem = tempDataSource[oldIndex]

        tempDataSource.splice(oldIndex, 1)
        tempDataSource = merge(tempDataSource, [movingItem], newIndex)

        props.setData(tempDataSource);
    }
  };

  const handleDelete = (index) => {
    const newData = dataSource.filter((item) => item.index !== index);
    props.setData(newData);
    setEditingKey('');
  };

  const handleAdd = () => {
    let currentLen = dataLength+1;
    console.log('dataLength:', currentLen)
    const newData = {
//      key: newAddedKey,
      index: currentLen,
    };
    props.setData([...dataSource, newData]);
    props.setLength(currentLen)
    setEditingKey(currentLen);
  };

  const handleSave = () => {
//    let triggerFormData = ref.current.testSearch()
    // use then to get the result of Promise object
        if(dataSource.length>0){
    //    console.log('child trigger1:', data);
            let handleData = dataSource;

            console.log('handleData:', handleData)
            props.setData(handleData);
            message.success("Data is saved successfully.")
        }
        else if(dataSource.length>0){
            message.error("Please fulfilled the input.")
        }
        else{
            message.success("Data is saved successfully.")
            props.setData([])
        }
//    console.log('child trigger after:', dataSource);

  }

  const DraggableContainer = (props) => {
      return(
          <>
            <SortContainer
              useDragHandle
              disableAutoscroll
              helperClass="row-dragging"
              onSortEnd={onSortEnd}
              {...props}
            />
          </>
      )
  };

  const DraggableBodyRow = ({ className, style, ...restProps}: any) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const row_index = dataSource.findIndex(
      (x) => x.index === restProps["data-row-key"]
    );
//    console.log('row_index:', row_index)
    return (
      <>
          <SortableItem
            index={row_index}
            {...restProps}
          />
      </>
    );
  };

  const formatBool = (val, txt) => {
    var result = val ? '是': '否';
    return result;
  }

  const formatCategory = (val, txt) => {
    switch(val){
        case 1: return '窗户';
        case 2: return '空调模式';
        case 3: return '座椅模式';
        case 4: return '灯光模式';
        case 5: return '遮阳顶棚';
        case 11: return '导航控制命令';
        case 12: return 'IOT控制命令';
        case 101: return '信息提示';
        case 102: return '延时控制';
        case 103: return '沉浸模式';
    }
  }

  const formatId = (val) => {
    let tmpCategory = val.category;
    let tmpId = val.id;
    let idOption = allIdOptions[tmpCategory];
    if(idOption){
        for(let i=0; i<idOption.length; i++){
            if(idOption[i].value ==tmpId){
                return idOption[i].label;
            }
        }
    }
  }

  const formatVisible = (val) => {
    if(val == undefined || val){
        return '可见';
    }
    if(!val){
        return '不可见';
    }
  }

  const formatRecover = (val) => {
    if(val == undefined || !val){
        return '否';
    }
    if(val){
        return '是';
    }
  }

  const formatResource = (val) => {
    switch(val){
        case 1: return '一排左';
        case 2: return '一排右';
        case 3: return '一排';
        case 4: return '二排左';
        case 8: return '二排右';
        case 12: return '第二排';
        case 15: return '二排全部';
        case 16: return '二排中间';
        case 32: return '三排左';
        case 64: return '三排右';
        case 128: return '三排中间';
    }
  }

  const columns = [
    {
        title: "Sort",
        dataIndex: "",
        width: '3%',
        className: "drag-visible",
        render: () => <DragHandle />,
    },
    {
      title: '分类',
      dataIndex: 'category',
      width: '4%',
      editable: true,
      render: (text, record) => formatCategory(record.category),
    },
    {
      title: '执行动作',
      dataIndex: 'id',
      width: '11%',
      editable: true,
      render: (text, record) => formatId(record),
    },
    {
      title: '使能',
      dataIndex: 'enable',
      width: '3%',
      editable: true,
      render: (text, record) => formatBool(record.enable),
    },
//    {
//      title: '功能支持',
//      dataIndex: 'isSupport',
//      width: '5%',
//      editable: true,
//      render: (text, record) => formatBool(record.isSupport),
//    },
    {
      title: '是否恢复',
      dataIndex: 'needRecover',
      width: '4%',
      editable: true,
      render: (text, record) => formatRecover(record.needRecover),
    },
    {
      title: '参数',
      dataIndex: 'param',
      width: '40%',
      editable: true,
    },
    {
      title: '资源',
      dataIndex: 'resource',
      width: '3%',
      editable: true,
      render: (text, record) => formatResource(record.resource),
    },
    {
      title: 'UI位置',
      dataIndex: 'position',
      width: '2%',
      editable: true,
//      render: (text, record) => formatBool(record.visibleToUser),
    },
    {
      title: '用户可见',
      dataIndex: 'visibleToUser',
      width: '3%',
      editable: true,
      render: (text, record) => formatVisible(record.visibleToUser),
    },
    {
      title: '编辑',
      dataIndex: 'operation',
      width: '7%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => saveCell(record.index)}
              style={{
                marginRight: 8,
              }}
            >
              保存
            </Typography.Link>
            <Popconfirm title="确定取消吗?" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            编辑
          </Typography.Link>
        );
      },
    },
    {
      title: '删除',
      dataIndex: 'operation2',
      width: '6%',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="确定删除吗?" onConfirm={() => handleDelete(record.index)}>
            <a>删除</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const mergedColumns = columns.map((col) => {

    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            wrapper: DraggableContainer ,
            row:  DraggableBodyRow,
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={dataSource}
        columns={mergedColumns}
        rowClassName="editable-row"
        rowKey={dataSource=>dataSource.index}
//        rowKey={(record) => record.category}
        pagination={false}
      />
      <Button
        onClick={handleAdd}
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        style={{
          marginTop: 5,
        }}
      ></Button>
      <Button
        onClick={handleSave}
        type="primary"
        icon={<SaveOutlined />}
        style={{
          float: 'right',
          marginTop: 5,
        }}
      >save</Button>
    </Form>
  );
};
export default EditableDraggableTable;