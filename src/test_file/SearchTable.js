//注意这个js代码整个对应上面的UI展示，是我们项目里的一个页面，里面部分字段可能大家可能用不上。

import React, { useCallback, useEffect, useState} from 'react';
import {Collapse, Table, Button, Space, Form, Input, Select, DatePicker,} from 'antd';

//注意此处是我们请求接口后返回的数据，这里我是把所有的api请求都提出来了，下面filterUser和getList就是我们这个页面需要用到的api
//import {filterUser, getList} from "../../service/user";

//moment是为了时间选择器，选择后进行时间格式化所用
//import moment from 'moment';
//import 'moment/locale/zh-cn';

//locale是为了中文化时间控件的，如果其他的控件是非中文的，也可以按照这个写法中文化
import locale from 'antd/es/locale/zh_CN';

//引入本页面的样式文件
//import "./list.css";

const {Panel} = Collapse;
const {Option} = Select;
const {RangePicker} = DatePicker;

function SearchTable() {

   //设置页码
  let [page,setPage] = useState(1);

  //设置每页条数
  let size = 2;

  //设置总页数
  const [total,setTotal] = useState(0);

  //搜索条件
  let filter = {
    mobile:'',
    nickname:'',
    channel_id:0,
    tag_key:'',
    min_create_time:0,
    max_create_time:0,
  };

  //请求数据时loading状态
  const [load,setLoad] = useState(false);

  //表格数据
  const [tableData,setTableData] = useState([]);


  //此处是为了初始化时候请求一次数据
  useEffect(()=>{
    pageChange(page,size);
  },[])


  //点击下面的分页按钮触发的方法
  const pageChange = useCallback(
    (currentPage,currentSize)=>{
      // debugger
      console.log(currentPage,currentSize,"1")
      page = currentPage === undefined ? page : currentPage;
      setPage(page);
      size = currentSize === undefined ? size : currentSize;
//      fetchData();
    },
    []
  )

  //点击搜索按钮触发的方法
  const searchData = useCallback(
    (values)=>{
      // debugger
      console.log(values)
      filter.mobile = values && values.mobile !== undefined ? values.mobile : '';
      filter.nickname = values && values.nickname !== undefined ? values.nickname : '';
      filter.channel_id = values && values.channel_id !== undefined ? values.channel_id : 0;
      filter.tag_key = values && values.tag_key !== undefined ? values.tag_key : '';
//      if(values && values.create_time !== undefined){
//        let min_create_time = parseInt(moment(values.create_time[0]).valueOf()/1000);
//        let max_create_time = parseInt(moment(values.create_time[1]).valueOf()/1000);
//        filter.min_create_time = min_create_time;
//        filter.max_create_time = max_create_time;
//      }else{
//        filter.min_create_time = 0;
//        filter.max_create_time = 0;
//      }
      page = 1;
      setPage(page);
      console.log("search",page,size)
      console.log("search filter",filter)
      fetchData();

    },[]
  )

  //Api请求后台接口的方法
  const fetchData = async()=> {
    setLoad(true);
    let params = {page, size, ...filter};
//    let result = await getList(params);
    setLoad(false);
//    if (result.code === 0) {
//      result = result.data;
//      console.log("result", result);
//      let table = [...result.list];
//      setTotal(result.total_size);
//      setTableData([...table]);
//      console.log("table", table)
//    }
  }


  //表头列
  const columns = [
    {
      title: '分类',
      dataIndex: 'category',
    },
    {
      title: '服务号',
      dataIndex: 'service_id',
    },
    {
      title: '名字',
      dataIndex: 'name',
    },
    {
      title: '开通',
      dataIndex: 'enabled',
    },
    {
      title: '最小调节值',
      dataIndex: 'min_adj_val',
    },
    {
      title: '最大调节值',
      dataIndex: 'max_adj_val',
    },
    {
      title: '调节精度',
      dataIndex: 'accuracy',
    },
  ];

  //获取搜索条件的api
  const [user_channel,setUser_channel] = useState([]);
  const [user_tag,setUser_tag] = useState([]);
  useEffect(()=>{
    let params = {
      show_user_tag:true,
      show_user_channel:true,
      show_user_identifier:true,
    };
    const fetchData = async ()=>{
//      const result = await filterUser(params);
//      if(result.code === 0){
//        const userChannel = result.data&&result.data.user_channel ? result.data.user_channel : [];
//        const userTag = result.data&&result.data.user_tag ? result.data.user_tag : [];
//        setUser_channel(userChannel);
//        setUser_tag(userTag);
//      }
    }
    fetchData();
  },[])


  //重置表单
  const [form] = Form.useForm();
  const reset = ()=>{
    form.resetFields();
    //此处尤其要注意，resetFields表单重置后会重新mount组件，因此不必在这里重新调用请求api的接口。
    //重置之后，会自动调用搜索列表的方法。
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
      <Table rowKey="id" columns={columns} loading={load}
             dataSource={tableData} bordered
             scroll={{y: 500}}
             rowSelection={{selectedRowKeys: []}}
             pagination={{showSizeChanger:true,onChange:pageChange,
               pageSizeOptions:['2','5','10'],defaultPageSize:size,
               showTotal: ()=>{return `共${total}条数据`},
               current:page,total:total}}
      />
    </div>
  );
}

export default SearchTable;
