import React, { Fragment } from 'react'
import { DatePicker, Input, Button } from 'antd';
import moment from 'moment';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
class FromList extends React.Component {
    constructor() {
        super()
        this.state = {
            TaskData: '',
            collectionData: '',
            fileData: '',
            BankName: ''
        }
    }
    render() {
        return (
            <Fragment>
                <div style={{ padding: '10px' }}>
                    <span>
                        采集日期：<DatePicker onChange={this.onChange.bind(this)}/>
                    </span>
                    <span style={{ marginLeft: '10px' }}>
                        文件名称：<Input onChange={this.fileDataInput.bind(this)} style={{ width: '150px' }}
                            value={this.state.fileData} />
                    </span>
                    <span style={{ marginLeft: '10px' }}>
                        上报任务号：<Input style={{ width: '150px' }}
                            value={this.state.TaskData}
                            onChange={this.TaskData.bind(this)} />
                    </span>
                    <span style={{ marginLeft: '10px' }}>
                        银行名称：<Input style={{ width: '150px' }}
                            value={this.state.BankName}
                            onChange={this.BankNameInput.bind(this)} />
                    </span>
                    <Button style={{ marginLeft: '20px' }} onClick={this.queryData.bind(this)} type="primary">查询</Button>
                    <Button style={{ marginLeft: '20px' }} onClick={this.ResetData.bind(this)}  >重置</Button>
                </div>
            </Fragment>
        )
    }
    componentDidMount() {

    }
    // 采集日期
    onChange(date, dateString) {
        this.setState({
            collectionData: dateString
        })
    }
    // 文件名称
    fileDataInput(e) {
        this.setState({
            fileData: e.target.value
        })
    }
    // 上报任务号
    TaskData(e) {
        this.setState({
            TaskData: e.target.value
        })
    }
    // 银行名称
    BankNameInput(e) {
        this.setState({
            BankName: e.target.value
        })
    }
    // 查询
    queryData() {
        let FromList = {}
        let arr = this.state.collectionData.split('-')
        let str = ''
        for (var i = 0; i < arr.length; i++) {
            str += arr[i]
        }
        FromList.collectionData = str
        FromList.fileData = this.state.fileData
        FromList.TaskData = this.state.TaskData
        FromList.BankName = this.state.BankName
        this.props.queryData(FromList)
    }
    ResetData() {
        this.setState({
            TaskData: '',
            collectionData: '',
            fileData: '',
            BankName: ''
        }, () => {
            this.queryData()
        })
    }
}
export default FromList