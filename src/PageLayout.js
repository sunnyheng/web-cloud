import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  SendOutlined,
  SearchOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

import {
  useNavigate,
  Route,
  Routes,
  Link
} from 'react-router-dom'

import NestedTable from './NestedTable'
import SearchBlob from './SearchBlob'
import UploadForm from './UploadForm'
import UpdateForm from './UpdateForm'


const { Header, Sider, Content, Footer } = Layout;

const PageLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout>
{/*}      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light"> */}
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="logo" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <SearchOutlined />,
              label: 'Search',
              onClick: () => { navigate('/');}
            },
            {
              key: '2',
              icon: <UploadOutlined />,
              label: 'Upload',
              onClick: () => {navigate('/upload');}
            },
            {
              key: '3',
              icon: <SendOutlined />,
              label: 'publish',
              onClick: () => {navigate('/publish');}
            },
            {
              key: '4',
              icon: <FileAddOutlined />,
              label: 'create/update',
              onClick: () => {navigate('/update');}
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer, justifyContent:'center', alignItems:'center'}} layout="inline">
            <p style={{display: 'inline'}}>{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}</p><p style={{textAlign:'right', display: 'inline', fontSize:'35px'}}>ISSEC Scenario page</p>

        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route exact path='/' element={<SearchBlob />} replace></Route>
            <Route exact path='/upload' element={<UploadForm />} replace></Route>
            <Route exact path='/publish' element={<NestedTable />} replace></Route>
            <Route exact path='/update' element={<UpdateForm />} replace></Route>
          </Routes>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          PATAC ISSEC ©2023
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PageLayout;