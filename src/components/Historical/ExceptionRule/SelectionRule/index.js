import React, { Fragment } from 'react'
import { Table, Input, Button, message } from 'antd';
import { SelectBankApi } from '@api/Historica/ExceptionRule/index.js'
class SelectionRule extends React.Component {
    constructor() {
        super()
        this.state = {
            mockData: [],
            InputData: '',
            data: [],
            selectedRowKeys: []//选中的事哪个
        }
    }

    render() {
        const columns = [
            {
                title: '全选',
                dataIndex: 'yxjgmc',
                width: 150
            }
        ]

        const rowSelection = {
            onChange: this.TableOnchange.bind(this),
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        }
        return (
            <Fragment>
                <div style={{ width: '300px', marginTop: '20px', top: '20px', position: 'relative', right: '0', left: '0', margin: 'auto' }} className='FileManagementTable'>
                    <div style={{ marginBottom: '10px' }}>
                        <span>选择银行机构：</span>
                        <Input value={this.state.InputData} style={{ width: '200px' }} onChange={this.InputChange.bind(this)} />
                    </div>

                    <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
                    <div style={{ marginTop: '10px' }}>
                        <Button type="primary" onClick={this.NextStep.bind(this)}>下一步</Button>
                        <Button onClick={this.PreviousStep.bind(this)} style={{ marginLeft: '20px' }}>上一步</Button>
                    </div>
                </div>

            </Fragment>
        )
    }
    componentDidMount() {
        this.SelectDafault()
    }
    // 众多的权限
    async SelectDafault() {
        console.log(this.state.InputData, '789')
        let data = await SelectBankApi(this.state.InputData)
        let List = data.data.page.list
        if(this.props.TwoData[0] || this.props.TwoData[0]=='0'){
            console.log(this.props.TwoData,'回来了')
            let TwoData = this.props.TwoData
            let ArrayL = []
            for( var i = 0 ; i<TwoData.length ; i++ ){
                for( var j = 0 ; j<List.length ; j++ ){
                    if(TwoData[i]==List[j].yxjgmc){
                        ArrayL.push(j)
                    }
                }
            }
            this.setState({
                selectedRowKeys:ArrayL
            },()=>{
                console.log(this.state.selectedRowKeys,'selectedRowKeys')
            })
        }
        this.setState({
            data: data.data.page.list
        })
        console.log()

    }
    InputChange(e) {
        let data = this.state.data
        let ArrayData = []
        ArrayData = data.filter(function (t) {
            return t.yxjgmc.indexOf(e.target.value) > -1;
        })
        this.setState({
            InputData: e.target.value,
            data: ArrayData
        }, () => {
            this.SelectDafault()
        })
    }
    // 下一步
    NextStep() {
        if (!this.state.selectedRowKeys[0] && this.state.selectedRowKeys[0] != 0) {
            this.error()
        } else {
            let data = this.state.data
            let selectedRowKeys = this.state.selectedRowKeys
            let dataMC = []
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < selectedRowKeys.length; j++) {
                    if (i == selectedRowKeys[j]) {
                        dataMC.push(data[i].yxjgmc)
                    }
                }
            }
            this.setState({
                selectedRowKeys:dataMC
            })
            this.props.TwoNextStep(dataMC)
        }

    }
    // 上一步
    PreviousStep() {
        this.props.PreviousStep()
    }
    TableOnchange = (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys)
        this.setState({
            selectedRowKeys: selectedRowKeys
        })
    }
    error = () => {
        message.error('请选择银行机构');
    }
}
export default SelectionRule