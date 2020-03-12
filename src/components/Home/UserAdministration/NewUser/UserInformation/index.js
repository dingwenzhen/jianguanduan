import React, { Fragment } from 'react'
import { Input, Select, Button, message } from 'antd'



const { Option } = Select
class UserInformation extends React.Component {
    constructor(porps) {
        super(porps)
        this.state = this.props.UserInformationData
    }
    render() {
        return (
            <Fragment>
                <div style={{width:'335px',position:'absolute',right:'0',left:'0',margin:'auto'}}>
                    <div style={{ marginTop: '20px' }}>
                    <i style={{ display: 'inline-block', width: '10px', color: 'red' }}>*</i>
                        <span style={{ width: '60px', display: 'inline-block' }}>登录名：</span>
                        <Input style={{ width: '250px' }} onChange={this.LoginNameInput.bind(this)} value={this.state.LoginName} />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                    <i style={{ display: 'inline-block', width: '10px', color: 'red' }}>*</i>
                        <span style={{ width: '60px', display: 'inline-block'}}>姓名：</span>
                        <Input style={{ width: '250px' }} onChange={this.UserNameInput.bind(this)} value={this.state.UserName} />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <span style={{ width: '70px', display: 'inline-block',paddingLeft:'10px' }}>电话：</span>
                        <Input style={{ width: '250px' }} onChange={this.IphoneInput.bind(this)} value={this.state.Iphone} />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                    <i style={{ display: 'inline-block', width: '10px', color: 'red' }}>*</i>
                        <span style={{ width: '60px', display: 'inline-block' }}>邮箱：</span>
                        <Input style={{ width: '250px' }} onChange={this.EmailInput.bind(this)} value={this.state.email} />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                    <i style={{ display: 'inline-block', width: '10px', color: 'red' }}>*</i>
                        <span style={{ width: '60px', display: 'inline-block' }}>部门：</span>
                        <Select style={{ width: 250 }} onChange={this.SelectDepartment.bind(this)}>
                            {
                                this.state.SelectDepartment.map(item => {
                                    return <Option value={item.id} key={item.id}>{item.title}</Option>
                                })
                            }
                        </Select>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <span style={{ width: '70px', display: 'inline-block' ,paddingLeft:'10px'}}>角色：</span>
                        <Select style={{ width: 250 }} onChange={this.SelecRoleChange.bind(this)}>
                            {
                                this.state.RoleList.map(item => {
                                    return <Option value={item.id} key={item.id}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Button type='primary' onClick={this.Next.bind(this)}>下一步</Button>
                    </div>
                </div>
            </Fragment>
        )
    }

    // 登录名
    LoginNameInput(e) {
        this.setState({
            LoginName: e.target.value
        })
    }
    // 姓名
    UserNameInput(e) {
        this.setState({
            UserName: e.target.value
        })
    }
    // 邮箱
    EmailInput(e) {
        this.setState({
            email: e.target.value
        })
    }
    // 电话号
    IphoneInput(e) {
        this.setState({
            Iphone: e.target.value
        })
    }
    // 部门
    SelectDepartment(value) {
        console.log(value)
        this.setState({
            Department: value
        })
    }
    // 角色
    SelecRoleChange(value) {
        this.setState({
            Role: value
        })
    }
    check(value) {
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
        if (value === "") { //输入不能为空
            return "输入不能为空!"
        } else if (!reg.test(value)) { //正则验证不通过，格式不对
            return "邮箱格式不正确!";
        } else {
            return true;
        }
    }
    // 下一步
    Next() {
        let bool = this.check(this.state.email)
        if (bool == true) {
            let obj = {}
            obj.LoginName = this.state.LoginName
            obj.UserName = this.state.UserName
            obj.email = this.state.email
            obj.Iphone = this.state.Iphone
            if(!this.state.Department){
                this.error('部门不能为空')
            }else{
                obj.Department = this.state.Department
                let RoleList = this.state.RoleList
                for (var i = 0; i < RoleList.length; i++) {
                    if (this.state.Role == RoleList[i].id) {
                        obj.roleId = RoleList[i].id
                        obj.roleName = RoleList[i].name
                    }
                }
                this.props.Next(obj, this.state)
            }
            
        } else {
            this.error(bool)
        }
    }
    error = (val) => {
        message.error(val);
    }

}
export default UserInformation