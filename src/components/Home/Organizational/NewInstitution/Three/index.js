import React,{Fragment} from 'react'
import { Table, Input, Button } from 'antd';
class Three extends React.Component{
    constructor() {
        super()
        this.state = {
            mockData: [],
            InputData:'',
            data:[],
            selectedRowKeys:[]//选中的事哪个
        }
    }

    render() {
        const columns = [
            {
                title: '全选',
                dataIndex: 'name',
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
                <div style={{ width: '250px',marginTop:'20px' }} className='FileManagementTable'>
                    <Input value={this.state.InputData} onChange={this.InputChange.bind(this)} style={{marginBottom:'10px'}}/>

                    <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
                </div>
                <div>
                    <Button type="primary" onClick={this.NextStep.bind(this)}>完成</Button>
                    <Button  onClick={this.PreviousStep.bind(this)} style={{marginLeft:'20px'}}>放弃</Button>
                </div>
            </Fragment>
        )
    }
    componentDidMount(){
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                key: i,
                name: `Edward King ${i}`
            });
        }
        this.setState({
            data:data
        })
    }
    InputChange(e){
        let data = this.state.data
        let ArrayData = []
        ArrayData = data.filter(function (t) {
            return t.name.indexOf(e.target.value)>-1;
        })
        this.setState({
            InputData:e.target.value,
            data:ArrayData
        })
    }
    // 下一步
    NextStep(){
        this.props.ThreeNextStep(this.state.selectedRowKeys)
    }
    // 上一步
    PreviousStep(){
        this.props.ThreePreviousStep()
    }
    TableOnchange=(selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys)
        this.setState({
            selectedRowKeys:selectedRowKeys
        })
    }
}
export default Three