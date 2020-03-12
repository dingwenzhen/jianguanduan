import React, { Fragment } from 'react'
import FromList from './FromList'
import { Table, Pagination, Divider, Modal, Input, Button } from 'antd'
import SeeFrom from './SeeFrom'
class RuleManagement extends React.Component {
    constructor() {
        super()
        this.state = {
            queryData: {
                RuleNumber: '',
                RuleDescription: '',
                RuleType: ''
            },
            SeeData: {},
            visible: false,
            EditBool: false,
            // 修改的
            RuleNumber: 'RuleNumber',
            RuleDescription: 'RuleDescription',
            SourceName: 'SourceName',
            RuleType: 'RuleType',
            standardType: 'standardType',
            // 表格的默认数据
            data: [
                {
                    key: 1,
                    RuleNumber: 'RuleNumber',
                    RuleDescription: 'RuleDescription',
                    SourceName: 'SourceName',
                    RuleType: 'RuleType',
                    standardType: 'standardType'
                }
            ]
        }
    }
    render() {
        const columns = [
            { title: '规则号', dataIndex: 'RuleNumber', key: 'name' },
            { title: '规则描述', dataIndex: 'RuleDescription', key: 'age' },
            { title: '源表名', dataIndex: 'SourceName', key: 'address' },
            { title: '规则类型', dataIndex: 'RuleType', key: '' },
            { title: '规则标准类型', dataIndex: 'standardType', key: '' },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: (text, record) => (
                    <span>
                        <a onClick={this.EditData.bind(this, text, record)}>编辑</a>
                        <Divider type="vertical" />
                        <a onClick={this.SeeData.bind(this, text, record)}>查看</a>
                        <Divider type="vertical" />
                        <a onClick={this.DeletedClick.bind(this, text, record)}>删除</a>
                    </span>
                ),
            },
        ];
        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-规则管理
                </div>
                <FromList queryClick={this.queryClick.bind(this)} />
                <div className="FileManagementTable" style={{ padding: '10px' }}>
                    <Table
                        columns={columns}
                        dataSource={this.state.data}
                        style={{ backgroundColor: '#fff' }}
                    />
                </div>
                <div>
                    <Pagination className='jindu' style={{ float: 'right' }} defaultCurrent={2} total={500} onChange={this.onChange.bind(this)} />
                </div>
                <Modal
                    title="新增部门"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <SeeFrom SeeData={this.state.SeeData} ClearClick={this.handleOk.bind(this)} />
                </Modal>
                <Modal
                    title="修改信息"
                    visible={this.state.EditBool}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div style={{ padding: '10px' }}>
                        <span style={{ display: 'block' }}>
                            <span style={{ width: '100px', display: 'inline-block' }}>规则号：</span>
                            <Input style={{ width: '300px' }} value={this.state.RuleNumber}
                            onChange={this.RuleNumberInput.bind(this)}
                            />
                        </span>
                        <span style={{ display: 'block', marginTop: '10px' }}>
                            <span style={{ width: '100px', display: 'inline-block' }}>规则描述：</span>
                            <Input style={{ width: '300px' }} value={this.state.RuleDescription}
                            onChange={this.RuleDescriptionInput.bind(this)}
                            />
                        </span>
                        <span style={{ display: 'block', marginTop: '10px' }}>
                            <span style={{ width: '100px', display: 'inline-block' }}>源表名：</span>
                            <Input style={{ width: '300px' }} value={this.state.SourceName}
                            onChange={this.SourceNameInput.bind(this)}
                            />
                        </span>
                        <span style={{ display: 'block', marginTop: '10px' }}>
                            <span style={{ width: '100px', display: 'inline-block' }}>规则类型：</span>
                            <Input style={{ width: '300px' }} value={this.state.RuleType}
                            onChange={this.RuleTypeInput.bind(this)}
                            />
                        </span>
                        <span style={{ display: 'block', marginTop: '10px' }}>
                            <span style={{ width: '100px', display: 'inline-block' }}>规则标准类型：</span>
                            <Input style={{ width: '300px' }} value={this.state.standardType}
                            onChange={this.standardTypeInput.bind(this)}
                            />
                        </span>
                        <div style={{ marginTop: '10px' }}>
                            <Button type="primary" onClick={this.EditqueryClick.bind(this)}>确定</Button>
                            <Button style={{ marginLeft: '10px' }} onClick={this.EditClearClick.bind(this)}>取消</Button>
                        </div>
                    </div>
                </Modal>
            </Fragment>
        )
    }
    handleOk() {
        this.setState({
            visible: false,
            EditBool: false
        })
    }
    handleCancel() {
        this.setState({
            visible: false,
            EditBool: false
        })
    }
    queryClick(val) {
        console.log(val)
        this.setState({
            queryData: val
        })
    }
    // 分页器
    onChange(pageNumber) {
        let obj = {}
        obj.page = pageNumber
        obj.queryData = this.state.queryData
        console.log(obj)
    }
    // EditData 编辑
    EditData(text, record) {
        console.log(record)
        this.setState({
            EditBool: true,
            RuleNumber: record.RuleNumber,
            RuleDescription: record.RuleDescription,
            SourceName: record.SourceName,
            RuleType: record.RuleType,
            standardType: record.standardType,
        })
    }
    // DeletedClick
    DeletedClick(text, record) {
        console.log('删除')
    }
    // 查看
    SeeData(text, record) {
        console.log(record)
        this.setState({
            SeeData: record,
            visible: true
        })
    }
    // 修改的确定EditqueryClick
    EditqueryClick(){
        let obj = {}
        obj.RuleNumber = this.state.RuleNumber
        obj.RuleDescription = this.state.RuleDescription
        obj.SourceName = this.state.SourceName
        obj.RuleType = this.state.RuleType
        obj.standardType = this.state.standardType
        console.log(obj)
    }
    // 修改的取消EditqueryClick
    EditClearClick(){
        this.setState({
            EditBool:false
        })
    }
    // 修改-规则号
    RuleNumberInput(e){
        this.setState({
            RuleNumber:e.target.value
        })
    }
    // 修改-规则描述
    RuleDescriptionInput(e){
        this.setState({
            RuleDescription:e.target.value
        })
    }
    // 修改-源表名
    SourceNameInput(e){
        this.setState({
            SourceName:e.target.value
        })
    }
    // 修改-规则类型
    RuleTypeInput(e){
        this.setState({
            RuleType:e.target.value
        })
    }
    // 修改-规则标准描述
    standardTypeInput(e){
        this.setState({
            standardType:e.target.value
        })
    }
}
export default RuleManagement