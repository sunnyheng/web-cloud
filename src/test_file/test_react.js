<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>React 实例</title>

    <script src="https://cdn.staticfile.org/react/16.4.0/umd/react.development.js"></script>
    <script src="https://cdn.staticfile.org/react-dom/16.4.0/umd/react-dom.development.js"></script>
    <script src="https://cdn.staticfile.org/babel-standalone/6.26.0/babel.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js"></script>
    <script src="https://unpkg.com/antd@3.9.3/dist/antd.min.js"></script>
    <link href="https://unpkg.com/antd@3.9.3/dist/antd.min.css" rel="stylesheet" />

</head>
<body>
<div id="example"></div>
<script type="text/babel">
let context = React.createContext();
class CloudForm extends React.Component{

    changeConfig = config => {
        this.setState({ config: config })
    }


    getConfig(){
        fetch('http://127.0.0.1:6432/readFile',{
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json'
                },
             mode: 'cors',
       })
          .then(data => {

            console.log(data);
          });

    }

    render(){
        var style = { background: '#0092ff', padding: '8px 0' };

        return (
            <antd.Form name="customized_form_controls" layout="inline">
                <antd.Form.Item name="changjing" label="场景">
                    <antd.Input placeholder="场景" />
                </antd.Form.Item>
                <antd.Form.Item name="user_id" label="用户">
                    <antd.Input placeholder="用户" />
                </antd.Form.Item>
                <antd.Form.Item name="vin" label="VIN">
                    <antd.Input placeholder="VIN" />
                </antd.Form.Item>
                <antd.Form.Item>
                    <antd.Button type="primary" htmlType="search" onClick={this.getConfig}>查询</antd.Button>
                </antd.Form.Item>
            </antd.Form>
  );
    }
}


class CloudTable extends React.Component{
    render(){
        const columns = [
      {
        title: 'Category',
        dataIndex: 'category',
        filters: [
          {
            text: 'Joe',
            value: 'Joe',
          },
          {
            text: 'Category 1',
            value: 'Category 1',
          },
          {
            text: 'Category 2',
            value: 'Category 2',
          },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.name.startsWith(value),
        width: '30%',
      },
      {
        title: 'Service Id',
       dataIndex: 'service_id',
      },
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Enable',
        dataIndex: 'enable',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'MinAdjustValue',
        dataIndex: 'minadjustvalue',
      },
      {
        title: 'MaxAdjustValue',
        dataIndex: 'maxadjustvalue',
      },
      {
        title: 'Accuracy',
        dataIndex: 'accuracy',
      },
    ];
    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
      },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

  return (
      <antd.Table columns={columns} dataSource={data} onChange={onChange} />
      );
  }
}


class App extends React.Component{

    render() {
        const { Header, Content, Footer } = antd.Layout;
        var items1 = ['a','b']

        return (
            <antd.Layout className="layout">
                <Header className="header">
                   <div className="logo"><h1>PATAC ISSEC IOT</h1></div>
                   <antd.Menu theme="white" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
                </Header>
                <Content style={{ padding: '0 50px', }}>
                  <antd.Breadcrumb style={{margin: '16px 0',}}>
                    <antd.Breadcrumb.Item>Home</antd.Breadcrumb.Item>
                    <antd.Breadcrumb.Item>List</antd.Breadcrumb.Item>
                    <antd.Breadcrumb.Item>App</antd.Breadcrumb.Item>
                  </antd.Breadcrumb>
                  <div className="site-layout-content">
                      <div> <CloudForm /> </div>
                      <div> <CloudTable /></div>
                  </div>
                </Content>
                <Footer style={{textAlign: 'right',}} >
                    ©2022 PATAC ISSEC
                </Footer>
            </antd.Layout>
        );
    }
}

ReactDOM.render(

  <App />,
  document.getElementById('example')
);


</script>

</body>
</html>