import {useState, useEffect} from 'react';
import { Typography, Form, Input, Button, message } from 'antd';

const UploadForm = () => {

  const [form] = Form.useForm();
  const [articles, setArticles] = useState([]);
  const [editing, setIsEditing] = useState(null);
  const [uploadContent, setUploadContent] = useState('');
//  useEffect(() => {
//    fetch('http://localhost:30001/readFile').then(res =>{
//        if(res.ok){
////            console.log("response:", res)
//            res.json().then(data => {
////                console.log("data:", data)
//
//                setArticles(data)
//            })
//        }
//      })
//  })

  const showContent = (id) => {
    const url = 'http://20.239.59.174/:30001/readFile?type=ScenarioSquare&name=' + id
//    const url = 'http://localhost:30001/readFile?name=user_vin_1001'
    fetch(url).then(res => {
      if(res.ok){
        res.json()
        .then(data =>{
          setArticles(data)
        })
      }
    })
  }

  const handleSubmit = e =>{
    fetch('http://20.239.59.174:30001/upload',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(uploadContent)
    })
    .then(res => {
        console.log(res)
        if(res.ok){
            res.json().then(data => {
                message.success("Uploaded scenario template: "+ data.file_name + " successfully.");
                showContent(data.file_name)
//                const newArticle = [uploadContent];
//                setArticles(newArticle)
            })
            form.resetFields();
        }
        else if(res.status == 400){
          console.log('Uploaded data invalid.')
          message.error(res.statusText + ". Reason: Uploaded data invalid");
        }
        else{
          console.log('Server error. Cannot upload data')
          message.error(res.statusText + ". Reason: Failed to upload to azure blob.");
        }
    })
//    .then(data =>{
//      console.log(data)
//      if(data.status=='200'){
//        message.success("Uploaded scenario template:"+ data.file_name + " successfully.");
//        showContent(data.file_name)
//      }
//      if(data.status=='500'){
//        message.error("Failed to upload. Reason:"+ data.reason);
//      }
//     })
     .catch((err)=>{
      console.log(err);
     })

    console.log(uploadContent)

  }


  return (
    <div>
      {articles.map(article => {
        return(
          <div key = {article.id}>
            <Typography style={{ maxWidth: 600, marginTop: 24, marginLeft:40}}
                editable={{onStart: () => (setIsEditing(true)),
                        onEnd: () => (setIsEditing(false)),
                        onChange: () => (setIsEditing(false))}}>
                <pre style={{ border: 'none' }}>{JSON.stringify(article, null, 4)}</pre>
              </Typography>

          </div>
        )
      })}

      <div>
        <Form
            name="wrap"
            labelCol={{ flex: '110px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            form={form}
            colon={false}
            style={{ maxWidth: 600 }}
            onFinish={handleSubmit}
          >
          <Form.Item label="场景内容" name="scenario data" rules={[{ required: true }]}>
            <Input.TextArea rows={4} placeholder="请输入场景内容"
            onChange={e => setUploadContent(e.target.value)} />
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">上传</Button>
          </Form.Item>
        </Form>
      </div>

    </div>
  );
};
export default UploadForm;