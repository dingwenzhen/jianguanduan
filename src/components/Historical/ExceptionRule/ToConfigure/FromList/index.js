import React, { Fragment } from 'react'
import { Input, Button, Select } from 'antd'
import { SelectDataApi } from '@api/Historica/ExceptionRule'

const { Option } = Select;
class FromList extends React.Component {
    constructor() {
        super()
        this.state = {
            ruleData: '',
            ruleDescribe: '',
            ruleType: '',
            ruleSelect: '',
            SelectDafault:[]
        }
    }
    render() {
        return (
            <Fragment>
                <span>规则号：<Input style={{ width: '150px' }} value={this.state.ruleData}
                    onChange={this.ruleDataInput.bind(this)} /></span>
                <span style={{marginLeft:'10px'}}>规则描述：<Input style={{ width: '150px' }} value={this.state.ruleDescribe}
                    onChange={this.ruleDescribeInput.bind(this)} /></span>
                <span style={{marginLeft:'10px'}}>规则类型：<Input style={{ width: '150px' }} value={this.state.ruleType}
                    onChange={this.ruleTypeInput.bind(this)} /></span>
                <span style={{marginLeft:'10px'}}>规则标准：<Select value={this.state.ruleSelect} style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                    {
                        this.state.SelectDafault.map((item,index)=>{
                            return <Option key={index} value={item}>{item}</Option>
                        })
                    }
                </Select></span>
                <Button style={{marginLeft:'10px'}} type='primary' onClick={this.queryClick.bind(this)}>查询</Button>
                <Button style={{marginLeft:'10px'}} onClick={this.cancelClick.bind(this)}>重置</Button>
            </Fragment>
        )
    }
    componentDidMount() {
        // 获取规则标准的下拉
        this.SelectDafault()
    }
    async SelectDafault() {
        let data = await SelectDataApi()
        console.log(data)
        this.setState({
            SelectDafault:data.data,
            ruleSelect:data.data[0]
        },()=>{
            this.queryClick()
        })
    }
    // 查询
    queryClick() {
        let obj = {}
        obj.ruleData = this.state.ruleData
        obj.ruleDescribe = this.state.ruleDescribe
        obj.ruleType = this.state.ruleType
        obj.ruleSelect = this.state.ruleSelect
        this.props.queryClick(obj)
    }
    // 重置
    cancelClick() {
        let selectDafault = this.state.ruleSelect
        console.log(selectDafault,'789')
        this.setState({
            ruleData: '',
            ruleDescribe: '',
            ruleType: '',
            ruleSelect: selectDafault
        }, () => {
            let obj = {}
            obj.ruleData = this.state.ruleData
            obj.ruleDescribe = this.state.ruleDescribe
            obj.ruleType = this.state.ruleType
            obj.ruleSelect = this.state.ruleSelect
            this.props.queryClick(obj)
        })
    }
    // 规则号
    ruleDataInput(e) {
        this.setState({
            ruleData: e.target.value
        })
    }
    // 规则描述
    ruleDescribeInput(e) {
        this.setState({
            ruleDescribe: e.target.value
        })
    }
    // 规则类型
    ruleTypeInput(e) {
        this.setState({
            ruleType: e.target.value
        })
    }
    handleChange(value) {
        this.setState({
            ruleSelect: value
        })
        console.log(`selected ${value}`);
    }
}
export default FromList