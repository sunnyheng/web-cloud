import { Divider, Table } from 'antd';

{/* This component is used by air condition service.*/}

const columns = [
  {
    title: '服务名称',
    dataIndex: 'serviceName',
    key: 'serviceName',
  },
  {
    title: '服务路径',
    dataIndex: 'fullPathName',
    key: 'fullPathName',
  },
  {
    title: '服务接口',
    dataIndex: 'interfaceName',
    key: 'interfaceName',
  },
  {
    title: '参数',
    dataIndex: 'params',
    key: 'params',
  },
];

const ServiceTable = (props) => (
  <>
    <Divider>服务列表</Divider>
    <Table columns={columns} dataSource={props.data} size="middle" rowKey={record=>record.interfaceName}/>
  </>
);
export default ServiceTable;