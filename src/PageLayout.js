import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  SendOutlined,
  SearchOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

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

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  }

  const navigate = useNavigate();

  return (
    <Layout>
{/*}      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light"> */}
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="logo" />
        <Button type="default" onClick={toggleCollapsed} style={{marginBottom: 5}}>{collapsed ? <MenuUnfoldOutlined />:<MenuFoldOutlined />}</Button>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <SearchOutlined />,
              label: '查询场景',
              onClick: () => { navigate('/');}
            },
            {
              key: '2',
              icon: <UploadOutlined />,
              label: '上传场景(广场)',
              onClick: () => {navigate('/upload');}
            },
            {
              key: '3',
              icon: <SendOutlined />,
              label: '发布场景',
              onClick: () => {navigate('/publish');}
            },
            {
              key: '4',
              icon: <FileAddOutlined />,
              label: '新增/编辑场景(广场)',
              onClick: () => {navigate('/update');}
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer, textAlign:'center', fontSize: 20}} layout="inline">
                PATAC CLOUD WEB
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 780,
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
            textAlign: 'right',
          }}
        >
          PATAC ISSEC ©2023
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PageLayout;