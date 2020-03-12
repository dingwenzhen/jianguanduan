import React, { Fragment } from 'react'
import { Steps, Button, message, Input } from 'antd';
import NewRoleOne from './NewRoleOne'
import NewRoleTwo from './NewRoleTwo'
import {EditApi} from '@api/Home/RoleManagement'
const { Step } = Steps;
class EditFrom extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            OneData: {}
        };
    }
    render(){
        const steps = [
            {
                title: '修改角色信息',
            },
            {
                title: '配置权限',
            }
        ]
        const { current } = this.state;
        return(
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-<span style={{cursor:'pointer'}} onClick={this.GoBack.bind(this)}>角色管理</span>-修改权限
                </div>
               
                <div style={{ padding: '10px' ,position:'relative'}}>
                    <Steps current={current} style={{width:'700px',position:'relative',left:'0px',right:'0px',margin:'auto'}}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                    <div className="steps-content" style={{ position: 'relative', marginTop: '20px' }}>
                        {
                            this.state.current == 0 ? <NewRoleOne NextSetpClick={this.OneNextSetpClick.bind(this)} /> : ''
                        }
                        {
                            this.state.current == 1 ? <NewRoleTwo clearClick={this.TwoClearClick.bind(this)} 
                            OKClick={this.OKClick.bind(this)} /> : ''
                        }
                    </div>

                </div>
            </Fragment>
        )
    }
    // GoBackClick
    GoBack(){
        this.props.history.push('/Home/RoleManagement')
    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    // diyige第一个的下一步
    OneNextSetpClick(val) {
        const current = this.state.current + 1;
        this.setState({
            current: current,
            OneData: { ...val }
        });
    }
    // 第二个的de上一步
    TwoClearClick(){
        const current = this.state.current - 1;
        this.setState({ current });
    }
    // dierge 完成
    async OKClick(val){
        let obj = {...this.state.OneData,permissionids:val}
        let data = await EditApi(obj)
        if(data.msg == '成功'){
            this.props.history.push('/Home/RoleManagement')
            this.success('修改成功')
        }else{
            this.error(data.msg)
        }
    }
    success = (val) => {
        message.success(val);
      }
      error = (val) => {
        message.error(val);
      }
}
export default EditFrom