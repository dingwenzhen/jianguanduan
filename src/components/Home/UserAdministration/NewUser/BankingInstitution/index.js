import React, { Fragment } from 'react'
import { Table, Input, Button, Select } from 'antd';
import { TotalBanking } from '@api/Home/UserAdministration'
const { Option } = Select;
class BankingInstitution extends React.Component {
    constructor() {
        super()
        this.state = {
            mockData: [],
            InputData: '',
            data: [],
            selectedRowKeys: [],//选中的事哪个
            Toltal: []
        }
    }

    render() {
        const columns = [
            {
                title: '全选',
                dataIndex: 'yxjgmc',
                width: 150,
                
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
                <div style={{ position: 'absolute', width: '450px', right: 0, left: 0, margin: 'auto', top: '20px' }}>
                    <div className='jindu'>
                        <div style={{float:'right'}}>
                            <div style={{ width: '450px', marginTop: '20px' }} className='FileManagementTable'>
                                <Input value={this.state.InputData} onChange={this.InputChange.bind(this)} style={{ marginBottom: '10px' }} />

                                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} 
                                pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
                            </div>
                        </div>
                    </div>
                    <div style={{marginTop:'20px'}}>
                        <Button type="primary" onClick={this.NextStep.bind(this)}>完成</Button>
                        <Button onClick={this.PreviousStep.bind(this)} style={{ marginLeft: '20px' }}>上一步</Button>
                    </div>
                </div>

            </Fragment>
        )
    }
    componentDidMount() {
        this.DafaultFile()// 默认的选取的文件
    }
    // 默认的选取的文件
    async DafaultFile() {
        let datas = await TotalBanking()
        this.setState({
            data: datas.data,
            Toltal: datas.data
        })
    }
    // 输入的搜索
    InputChange(e) {
        let data = this.state.data
        let Toltal = this.state.Toltal
        let ArrayData = []
        if (e.target.value == '') {
            ArrayData = Toltal
        } else {
            ArrayData = Toltal.filter(function (t) {
                return t.name.indexOf(e.target.value) > -1;
            })
        }
        this.setState({
            InputData: e.target.value,
            data: ArrayData
        })
    }
    
    // 下一步
    NextStep() {
        let Toltal = this.state.Toltal
        let selectedRowKeys = this.state.selectedRowKeys
        let RuleId = []
        for( var i = 0 ; i<selectedRowKeys.length ; i++ ){
            for( var j = 0 ; j<Toltal.length ; j++ ){
                if(selectedRowKeys[i] == j ){
                    RuleId.push(Toltal[j].yxjgdm)
                }
            }
        }
        console.log(RuleId)
        this.props.ThreeNext(RuleId,this.state)
    }
    // 上一步
    PreviousStep() {
        this.props.TwoPreviousStep()
    }
    TableOnchange = (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys)
        this.setState({
            selectedRowKeys: selectedRowKeys
        })
    }

}
export default BankingInstitution