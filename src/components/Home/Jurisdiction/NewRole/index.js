import React, { Fragment } from 'react'
import { Input, Button, Select, message } from 'antd'
import { UpperLevelApi, NewAddApi } from '@api/Home/Jurisdiction'
const { TextArea } = Input;
const { Option } = Select
class NewRole extends React.Component {
    constructor() {
        super()
        this.state = {
            describe: '',
            type: '',
            UpperLevelList: [],//上一级菜单数组
            UpperLevel: '',
            RoleName:''
        }
    }
    render() {
        return (
            <Fragment>
                <div >
                    <div className='jindu'>
                    <i style={{ display: 'inline-block', width: '10px', color: 'red' }}>*</i>
                    <span style={{ width: '90px', display: 'inline-block' }}>权限名：</span>
                        <Input style={{ width: '300px' }} value={this.state.RoleName}
                            onChange={this.RoleNameInput.bind(this)} />
                    </div>
                    <div style={{ marginTop: '10px' }} className='jindu'>
                    <span style={{ width: '100px', display: 'inline-block', float: 'left' }}>
                    <i style={{ display: 'inline-block', width: '10px', color: 'red' }}>*</i>权限类型：</span>
                        <Select defaultValue="请选择权限类型" style={{ width: 300 }} onChange={this.handleChange.bind(this)}>
                            <Option value="0">目录</Option>
                            <Option value="1">菜单</Option>
                            <Option value="2">按钮</Option>
                        </Select>
                    </div>
                    <div style={{ marginTop: '10px' }} className='jindu'>
                    
                    <span style={{ width: '100px', display: 'inline-block', float: 'left' }}><i style={{ display: 'inline-block', width: '10px', color: 'red' }}>*</i>
                    上一级菜单：</span>
                        <Select defaultValue="请选择上一级菜单" style={{ width: 300 }} onChange={this.UpperLevelChange.bind(this)}>
                            {
                                this.state.UpperLevelList.map(item => {
                                    return <Option value={item.id} key={item.id}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </div>
                    <div style={{ marginTop: '10px' }} className='jindu'>
                        <span style={{ width: '100px', display: 'inline-block', float: 'left',paddingLeft:'10px' }}>描述：</span>
                        <TextArea
                            value={this.state.describe}
                            onChange={this.describeInput.bind(this)}
                            autoSize={{ minRows: 3, maxRows: 5 }}
                            style={{ width: '300px' }}
                        />
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <Button onClick={this.NextSetpClick.bind(this)} type='primary'>确定</Button>
                        <Button style={{ marginLeft: '20px' }} onClick={this.props.clanerClick.bind(this)}>关闭</Button>
                    </div>
                </div>
            </Fragment>
        )
    }
    // 角色名
    RoleNameInput(e) {
        this.setState({
            RoleName: e.target.value
        })
    }
    // 描述
    describeInput(e) {
        this.setState({
            describe: e.target.value
        })
    }
    // 下一步
    async NextSetpClick() {
        let obj = {}
       
        obj.describe = this.state.describe
        if(this.state.RoleName==''){
            this.error('权限名不能为空')
        }else if (this.state.type == '') {
            this.error('请选择权限类型')
        } else if (this.state.UpperLevel == '') {
            this.error('上一级菜单')
        } else {
            obj.RoleName = this.state.RoleName
            obj.parentId = this.state.UpperLevel
            obj.type = this.state.type
            let data = await NewAddApi(obj)
            if (data.msg == '成功') {
                this.props.NewAddClick()
                this.success('添加成功')
            }else{
                this.error(data.msg)
            }
        }
    }
    // 选择权限类型
    async handleChange(value) {
        let data = await UpperLevelApi(value)
        console.log(data)
        this.setState({
            type: value,
            UpperLevelList: data.data
        })

    }
    // 选择上一级
    UpperLevelChange(value) {
        this.setState({
            UpperLevel: value
        })
    }
    success = (val) => {
        message.success(val);
    }
    error = (val) => {
        message.error(val);
    }
}
export default NewRole