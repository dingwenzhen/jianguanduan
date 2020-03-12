import React, { Fragment } from 'react'
import { Input, Button } from 'antd'
class SeeFrom extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    render() {
        console.log(this.props.SeeData)
        return (
            <Fragment>
                <div style={{ padding: '10px' }}>
                    <span style={{ display: 'block' }}>
                        <span style={{ width: '100px', display: 'inline-block' }}>规则号：</span>
                        <Input style={{ width: '300px' }} value={this.props.SeeData.RuleNumber}
                            disabled />
                    </span>
                    <span style={{ display: 'block', marginTop: '10px' }}>
                        <span style={{ width: '100px', display: 'inline-block' }}>规则描述：</span>
                        <Input style={{ width: '300px' }} value={this.props.SeeData.RuleDescription}
                            disabled />
                    </span>
                    <span style={{ display: 'block', marginTop: '10px' }}>
                        <span style={{ width: '100px', display: 'inline-block' }}>源表名：</span>
                        <Input style={{ width: '300px' }} value={this.props.SeeData.SourceName}
                            disabled />
                    </span>
                    <span style={{ display: 'block', marginTop: '10px' }}>
                        <span style={{ width: '100px', display: 'inline-block' }}>规则类型：</span>
                        <Input style={{ width: '300px' }} value={this.props.SeeData.RuleType}
                            disabled />
                    </span>
                    <span style={{ display: 'block', marginTop: '10px' }}>
                        <span style={{ width: '100px', display: 'inline-block' }}>规则类型：</span>
                        <Input style={{ width: '300px' }} value={this.props.SeeData.standardType}
                            disabled />
                    </span>
                    
                    <div style={{marginTop:'10px'}}>
                        <Button type="primary" onClick={this.queryClick.bind(this)}>确定</Button>
                        <Button style={{ marginLeft: '10px' }} onClick={this.ClearClick.bind(this)}>取消</Button>
                    </div>
                </div>
            </Fragment>
        )
    }
    queryClick() {
        this.props.ClearClick()
    }
    ClearClick() {
        this.props.ClearClick()
    }
}
export default SeeFrom