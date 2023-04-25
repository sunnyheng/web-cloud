import React, { useState } from 'react';
import { Table, Space, message, Button } from 'antd';

import { useNavigate } from 'react-router-dom'

{/* THis is summary component, show all summary content from blob list to table. */}

const BlobTable = (props) => {
//    const {data} = this.props
    const navigate = useNavigate();
    let type = props.type

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
        dataIndex: 'preview',
        key: 'preview',
        render: (text, record) => <a onClick={(e)=>preview(record)}>预览</a>,
//        render: (text, record) => <Button><Link to={pathname:"/update", query:record}></Link>预览</Button>,
      },
      {
      title: '删除',
      key: 'delete',
      render: (text, record) => (
          <Space size="delete">
            <a onClick={(e)=>delRecord(record)}>删除</a>
          </Space>
        ),
    },
    ];

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

    const preview = (record) => {

        let recordArray = [record];
        navigate("/update", {state:{dataList: recordArray}, replace: true});


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
            dataSource={props.data}
            rowKey={record=>record.id}
        />
      </>
    );
};
export default BlobTable;