import React,{Component} from "react"
import {LoginWrapper} from "./styled"
import { Form, Input, Button } from 'antd';
import connect from "./connect";
import {LoginApi} from '@api'
import Cookies from 'js-cookie'

@connect
@Form.create()
class Login extends Component{
    constructor(){
        super()
        this.state={
            username:'',
            password:''
        }
    }
    render(){
        return (
            <LoginWrapper>
                <div className="loginContainer">
                    <div className="logo">
                        
                    </div>
                    <Input placeholder='请填写用户名' value={this.state.username} onChange={this.usernameInput.bind(this)} />
                    <Input.Password placeholder="请输入密码"  style={{marginTop:'20px'}} value={this.state.password} onChange={this.passwordInput.bind(this)} />
                    <Button type='primary' onClick={this.ClickInput.bind(this)} style={{width:'100%',marginTop:'20px'}} >登录</Button>
                </div>
            </LoginWrapper>
        )
    }
    usernameInput(e){
        this.setState({
            username:e.target.value
        })
    }
    passwordInput(e){
        this.setState({
            password:e.target.value
        })
    }
    async ClickInput(){
        let obj = {}
        obj.username = this.state.username
        obj.password = this.state.password
        let data = await LoginApi(obj)
        
        if(data.msg == '成功'){
            Cookies.set(data.data.token,JSON.stringify(data.data.value))
            this.props.history.push('/Administration/Reporting')
        }
    }
}

export default Login;