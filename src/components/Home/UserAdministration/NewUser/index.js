import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Steps, Button, message } from 'antd';
import UserInformation from './UserInformation'
import PassWord from './PassWord'
import BankingInstitution from './BankingInstitution'
import { TotalDepartment, TotalRoleApi,NewlyAddedApi } from '@api/Home/UserAdministration'
const { Step } = Steps;
class NewUser extends React.Component {
    constructor() {
        super()
        this.state = {
            current: 1,
            UserInformationData: {
                LoginName: '',
                UserName: '',
                email: '',
                Iphone: '',
                Department: '',
                SelectDepartment: [],
                RoleList: [],
                Role: ''
            },//用户信息 默认数据
            OneData: {},//用户信息组件传过来的
            TwoData: {
                password: '',
                confirmPassword: ''
            }
        }
    }
    render() {
        const { current } = this.state
        const steps = [
            {
                title: '填写用户信息',
            },
            {
                title: '输入密码',
            },
            {
                title: '分配银行机构',
            },
        ]
        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-<span style={{ cursor: 'pointer' }} onClick={this.userManagement.bind(this)}>用户管理</span>-新增用户
                </div>
                <div style={{padding:'20px'}}>
                    <Steps current={current}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                    <div className="steps-content" style={{ position: 'relative'}}>
                        {
                            this.state.current == 0 ? <UserInformation UserInformationData={this.state.UserInformationData}
                                Next={this.NextStep.bind(this)} /> : ''
                        }
                        {
                            this.state.current == 1 ? <PassWord TwoData={this.state.TwoData} TwoNext={this.TwoNext.bind(this)}
                                TwoBack={this.TwoBack.bind(this)} /> : ''
                        }
                        {
                            this.state.current == 2 ? <BankingInstitution TwoPreviousStep={this.prev.bind(this)}
                                ThreeNext={this.ThreeNext.bind(this)} /> : ''
                        }
                    </div>

                </div>
            </Fragment>
        )
    }
    componentDidMount() {
        this.TotalDepartmentList()//获取所有的部门
        this.ToltalRoleList()//获取所有角色
    }
    async TotalDepartmentList() {
        let data = await TotalDepartment()
        let UserInformationData = this.state.UserInformationData
        UserInformationData.SelectDepartment = data.data
        this.setState({
            UserInformationData
        })
    }
    async ToltalRoleList() {
        let data = await TotalRoleApi()
        let UserInformationData = this.state.UserInformationData
        UserInformationData.RoleList = data.data
        this.setState({
            UserInformationData
        })
        console.log(data)
    }
    // 跳转到用户管理页面
    userManagement() {
        this.props.history.goBack()
    }
    next() {
        console.log(11)
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    // 第一个的下一步
    NextStep(val,value) {
        console.log(arguments)
        this.setState({
            OneData: val,
            UserInformationData:{...value}
        }, () => {
            this.next()
        })
    }
    // 第二个的下一步
    TwoNext(val) {
        this.setState({
            TwoData: val
        }, () => {
            this.next()
        })
    }
    // 第二个的上一步
    TwoBack() {
        this.prev()
    }
    // 第三个完成
    async ThreeNext(val) {
        console.log(this.state.TwoData)
        let obj = { ...this.state.OneData, ...this.state.TwoData, orgCode: val }
        console.log(obj)
        let data = await NewlyAddedApi(obj)
        if(data.msg == '成功'){
            this.success('添加成功')
            this.props.history.push('/Home/UserAdministration')
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
export default withRouter(NewUser)