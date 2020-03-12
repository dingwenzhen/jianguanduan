import React, { Fragment } from 'react'
import { Input, Select, Button, Icon } from 'antd'
import { ToltalChiefSupervisor, marshalApi, } from '@api/Home/Organizational'
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
            implement: [],
            Toltal: [],//默认的全部主监管员，后端获取
            length: 0
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
                                    {
                                        Boolean(item.jgyname) ? <div>
                                            <span style={{ width: '100px', display: 'inline-block' }}>主监管员：</span>
                                            <Select
                                                value={item.jgyname}
                                                style={{ width: '320px', marginLeft: '10px' }}
                                                onChange={this.ChiefSupervisor.bind(this, index)}
                                            >
                                                {
                                                    item.supervise.map(itm => {
                                                        return <Option key={itm.supervisorId}>{itm.jgyname}</Option>
                                                    })
                                                }
                                            </Select>
                                            <Icon style={{ display: 'inline-block', fontSize: '20px', marginLeft: '10px' }}
                                                onClick={this.NewSupervisor.bind(this)} type="plus-circle" />
                                            <Icon type="minus-circle" style={{ display: 'inline-block', fontSize: '20px', marginLeft: '10px' }}
                                                onClick={this.SubtractClick.bind(this, index)} />
                                        </div> : <div>
                                                <span style={{ width: '100px', display: 'inline-block' }}>主监管员：</span>
                                                <Select
                                                    style={{ width: '320px', marginLeft: '10px' }}
                                                    onChange={this.ChiefSupervisor.bind(this, index)}
                                                >
                                                    {
                                                        item.supervise.map(itm => {
                                                            return <Option key={itm.supervisorId}>{itm.jgyname}</Option>
                                                        })
                                                    }
                                                </Select>
                                                <Icon style={{ display: 'inline-block', fontSize: '20px', marginLeft: '10px' }}
                                                    onClick={this.NewSupervisor.bind(this)} type="plus-circle" />
                                                <Icon type="minus-circle" style={{ display: 'inline-block', fontSize: '20px', marginLeft: '10px' }}
                                                    onClick={this.SubtractClick.bind(this, index)} />
                                            </div>
                                    }

                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <span style={{ width: '100px', display: 'inline-block' }}>监管执行员：</span>
                                    {
                                        Boolean(item.zxrIds) ? <Select
                                            mode="multiple"
                                            style={{ width: '320px', marginLeft: '10px' }}
                                            value={item.Dafaultimplement}
                                            onChange={this.handleChange.bind(this, index)}
                                            onFocus={this.onFocus.bind(this, index, item)}
                                        >
                                            {
                                                item.zxrIds.map(iem => {
                                                    return <Option key={iem.executorId} >{iem.zxrname}</Option>
                                                })
                                            }
                                        </Select> : <Select
                                            mode="multiple"
                                            style={{ width: '320px', marginLeft: '10px' }}
                                            onChange={this.handleChange.bind(this, index)}
                                        >
                                                {
                                                    item.zxrIds.map(iem => {
                                                        return <Option key={iem.executorId} >{iem.zxrname}</Option>
                                                    })
                                                }
                                            </Select>
                                    }
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
        let dataList = this.state.dataList
        let TwoList = this.props.TwoLsit
        let data = await ToltalChiefSupervisor()
        console.log(TwoList, 111)
        let tableList = this.state.tableList
        if (TwoList[0]) {
            for (var i = 0; i < data.data.jgy.length; i++) {
                for (var j = 0; j < TwoList.length; j++) {
                    if (data.data.jgy[i].supervisorId == TwoList[j].jgyId) {
                        let obj = {}
                        let arr = {}
                        obj.jgyId = data.data.jgy[i].supervisorId
                        obj.jgyname = data.data.jgy[i].jgyname
                        obj.supervise = data.data.jgy
                        let List = []
                        let IdList = []
                        if (TwoList[j].checkZxrList) {
                            for (var m = 0; m < TwoList[j].checkZxrList.length; m++) {
                                IdList.push(TwoList[j].checkZxrList[m].executorId)
                                List.push(TwoList[j].checkZxrList[m].zxrname)
                            }
                        } else {
                            IdList=[]
                            List = []
                        }
                        obj.Dafaultimplement = List
                        obj.zxrIds = []
                        arr.zxrIds = IdList
                        arr.jgyId = data.data.jgy[i].supervisorId
                        dataList.push(arr)
                        tableList.push(obj)
                    }
                }
            }
        } else {
            let obj = {}
            obj.Dafaultimplement = []
            obj.supervise = data.data.jgy
            obj.jgyname = ''
            obj.zxrIds = data.data.jgy
            tableList.push(obj)
            dataList= [{}]
        }
        this.setState({
            tableList,
            dataList,
            Toltal: data.data.jgy,
            length: tableList.length
        })

    }
    async InputChange(value) {
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
    // jujiao
    async onFocus(index, value) {
        let tableList = this.state.tableList
        let data = await marshalApi(value.jgyId)
        if (!Boolean(data.data.zxr[0])) {
            tableList[index].zxrIds = []
        } else {
            tableList[index].zxrIds = data.data.zxr
        }
        this.setState({
            tableList
        })
    }
    // 请选择监管执行员
    handleChange(index, value) {
        let dataList = this.state.dataList
        dataList[index].zxrIds = value
        let tableList = this.state.tableList
        tableList[index].Dafaultimplement = value
        this.setState({
            dataList, tableList
        })

    }
    // 主监管员的下拉
    async ChiefSupervisor(index, value) {
        let dataList = this.state.dataList
        dataList[index].jgyId = value
        let tableList = this.state.tableList
        tableList[index].jgyId = value
        tableList[index].jgyname = value
        this.setState({
            dataList, tableList
        })
    }
    // 新增监管员+执行人
    NewSupervisor() {
        let tableList = this.state.tableList
        let dataList = this.state.dataList
        let Toltal = this.state.Toltal
        let obj = {}
        dataList.push({})
        obj.supervise = Toltal
        obj.zxrIds = []
        obj.Dafaultimplement = []
        obj.jgyname = ''
        tableList.push(obj)
        this.setState({
            tableList, dataList
        })

    }
    // 减去数组中的第几项
    SubtractClick(index) {
        let tableList = this.state.tableList
        let dataList = this.state.dataList
        let length = this.state.length
        length = length - 1
        dataList.splice(index, 1)
        tableList.splice(index, 1)
        this.setState({
            tableList,
            dataList, length
        })
    }
    // 下一步
    NextStep() {
        this.props.TwoNextStep(this.state.dataList)
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

}
export default Second