import React, { Fragment } from 'react'
import { Steps, Button, message, Input } from 'antd';
import Frist from './First'
import Second from "./Two"
import Three from './Three'
import { NewSupervisorApi } from '@api/Home/Organizational'
const { Step } = Steps;
class NewInstitution extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            FristData: {
                OrganizationName: '',//银行机构名称
                OrganizationCode: '',//银行机构代码
                LicenseLey: '',//金融许可证号
                BankOffice: '',//银行办公地点
                PostalAddress: '',//银行通信地址
                ContactName: '',//联系人姓名
                ContactNumber: '',//联系人电话
                ContactEmail: '',//联系人电子邮箱
            },
            TwoData: [],
            Three: []
        };
    }
    render() {
        const steps = [
            {
                title: '填写银行机构信息',
            },
            {
                title: '分配主监管员',
            },

        ]
        const { current } = this.state;
        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-<span onClick={this.goBack.bind(this)} style={{cursor:'pointer'}}>机构管理</span>-添加机构
                </div>
                <div style={{ padding: '10px' }}>
                    <Steps current={current}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>

                    <div className="steps-content" style={{ position: 'relative' }}>
                        {
                            steps[current].title == '填写银行机构信息' ? <Frist
                            FristData={this.state.FristData} NextStep={this.FristNextStep.bind(this)} /> : ''
                        }
                        {
                            steps[current].title == '分配主监管员' ? <Second TwoNextStep={this.TwoNextStep.bind(this)}
                                TwoPreviousStep={this.prev.bind(this)} /> : ''
                        }

                    </div>


                </div>
            </Fragment>
        )
    }
    componentDidMount(){
        console.log(this)
    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    // 第一个的下一步
    FristNextStep(val) {
        const current = this.state.current + 1;
        this.setState({
            current: current,
            FristData: { ...val }
        }, () => {
            console.log(this.state.FristData)
        });
    }
    // 第二个的下一步
    async TwoNextStep(val) {
        let obj = { zVoList: val, ...this.state.FristData }
        let data = await NewSupervisorApi(obj)
        console.log(data, '添加')
        if (data.msg == '成功') {
            this.props.history.push('/Home/Organizational')
            this.success('机构添加成功')
        } else {
            this.error(data.msg)
        }
    }
    // 第三个的完成
    // 第一个的下一步
    ThreeNextStep(val) {
        console.log(val)
    }
    success = (val) => {
        message.success(val);
    }
    error = (val) => {
        message.error(val);
    }
    goBack(){
        this.props.history.push('/Home/Organizational')
    }
}
export default NewInstitution