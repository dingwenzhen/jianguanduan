import React, { Fragment } from 'react'
import { Input, Button, message } from 'antd'

class PassWord extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.TwoData
    }
    render() {
        return (
            <Fragment>
                <div style={{width:'330px',position:'absolute',right:'0',left:'0',margin:'auto'}}>
                    <div style={{ marginTop: '20px' }}>
                        <span style={{ width: '80px' }}>输入密码：</span>
                        <Input.Password style={{ width: '250px' }} onChange={this.OnePassword.bind(this)} value={this.state.password} />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <span style={{ width: '80px' }}>输入密码：</span>
                        <Input.Password style={{ width: '250px' }} onChange={this.TwoPassword.bind(this)} value={this.state.confirmPassword} />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Button type='primary' onClick={this.NextStep.bind(this)}>下一步</Button>
                        <Button onClick={this.GoBack.bind(this)} style={{ marginLeft: '20px' }}>上一步</Button>
                    </div>
                </div>
            </Fragment>
        )
    }
    OnePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    TwoPassword(e) {
        this.setState({
            confirmPassword: e.target.value
        })
    }
    NextStep() {
        if (this.state.password == this.state.confirmPassword && this.state.password && this.state.confirmPassword) {
            let obj = {}
            obj.password = this.state.password
            obj.confirmPassword = this.state.confirmPassword
            this.props.TwoNext(obj)
        } else {
            this.error('请您输入正确的密码')
        }
    }
    GoBack() {
        this.props.TwoBack()
    }
    error = (val) => {
        message.error(val);
    }
}
export default PassWord