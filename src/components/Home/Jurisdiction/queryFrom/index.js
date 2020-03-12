import React, { Fragment } from 'react'
import { Input, Button,Modal } from 'antd'
import {withRouter} from 'react-router-dom'
import NewRole from '../NewRole'
class QueryFrom extends React.Component{
    constructor(){
        super()
        this.state={
            ruleName:'',
            ruleDescribe:'',
            visible:false
        }
    }
    render(){
        return(
            <Fragment>
                <div style={{padding:'10px'}} className='jindu'>
                    <span>权限名称：<Input style={{width:'150px'}} value={this.state.ruleName} 
                                            onChange={this.ruleNameInput.bind(this)}/></span>
                    <span style={{marginLeft:'10px'}}>权限描述 ：<Input style={{width:'150px'}} value={this.state.ruleDescribe}
                                            onChange={this.ruleDescribeInput.bind(this)}/></span>
                    <Button style={{marginLeft:'10px'}} type='primary' onClick={this.queryClick.bind(this)}>查询</Button>
                    <Button style={{marginLeft:'10px'}} onClick={this.cancelClick.bind(this)}>重置</Button>
                    <Button type='primary' style={{float:'right'}} onClick={this.NewRoleClick.bind(this)}>新增权限</Button>
                </div>
                <Modal
                title="新增权限"
                visible={this.state.visible}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
              >
                <NewRole clanerClick={this.handleOk.bind(this)} NewAddClick={this.NewAddClick.bind(this)}/>
              </Modal>
            </Fragment>
        )
    }
    NewAddClick(){
        this.handleOk()
        this.props.NewAddClick()
    }
    // 权限名称
    ruleNameInput(e){
        this.setState({
            ruleName:e.target.value
        })
    }
    // 权限描述
    ruleDescribeInput(e){
        this.setState({
            ruleDescribe:e.target.value
        })
    }
    // 查询
    queryClick(){
        let obj = {}
        obj.ruleName = this.state.ruleName
        obj.ruleDescribe = this.state.ruleDescribe
        this.props.queryClick(obj)
    }
    // 重置
    cancelClick(){
        this.setState({
            ruleName:'',
            ruleDescribe:''
        },()=>{
            let obj = {}
            obj.ruleName = this.state.ruleName
            obj.ruleDescribe = this.state.ruleDescribe
            this.props.queryClick(obj)
        })
    }
    // 新增角色
    NewRoleClick(){
        this.setState({
            visible:true
        })
        // this.props.history.push('/Home/JurisdictionNewRole')
    }
    handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
}
export default withRouter(QueryFrom)