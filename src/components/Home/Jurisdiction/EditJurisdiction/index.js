import React, { Fragment } from 'react'
import { Input, Button, Select, message } from 'antd'
import { UpperLevelApi, NewAddApi } from '@api/Home/Jurisdiction'
const { TextArea } = Input;
const { Option } = Select
class EditJurisdiction extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.EditJurisdictionDat
    }
    render() {
      
        return (
            <Fragment>
                
            </Fragment>
        )
    }
    // 角色名
    RoleNameInput(e) {
        this.setState({
            name: e.target.value
        })
    }
    // 描述
    describeInput(e) {
        this.setState({
            description: e.target.value
        })
    }
    // 下一步
    async NextSetpClick() {
        let obj = {}
        obj.id = this.state.id
        obj.name = this.state.name
        obj.description = this.state.description
        obj.type = this.state.type
        obj.parentId = this.state.parentId
    }
    // 选择权限类型
    async handleChange(value) {
        let data = await UpperLevelApi(value)
        this.setState({
            type: value,
            allParentList: data.data
        })

    }
    // 选择上一级
    UpperLevelChange(value) {
        this.setState({
            parentId: value
        })
    }
    success = (val) => {
        message.success(val);
    }
    error = (val) => {
        message.error(val);
    }
}
export default EditJurisdiction