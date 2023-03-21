import React, { Component } from 'react';
import { Layout,  Menu, Breadcrumb } from 'antd';

import PageLayout from './PageLayout';

class App extends Component{

    render() {
        return (
          <div>
            <PageLayout />
          </div>
        )
//        const { Header, Content, Footer } = Layout;
//        var items1 = ['a','b']
//
//        return (
//            <Layout className="layout">
//                <Header className="header">
//                   <div className="logo"><h1>PATAC ISSEC IOT</h1></div>
//                   <Menu theme="white" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
//                </Header>
//                <Content style={{ padding: '0 50px', }}>
//                  <Breadcrumb style={{margin: '16px 0',}}>
//                    <Breadcrumb.Item>Home</Breadcrumb.Item>
//                    <Breadcrumb.Item>List</Breadcrumb.Item>
//                    <Breadcrumb.Item>App</Breadcrumb.Item>
//                  </Breadcrumb>
//                  <div className="site-layout-content">
//                      <div> <CloudForm /> </div>
//                      <div> <CloudTable /></div>
//                  </div>
//                </Content>
//                <Footer style={{textAlign: 'right',}} >
//                    ©2022 PATAC ISSEC
//                </Footer>
//            </Layout>
//        );
    }
}

export default App;
