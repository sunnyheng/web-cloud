import React, { useState } from 'react';
import { Table, Select, Input } from 'antd';

{/* THis is summary component, show all summary content from blob list to table. */}

const EditBlobTable = (props) => {
//    const {data} = this.props
//    console.log("11111")
    console.log("props.data:" + props.data)
    console.log("props.data.record:" + props.data.record)
    const [select_val, setSelectVal] = useState('user_data');
//    const [record, setRecord] = useState()
    const [recover, setRecover] = useState(false);

    const handleChange = (value: string) => {
        setSelectVal(value);
    };
    const handleChangeRecover=(value:boolean) =>{
        setRecover(value)
    }

    const columns = [
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: (text, record) =><Select
//                  onChange={handleChangeCatg}
                  defaultValue={101}
                  value={record.category}
                  options={[
                    { value: 101, label: '数据1' },
                    { value:102, label: '数据2' },
                    { value: 103, label: '数据3' },
                  ]}
                />,
      },
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: (text, record) =><Select
//                  onChange={handleChangeId}
                  defaultValue={1}
                  value={record.id}
                  options={[
                    { value: 1, label: 'id1' },
                    { value: 2, label: 'id2' },
                    { value: 3, label: 'id3' },
                  ]}
                />,
      },
      {
        title: 'Enable',
        dataIndex: 'enable',
        key: 'enable',
        render: (text, record) =><Select
                  style={{width:'80px'}}
//                  onChange={handleChangeEnable}
                  defaultValue={true}
                  value={record.enable}
                  options={[
                    { value: true, label: 'yes' },
                    { value: false, label: 'no' },
                  ]}
                />,
      },
      {
        title: 'IsSupport',
        dataIndex: 'isSupport',
        key: 'isSupport',
        render: (text, record) =><Select
//                  onChange={handleChangeSupp}
                  style={{width:'80px'}}
                  defaultValue={true}
                  value={record.isSupport}
                  options={[
                    { value: true, label: 'yes' },
                    { value: false, label: 'no' },
                  ]}
                />,
      },
      {
        title: 'NeedRecover',
        dataIndex: 'needRecover',
        key: 'needRecover',
        render: (text, record) =><Select
                  onChange={handleChangeRecover}
                  style={{width:'60px'}}
                  defaultValue={true}
                  value={record.needRecover}
                  options={[
                    { value: true, label: 'yes' },
                    { value: false, label: 'no' },
                  ]}
                />,
      },
      {
        title: 'Parameter',
        dataIndex: 'param',
        key: 'param',
        render: (text, record) =><Input type="text" defaultValue="" value={record.param} />,
      },
      {
        title: 'Resource',
        dataIndex: 'resource',
        key: 'resource',
        render: (text, record) =><Input type="text" style={{width:'40px'}} defaultValue="" value={record.resource} />,
      },
      {
        title: 'Save',
        dataIndex: 'save',
        key: 'save',
        render: (text, record) => <a onClick={(e)=>saveRecord(record)}>Save</a>,
      },
      {
        title: 'Add',
        dataIndex: 'add',
        key: 'add',
        render: (text, record) => <a onClick={(e)=>showDetails(record)}>Add</a>,
      },
      {
        title: 'Delete',
        dataIndex: 'delete',
        key: 'delete',
        render: (text, record) => <a onClick={(e)=>showDetails(record)}>Del</a>,
      },
    ];

//    let[data, setData] = useState(props.data)

    const saveRecord = (record) => {
        console.log(record)
//        setRecord(record)
    }

    const showDetails = (record) => {
//        console.log("record:" + JSON.stringify(record))

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
                defaultExpandedRowKeys: ['0']
            }}
            dataSource={props.data}
            rowKey={(record) => String(record.id*1000+record.category) + record.param }
        />
      </>
    );
};
export default EditBlobTable;