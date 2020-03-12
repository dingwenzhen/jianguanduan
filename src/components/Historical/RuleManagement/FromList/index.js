import React, { Fragment } from 'react'
import {Input ,Button} from 'antd'
class FromList extends React.Component{
    constructor(){
        super()
        this.state={
            RuleNumber:'',
            RuleDescription:'',
            RuleType:''
        }
    }
    render(){
        return(
            <Fragment>
                <div style={{padding:'10px'}}>
                    <span>
                        规则号：<Input style={{width:'150px'}} value={this.state.RuleNumber} 
                                onChange={this.RuleNumberInput.bind(this)}/>
                    </span>
                    <span style={{marginLeft:'10px'}}>
                        规则描述：<Input style={{width:'150px'}} value={this.state.RuleDescription} 
                                onChange={this.RuleDescriptionInput.bind(this)}/>
                    </span>
                    <span style={{marginLeft:'10px'}}>
                        规则类型：<Input style={{width:'150px'}} value={this.state.RuleType} 
                                onChange={this.RuleTypeInput.bind(this)}/>
                    </span>
                    <Button style={{marginLeft:'10px'}} type="primary" onClick={this.queryClick.bind(this)}>查询</Button>
                    <Button style={{marginLeft:'10px'}} onClick={this.ClearClick.bind(this)}>重置</Button>
                </div>
            </Fragment>
        )
    }
    // 规则号
    RuleNumberInput(e){
        this.setState({
            RuleNumber:e.target.value
        })
    }
    // 规则描述：
    RuleDescriptionInput(e){
        this.setState({
            RuleDescription:e.target.value
        })
    }
    // 规则类型：
    RuleTypeInput(e){
        this.setState({
            RuleType:e.target.value
        })
    }
    // queryClick 查询
    queryClick(){
        let obj = {}
        obj.RuleNumber=this.state.RuleNumber
        obj.RuleDescription=this.state.RuleDescription
        obj.RuleType=this.state.RuleType
        this.props.queryClick(obj)
    }
    // 重置
    ClearClick(){
        this.setState({
            RuleNumber:'',
            RuleDescription:'',
            RuleType:''
        },()=>{
            let obj = {}
            obj.RuleNumber=this.state.RuleNumber
            obj.RuleDescription=this.state.RuleDescription
            obj.RuleType=this.state.RuleType
            this.props.queryClick(obj)
        })
    }
}
export default FromList