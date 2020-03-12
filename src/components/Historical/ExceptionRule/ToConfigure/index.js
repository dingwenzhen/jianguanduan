import React, { Fragment } from 'react'
import FromList from './FromList/index'
import { Table, Pagination, Button, Input,InputNumber } from 'antd'
import { TableQueryApi, SelectDataApi, GroupByRuleType } from '@api/Historica/ExceptionRule'
class ToConfigure extends React.Component {
    constructor() {
        super()
        this.state = {
            SelectDafault: [],
            page: 1,
            totalCount: 10,
            standTypeList: [],
            ruleTypeSelect: [],
            totalInput: '',
            AllList: [],//这个是所有改变的
            ruleList: [],
            ruleData: '',
            queryData: {
                ruleData: '',
                ruleDescribe: '',
                ruleType: '',
                ruleSelect: ''
            },
            data: []
        }
    }
    render() {
        const columns = [
            {
                title: '规则号',
                dataIndex: 'ruleSeq',
            },
            {
                title: '规则描述',
                dataIndex: 'ruleDesc',
            },
            {
                title: '规则类型',
                dataIndex: 'ruleType',
                filters: this.state.ruleTypeSelect,
                filterMultiple: false,
                onFilter: (value, record) => record.ruleType.indexOf(value) === 0,
            },
            {
                title: '规则标准类型',
                dataIndex: 'standardType',
                filters: this.state.standTypeList,
                filterMultiple: false,
                onFilter: (value, record) => record.standardType.indexOf(value) === 0,
            },
            {
                title: '数据质量标准',
                dataIndex: 'exceptionRatio',
                width: 180,
                filterMultiple: false,
                sorter: (a, b) => a.exceptionRatio.length - b.exceptionRatio.length,
                render: (text, record) => <InputNumber
                defaultValue={100}
                min={0}
                max={100}
                formatter={value => {
                    if(value == ''){
                        return ''
                    }else{
                        return `${value}%`
                    }
                }}
                parser={value => value.replace('%', '')}
                onChange={this.ruleQualityInput.bind(this, record)}
                style={{ border: '1px solid #f4f4f4' }}
                value={record.exceptionRatio}
              />
                // <Input style={{ border: '1px solid #f4f4f4' }}
                //     onChange={this.ruleQualityInput.bind(this, record)} value={record.exceptionRatio} />
            },
        ];
        return (
            <Fragment>
                <div style={{ marginTop: '20px' }} className='jindu'>
                    <FromList queryClick={this.queryClick.bind(this)} />
                    <Table className='supervisorTableFY' style={{ marginTop: '20px', backgroundColor: '#fff' }}
                        columns={columns} dataSource={this.state.data} onChange={this.onChange.bind(this)} />
                    <div className='jindu'>
                        <Pagination style={{ float: 'right', marginTop: '20px' }} showQuickJumper defaultCurrent={this.state.page} total={this.state.totalCount} onChange={this.pageData.bind(this)} />

                    </div>
                    <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
                        <Button onClick={this.GoBackClick.bind(this)}>上一步</Button>
                        <Button style={{ margin: '0 20px' }} onClick={this.PreservationClick.bind(this)}>保存</Button>
                        <Button onClick={this.LowerHairClick.bind(this)}>下发</Button>
                    </div>
                </div>

            </Fragment>
        )
    }
    componentDidMount() {
        let _this = this
        let input = document.createElement('input')
        let innder = document.querySelector('.ant-table-column-has-actions')
        innder.style.position = 'relative'
        input.innerText = '123'
        input.style.width = '60px'
        input.style.position = 'absolute'
        input.style.right = '10px'
        input.style.zIndex = '100'
        input.addEventListener('input', function (e) {
            console.log(e.target.value)
            let data = _this.state.data
            let AllList = _this.state.AllList
            if (AllList[0]) {
                for (var i = 0; i < AllList.length; i++) {
                    AllList[i].exceptionRatio = _this.toPercent(e.target.value)
                }
                for (var i = 0; i < data.length; i++) {

                    data[i].exceptionRatio = _this.toPercent(e.target.value)
                }
            } else {
                for (var i = 0; i < data.length; i++) {
                    data[i].exceptionRatio = _this.toPercent(e.target.value)
                    let obj = {}
                    obj.ruleSeq = data[i].ruleSeq
                    obj.ruleDesc = data[i].ruleDesc
                    obj.ruleType = data[i].ruleType
                    obj.standardType = data[i].standardType
                    obj.exceptionRatio = _this.toPercent(e.target.value)
                    AllList.push(obj)
                }
            }

            _this.setState({
                totalInput: _this.toPercent(e.target.value),
                data,
                AllList
            }, () => {
                console.log(_this.state.AllList, '全部')
            })
        })
        innder.appendChild(input)

        // 规则标准类型
        this.selectDafault()
        // ruleType 重点...
        this.ruleTypeSelect()
    }
    InputChange(e) {
        console.log(e.target.value)
    }
    async selectDafault() {
        let data = await SelectDataApi()
        console.log(data, '789')
        let array = []
        for (var i = 0; i < data.data.length; i++) {
            let obj = {}
            obj.text = data.data[i]
            obj.value = data.data[i]
            array.push(obj)
        }
        this.setState({
            standTypeList: array
        })
    }
    async ruleTypeSelect() {
        let data = await GroupByRuleType()
        console.log(data)
        let array = []
        for (var i = 0; i < data.data.length; i++) {
            if (data.data[i] != '') {
                let obj = {}
                obj.text = data.data[i]
                obj.value = data.data[i]
                array.push(obj)
            }
        }
        this.setState({
            ruleTypeSelect: array
        })
    }
    // 查询
    queryClick(val) {
        this.setState({
            queryData: val
        }, () => {
            this.DafaultData()
        })
    }
    onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    // 分页器
    pageData(pageNumber) {
        this.setState({
            page: pageNumber
        }, () => {
            this.DafaultData()
        })
    }
    // 保存
    PreservationClick() {
        let Fromdata = this.state.AllList
        // console.log(Fromdata)
        let FromList = []
        for (var i = 0; i < Fromdata.length; i++) {
            if (Fromdata[i].exceptionRatio != '') {
                Fromdata[i].exceptionRatio = Fromdata[i].exceptionRatio
                FromList.push(Fromdata[i])
            }
        }
        console.log(FromList)
        this.props.PreservationClick(this.state.queryData.ruleSelect, FromList)
        // console.log('保存')
    }
    toPoint(percent) {
        var str = percent.replace("%", "");
        str = str / 100;
        return str;
    }
    // 下发
    LowerHairClick() {
        console.log('下发')
    }
    // 分页+查询的获取数据
    async DafaultData() {
        let queryData = this.state.queryData
        let AllList = this.state.AllList
        let ListArray = []
        queryData.page = this.state.page
        let data = await TableQueryApi(queryData)
        console.log(data, '456')
        let AllListBool = Boolean(AllList[0])
        console.log(AllList[0], '777')
        if (AllListBool) {
            for (var j = 0; j < data.data.page.list.length; j++) {
                for (var i = 0; i < AllList.length; i++) {
                    if (AllList[i].ruleSeq == data.data.page.list[j].ruleSeq) {
                        data.data.page.list[j].exceptionRatio = AllList[i].exceptionRatio
                    } else {
                        data.data.page.list[j].exceptionRatio = this.toPercent(this.state.totalInput)

                        ListArray.push(data.data.page.list[j])
                    }
                    if (j == 9) {
                        ListArray = Array.from(new Set(ListArray))
                    }
                }
            }
        } else {
            for (var i = 0; i < data.data.page.list.length; i++) {
                data.data.page.list[i].exceptionRatio = this.toPercent(this.state.totalInput)
                AllList.push(data.data.page.list[i])
            }
        }
        console.log(ListArray, 'ListArray')
        ListArray = [...AllList, ...ListArray]
        let List = this.deteleObject(ListArray)
        this.setState({
            page: data.data.page.currPage,
            data: data.data.page.list,
            totalCount: data.data.page.totalCount,
            AllList: List
        })
    }
    // 去掉数组中重复的
    deteleObject(obj) {
        var uniques = [];
        var stringify = {};
        for (var i = 0; i < obj.length; i++) {
            var keys = Object.keys(obj[i]);
            keys.sort(function (a, b) {
                return (Number(a) - Number(b));
            });
            var str = '';
            for (var j = 0; j < keys.length; j++) {
                str += JSON.stringify(keys[j]);
                str += JSON.stringify(obj[i][keys[j]]);
            }
            if (!stringify.hasOwnProperty(str)) {
                uniques.push(obj[i]);
                stringify[str] = true;
            }
        }
        uniques = uniques;
        return uniques;
    }
    // 数据质量标准
    ruleQualityInput(e, value) {
        console.log(arguments[0])
        console.log(value,'789')
        let ruleList = arguments[0]
        let ruleData = value
        let _this = this
        console.log(_this.state.AllList, 'data')
        let TableData = _this.state.data
        let AllList = _this.state.AllList
        console.log(arguments, 'arguments')
        for (var i = 0; i < AllList.length; i++) {
            if (AllList[i].ruleSeq == ruleList.ruleSeq) {
                AllList[i].exceptionRatio = ruleData
            }
        }
        for (var j = 0; j < TableData.length; j++) {
            if (TableData[j].ruleSeq == ruleList.ruleSeq) {
                TableData[j].exceptionRatio = ruleData
            }
        }
        _this.setState({
            data: TableData,
            AllList
        }, () => {
            console.log(_this.state.AllList, 'hao')
        })
    }
    GoBackClick() {
        this.props.PreviousStep()
    }
    // 转换百分比
    toPercent(point) {
        if (point == '') {
            return ''
        } else if (point >= 100 || point >= 1) {
            return '100%'
        } else {
            var percent = Number(point * 100).toFixed(1);
            percent += "%";
            return percent;
        }

    }
}
export default ToConfigure