import React from 'react'
import {Layout, Menu, Button} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {
  // BrowserRouter as Router,
  Route,
  // Switch,
  Routes,
  Link
} from 'react-router-dom'
// 按需加载
//import async from './async'
//let ButtonDemo = async(() => import("./ButtonDemo"));
//let InputDemo = async(() => import("./InputDemo"));

 import ButtonDemo from './ButtonDemo'
 import InputDemo from './InputDemo'

const {Header, Sider, Content} = Layout;

class MyLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo"/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['']}>
            <Menu.Item key="1">
              <Button icon={<UserOutlined />}>button</Button>
              <Link to='/'></Link>
            </Menu.Item>
            <Menu.Item key="2">
              <span>input</span>
              <Link to='/input'></Link>
            </Menu.Item>
            <Menu.Item key="3">
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{background: '#fff', paddingLeft: '20px'}}>
            <Button
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
          <Routes>
            <Route exact path='/' element={<ButtonDemo />} replace></Route>
            <Route exact path='/input' element={<InputDemo />} replace></Route>
          </Routes>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default MyLayout