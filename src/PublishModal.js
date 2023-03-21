import { Modal } from 'antd';

const PublishModal = () => {

    let secondsToGo = 6;
    const instance = Modal.success({
        title: 'Publish status',
        content: 'Publish data to phone and car successfully.'
    });
    setTimeout(()=>{
        instance.destroy();
    }, secondsToGo * 1000);
};
export default PublishModal;