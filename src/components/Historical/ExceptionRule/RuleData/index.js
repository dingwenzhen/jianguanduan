import React, { Fragment } from 'react'
import { Input, DatePicker, Button, message } from 'antd'
class RuleData extends React.Component {
    constructor() {
        super()
        this.state = {
            data: ''
        }
    }
    render() {
        return (
            <Fragment>
                <div style={{ position: 'absolute', width: '400px', left: '0', right: '0', margin: 'auto', top: '20px' }}>
                    <div>
                        <i style={{ display: 'inline-block', width: '10px', color: 'red' }}>*</i>
                        <span>选择采集日期：</span>
                        <DatePicker placeholder={this.props.FristData} onChange={this.onChange.bind(this)} style={{ width: '250px' }} />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Button type='primary' onClick={this.NextDate.bind(this)}>下一步</Button>
                    </div>
                </div>
            </Fragment>
        )
    }
    componentDidMount() {
        if (this.props.FristData.length > 0) {
            let FristData = this.props.FristData
            this.setState({
                data: FristData
            })
        }
    }
    onChange(date, dateString) {
        this.setState({
            data: dateString
        })
    }
    // 下一步
    NextDate() {
        if (this.state.data == '请选择日期') {
            this.error()
        } else {
            this.props.OneNextDate(this.state.data)
        }
    }
    error = () => {
        message.error('请选择采集日期');
    }
}
export default RuleData