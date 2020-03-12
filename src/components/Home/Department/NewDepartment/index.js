import React, { Fragment } from 'react'
import { Input, Select, Button, Icon } from 'antd'
import { findSuperviseApi } from '@api/Home/Department'
const { Option } = Select;
class NewDepartment extends React.Component {
    constructor() {
        super()
        this.state = {
            ChiefSupervisor: [],//主监管员：
            SupervisionExecutive: [],//监管执行员：
            DepartmentName: '',//部门名称
            supervise: [],
            implement: [],
            tableList: [{}]
        }
    }
    render() {
        const children = [];
        for (let i = 10; i < 36; i++) {
            children.push(<Option style={{ position: 'relative', zIndex: 4 }} key={i.toString(36) + i}>{i.toString(36) + i}
            </Option>);
        }
        return (
            <Fragment>
                <div>
                <i style={{ display: 'inline-block', width: '10px', color: 'red' }}>*</i>
                <span style={{ width: '90px', display: 'inline-block' }}>部门名称：</span>
                    <Input style={{ width: '320px', marginLeft: '10px' }}
                        value={this.state.DepartmentName}
                        onChange={this.DepartmentNameInput.bind(this)} />
                        <Icon style={{ display: 'inline-block', fontSize: '20px', marginLeft: '10px' }}
                                    onClick={this.NewSupervisor.bind(this)} type="plus-circle" />
                </div>
                {
                    this.state.tableList.map((item, index) => {
                        return <div className='NewSupervisor' key={index}>
                            <div style={{ marginTop: '20px' }}>
                            <i style={{ display: 'inline-block', width: '10px', color: 'red' }}>*</i>  
                            <span style={{ width: '90px', display: 'inline-block' }}>主监管员：</span>
                                <Select
                                    style={{ width: '320px', marginLeft: '10px' }}
                                    placeholder="请选择主监管员"
                                    onChange={this.ChiefSupervisor.bind(this,index)}
                                >
                                    {
                                        this.state.supervise.map(item => {
                                            return <Option key={item.id} >{item.name}</Option>
                                        })
                                    }
                                </Select>
                                <Icon type="minus-circle" style={{ display: 'inline-block', fontSize: '20px', marginLeft: '10px' }}
                                onClick={this.SubtractClick.bind(this,index)}/>
                            </div>
                            <div style={{ marginTop: '20px' }}>
                            <i style={{ display: 'inline-block', width: '10px', color: 'red' }}>*</i>  
                            <span style={{ width: '90px', display: 'inline-block' }}>监管执行员：</span>
                                <Select
                                    mode="multiple"
                                    style={{ width: '320px', marginLeft: '10px' }}
                                    placeholder="请选择监管执行员"
                                    onChange={this.handleChange.bind(this,index)}
                                >
                                    {
                                        this.state.implement.map(item => {
                                            return <Option key={item.id} >{item.name}</Option>
                                        })
                                    }
                                </Select>
                            </div>
                        </div>
                    })
                }
                <div style={{ marginTop: '20px' }}>
                    <Button type="primary" onClick={this.DetermineClick.bind(this)}>确定</Button>
                    <Button onClick={this.ClearClick.bind(this)} style={{ marginLeft: '20px' }}>取消</Button>
                </div>
            </Fragment>
        )
    }
    async componentDidMount() {
        let data = await findSuperviseApi()
        this.setState({
            supervise: data.data.supervise,
            implement: data.data.implement
        })
        console.log(data)
    }
    // 请选择监管执行员
    handleChange(index,value) {
        console.log(value,index)
        let tableList = this.state.tableList
        console.log(tableList,'请选择监管执行员')
        tableList[index].zxrIds = value
        console.log(index)
        this.setState({
            tableList
        })
    }
    // 主监管员的下拉
    ChiefSupervisor(index,value) {
        console.log(value,index)
        let tableList = this.state.tableList
        console.log(tableList,'主监管员的下拉')
        tableList[index].jgyId = value
        this.setState({
            tableList
        })
    }
    // 确定
    DetermineClick() {
        let obj = {}
        obj.title = this.state.DepartmentName
        obj.tableList = this.state.tableList
        console.log(obj)
        this.props.DetermineClick(obj)
    }
    // 部门名称
    DepartmentNameInput(e) {
        this.setState({
            DepartmentName: e.target.value
        })
    }
    ClearClick() {
        this.setState({
            ChiefSupervisor: '',//主监管员：
            SupervisionExecutive: '',//监管执行员：
            DepartmentName: ''//部门名称
        }, () => {
            this.props.ClearClick()
        })
    }
    // 新增监管员+执行人
    NewSupervisor() {
        let tableList = this.state.tableList
        if(tableList.length>2){
            return 
        }
        let obj = {}
        tableList.push(obj)
        this.setState({
            tableList
        })
    }
    // 减去数组中的第几项
    SubtractClick(index){
        let tableList = this.state.tableList
        tableList.splice(index,1)
        this.setState({
            tableList
        })
    }
}
export default NewDepartment