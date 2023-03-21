import React, { useState } from 'react';
import "antd/dist/reset.css";

import { Table } from "antd";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import { MenuOutlined } from "@ant-design/icons";


const DragHandle = SortableHandle(({active}) => (
  <MenuOutlined style={{ cursor: "grab", color: active ? "blue":"#999" }} />
));
   const data =[
    {
      "key": "1",
      "name": "John Brown",
      "age": 32,
      "address": "New York No. 1 Lake Park",
      "index": 0
    },
    {
      "key": "2",
      "name": "Jim Green",
      "age": 42,
      "address": "London No. 1 Lake Park",
      "index": 1
    },
    {
      "key": "3",
      "name": "Joe Black",
      "age": 32,
      "address": "Sidney No. 1 Lake Park",
      "index": 2
    },
    {
      "key": "4",
      "name": "4",
      "age": 32,
      "address": "New York No. 1 Lake Park",
      "index": 3
    },
    {
      "key": "5",
      "name": "5",
      "age": 42,
      "address": "London No. 1 Lake Park",
      "index": 4
    },
    {
      "key": "6",
      "name": "6",
      "age": 32,
      "address": "Sidney No. 1 Lake Park",
      "index": 5
    }
  ];

const SortContainer = SortableContainer((props) => <tbody {...props} />);
const SortableItem = SortableElement((props) =><tr {...props} />);


const DragTable = () => {
    const [dataSource, setDataSource ] = useState(data);



  const columns= [
      {
        title: "Sort",
        dataIndex: "",
        width: 30,
        className: "drag-visible",
        render: () => <DragHandle />,
      },
      {
        title: "Name",
        dataIndex: "name",
        className: "drag-visible"
      },
      {
        title: "Age",
        dataIndex: "age"
      },
      {
        title: "Address",
        dataIndex: "address"
      }
    ];

  const merge = (a, b, i = 0) => {
    const aa = [...a];
    return [...a.slice(0, i), ...b, ...aa.slice(i, aa.length)];
  }

  const onSortEnd = ({oldIndex, newIndex} ) => {
    let tempDataSource = dataSource;
    if (oldIndex !== newIndex) {

        let movingItem = tempDataSource[oldIndex]
        tempDataSource.splice(oldIndex, 1)
        tempDataSource = merge(tempDataSource, [movingItem], newIndex)
        setDataSource(tempDataSource);

    }
  };

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
    const index = dataSource.findIndex(
      (x) => x.index === restProps["data-row-key"]
    );
    return (
      <>
          <SortableItem
            index={index}
            {...restProps}
          />
      </>
    );
  };

    return (
      <>
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        rowKey="index"
        components={{
          body: {
            wrapper: DraggableContainer ,
            row:  DraggableBodyRow
          },
        }}

      />
      </>
    );

}

export default DragTable;