import React, { Fragment } from 'react'
import { Steps, Button, message, Input } from 'antd';
import RuleData from './RuleData'
import SelectionRule from './SelectionRule'
import ToConfigure from './ToConfigure/index'
import { PreservationApi,LowerHairApi } from '@api/Historica/ExceptionRule/index.js'
const { Step } = Steps;
class ExceptionRule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            FristData: '请选择日期',
            TwoData: []
        };
    }
    render() {
        const steps = [
            {
                title: '采集日期',
            },
            {
                title: '选择机构',
            },
            {
                title: '配置标准',
            },
        ]
        const { current } = this.state;
        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-例外规则
                </div>
                <div style={{ padding: '10px' }}>
                    <Steps current={current}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                    <div className="steps-content jindu" style={{ position: 'relative' }}>
                        {
                            steps[current].title == '采集日期' ? <RuleData OneNextDate={this.FristNextStep.bind(this)} 
                            FristData={this.state.FristData}/> : ''
                        }
                        {
                            steps[current].title == '选择机构' ? <SelectionRule TwoData={this.state.TwoData} PreviousStep={this.prev.bind(this)}
                                TwoNextStep={this.TwoNextStep.bind(this)} /> : ''
                        }
                        {
                            steps[current].title == '配置标准' ? <ToConfigure PreservationClick={this.PreservationClick.bind(this)}
                                PreviousStep={this.prev.bind(this)} LowerHair={this.LowerHair.bind(this)} /> : ''
                        }
                    </div>
                </div>
            </Fragment>
        )
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
            FristData: val
        });
    }
    // 第二个的下一步
    TwoNextStep(val) {
        console.log(val)
        const current = this.state.current + 1;
        this.setState({
            current: current,
            TwoData: val
        });
    }
    // 第三个的完成
    // 第一个的下一步
    ThreeNextStep(val) {
        console.log(val)
    }
    // 保存
    async PreservationClick(select,val) {
        let obj = {}
        obj.Time = this.state.FristData
        obj.TwoData = this.state.TwoData
        obj.ThreeData = val
        obj.select = select
        let data = await PreservationApi(obj)
        if(data.msg == '成功'){
            this.success('保存成功')
        }else{
            message.error(data.msg)
        }
    }
    // 下发
    async LowerHair(select,val){
        let obj = {}
        obj.Time = this.state.FristData
        obj.TwoData = this.state.TwoData
        obj.ThreeData = val
        obj.select = select
        let data = await LowerHairApi(obj)
        if(data.msg == '成功'){
            this.success('下发成功')
        }else{
            message.error(data.msg)
        }
    }
    success = (val) => {
        message.success(val);
      }
}
export default ExceptionRule