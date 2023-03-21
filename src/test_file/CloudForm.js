import React, { Component } from 'react';
import { Form,  Input, Button } from 'antd';

class CloudForm extends Component{

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
            <Form name="customized_form_controls" layout="inline">
                <Form.Item name="changjing" label="场景">
                    <Input placeholder="场景" />
                </Form.Item>
                <Form.Item name="user_id" label="用户">
                    <Input placeholder="用户" />
                </Form.Item>
                <Form.Item name="vin" label="VIN">
                    <Input placeholder="VIN" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="search" onClick={this.getConfig}>查询</Button>
                </Form.Item>
            </Form>
        );
    }
}

export default CloudForm;
