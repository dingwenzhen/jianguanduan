import React, { Fragment } from 'react'
import { DatePicker, Input, Button } from 'antd';
import moment from 'moment';
import { withRouter } from "react-router-dom"

class FromList extends React.Component {
    constructor() {
        super()
        this.state = {
            RoleName: '',
            RoleDescription: '',
            PermissionName: ''
        }
    }
    render() {
        return (
            <Fragment>
                <div style={{ padding: '10px' }}>

                    <span style={{ marginLeft: '10px' }}>
                        角色名称：<Input style={{ width: '150px' }}
                            value={this.state.RoleName}
                            onChange={this.RoleNameInput.bind(this)} />
                    </span>
                    <span style={{ marginLeft: '10px' }}>
                        角色描述：<Input style={{ width: '150px' }}
                            value={this.state.RoleDescription}
                            onChange={this.RoleDescriptionInput.bind(this)} />
                    </span>
                    <span style={{ marginLeft: '10px' }}>
                        权限名称：<Input style={{ width: '150px' }}
                            value={this.state.PermissionName}
                            onChange={this.PermissionNameInput.bind(this)} />
                    </span>
                    <Button style={{ marginLeft: '20px' }} onClick={this.queryData.bind(this)} type="primary">查询</Button>
                    <Button style={{ marginLeft: '20px' }} onClick={this.ResetData.bind(this)}  >重置</Button>
                    <Button style={{ float: 'right' }} onClick={this.NewRoleClick.bind(this)}>新增角色</Button>
                </div>
            </Fragment>
        )
    }
    // 角色名称：
    RoleNameInput(e) {
        this.setState({
            RoleName: e.target.value
        })
    }
    // 角色描述：
    RoleDescriptionInput(e) {
        this.setState({
            RoleDescription: e.target.value
        })
    }
    // 权限名称：
    PermissionNameInput(e) {
        this.setState({
            PermissionName: e.target.value
        })
    }
    // 查询
    queryData() {
        let FromList = {}
        FromList.RoleName = this.state.RoleName
        FromList.RoleDescription = this.state.RoleDescription
        FromList.PermissionName = this.state.PermissionName
        this.props.queryData(FromList)
    }
    ResetData() {
        this.setState({
            RoleName: '',
            RoleDescription: '',
            PermissionName: ''
        }, () => {
            let FromList = {}
            FromList.RoleName = this.state.RoleName
            FromList.RoleDescription = this.state.RoleDescription
            FromList.PermissionName = this.state.PermissionName
            this.props.queryData(FromList)
        })
    }
    // 新增角色
    NewRoleClick() {
        this.props.history.push('/Home/NewRole')
    }
}
export default withRouter(FromList)