import React, { Fragment } from 'react'
import { Upload, message, Button, Icon } from 'antd';
class RuleImporting extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        const props = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                console.log(info,'1111')
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-规则导入
                </div>
                <div style={{padding: '10px', backgroundColor: '#fff'}}>
                    <div style={{ marginTop: '20px',  width: '400px' }}>
                        <span>选择规则文件：</span>
                        <Upload {...props}>
                            <Button>
                                <Icon type="upload" /> 请选择要上传的文件
                            </Button>
                        </Upload>

                    </div>
                </div>
            </Fragment>
        )
    }
}
export default RuleImporting