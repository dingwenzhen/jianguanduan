import React, { Fragment } from 'react'
import { Input, Select, Button, Icon ,message} from 'antd'
import { ToltalChiefSupervisor, marshalApi } from '@api/Home/Organizational'
const { Option } = Select;
class Second extends React.Component {
    constructor() {
        super()
        this.state = {
            mockData: [],
            InputData: '',
            data: [],
            selectedRowKeys: [],//选中的事哪个
            tableList: [],
            dataList: [],
            supervise: [],
            implement: []
        }
    }

    render() {
        const columns = [
            {
                title: '全选',
                dataIndex: 'name',
                width: 150,
            }
        ]

        const rowSelection = {
            onChange: this.TableOnchange.bind(this),
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        }
        return (
            <Fragment>
                <div style={{ position: 'absolute', right: '0', left: '0', margin: 'auto', width: '500px', top: '20px' }}>
                    {
                        this.state.tableList.map((item, index) => {
                            return <div className='NewSupervisor' key={index}>
                                <div style={{ marginTop: '20px' }}>
                                    <span style={{ width: '100px', display: 'inline-block' }}>主监管员：</span>
                                    <Select

                                        style={{ width: '320px', marginLeft: '10px' }}
                                        placeholder="请选择主监管员"
                                        onChange={this.ChiefSupervisor.bind(this, index)}
                                    >
                                        {
                                            item.supervise.map(item => {
                                                return <Option key={item.supervisorId} >{item.jgyname}</Option>
                                            })
                                        }
                                    </Select>
                                    <Icon style={{ display: 'inline-block', fontSize: '20px', marginLeft: '10px' }}
                                        onClick={this.NewSupervisor.bind(this)} type="plus-circle" />
                                    <Icon type="minus-circle" style={{ display: 'inline-block', fontSize: '20px', marginLeft: '10px' }}
                                        onClick={this.SubtractClick.bind(this, index)} />
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <span style={{ width: '100px', display: 'inline-block' }}>监管执行员：</span>
                                    <Select
                                        mode="multiple"
                                        style={{ width: '320px', marginLeft: '10px' }}
                                        placeholder="请选择监管执行员"
                                        onChange={this.handleChange.bind(this, index)}
                                    >
                                        {
                                            item.implement.map(item => {
                                                return <Option key={item.executorId} >{item.zxrname}</Option>
                                            })
                                        }
                                    </Select>
                                </div>
                            </div>
                        })
                    }
                    <div style={{ marginTop: '20px' }}>
                        <Button type="primary" onClick={this.NextStep.bind(this)}>完成</Button>
                        <Button onClick={this.PreviousStep.bind(this)} style={{ marginLeft: '20px' }}>上一步</Button>
                    </div>
                </div>
            </Fragment>
        )
    }
    async componentDidMount() {
        let data = await ToltalChiefSupervisor()
        let tableList = this.state.tableList
        let dataList = this.state.dataList
        let obj = {}
        obj.supervise = data.data.jgy
        obj.implement = []
        tableList.push(obj)
        this.setState({
            tableList,
            supervise: data.data.jgy,
            dataList: [{}]
        })
    }
    InputChange(value) {
        let data = this.state.data
        let ArrayData = []
        ArrayData = data.filter(function (t) {
            return t.name.indexOf(value) > -1;
        })
        this.setState({
            InputData: value,
            data: ArrayData
        })
    }
    // 请选择监管执行员
    handleChange(index, value) {
        console.log(value, index)
        let tableList = this.state.tableList
        let dataList = this.state.dataList
        dataList[index].zxrIds = value
        console.log(tableList, '请选择监管执行员')
        tableList[index].zxrIds = value
        console.log(index)
        this.setState({
            tableList
        })
    }
    // 主监管员的下拉
    async ChiefSupervisor(index, value) {
        console.log(value, index)
        let tableList = this.state.tableList
        let dataList = this.state.dataList
        dataList[index].jgyId = value
        dataList[index].deptId = tableList[index].supervise[index].deptId
        let data = await marshalApi(value)
        console.log(tableList, '主监管员的下拉')
        tableList[index].implement = data.data.zxr
        this.setState({
            tableList,
            dataList
        })
    }
    // 新增监管员+执行人
    NewSupervisor() {
        let tableList = this.state.tableList
        let dataList = this.state.dataList
        if (tableList.length > 2) {
            return
        }
        let obj = {}
        dataList.push({})
        obj.supervise = this.state.supervise
        obj.implement = []
        tableList.push(obj)
        this.setState({
            tableList, dataList
        })
    }
    // 减去数组中的第几项
    SubtractClick(index) {
        let tableList = this.state.tableList
        let dataList = this.state.dataList
        dataList.splice(index, 1)
        tableList.splice(index, 1)
        this.setState({
            tableList,
            dataList
        })
    }
    // 下一步
    NextStep() {
        if (!this.state.dataList[0].jgyId) {
            this.error('主监管员不能为空')
        }else if(!this.state.dataList[0].zxrIds){
            this.error('监管执行员不能为空')
        }else{
            this.props.TwoNextStep(this.state.dataList)
        }
    }
    // 上一步
    PreviousStep() {
        this.props.TwoPreviousStep()
    }
    TableOnchange = (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys)
        this.setState({
            selectedRowKeys: selectedRowKeys
        })
    }
    error = (val) => {
        message.error(val);
    }
}
export default Second