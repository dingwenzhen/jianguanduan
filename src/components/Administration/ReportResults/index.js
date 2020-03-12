import React, { Fragment } from 'react'
import { Input, Button,Table,Pagination,Divider } from 'antd'
class ReportResults extends React.Component {
    constructor() {
        super()
        this.state = {
            RuleNumber:'',
            FileName:'',
            page:1,
            totalCount:10,
            data:[]
        }
    }
    render() {
        const columns = [
            {
                title: '任务号',
                dataIndex: 'taskNumber',
                key: 'taskNumber',
                ellipsis: true,
            },
            {
                title: '采集日期',
                dataIndex: 'cjrq',
                key: 'cjrq',
                ellipsis: true,
            },
            {
                title: '截止上报时间',
                dataIndex: 'upTodata',
                key: 'upTodata',
                ellipsis: true,
            },
            {
                title: '银行机构',
                key: 'yhjgdm',
                dataIndex: 'yhjgdm',
                ellipsis: true,
            },
            {
                title: '规则名称',
                key: 'ruleSeq',
                dataIndex: 'ruleSeq',
                ellipsis: true,
            },
            {
                title: '上报文件清单',
                key: 'bmCn',
                dataIndex: 'bmCn',
                ellipsis: true,
            },
            {
                title: '执行人',
                key: 'taskExecutor',
                dataIndex: 'taskExecutor',
                ellipsis: true,
            },
            {
                title: '发起人',
                key: 'taskInitiator',
                dataIndex: 'taskInitiator',
                ellipsis: true,
            }, 
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a>下发</a>
                        <Divider type="vertical" />
                        <a onClick={this.deleteIdClick.bind(this,text, record)}>删除</a>
                    </span>
                ),
            },
        ]
        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-上报结果
                </div>
                <div style={{ padding: '10px' }}>
                    <span>规则号：<Input style={{ width: '200px' }} value={this.state.RuleNumber} 
                    onChange={this.RuleNumberInput.bind(this)} /></span>
                    <span style={{ marginLeft: '10px' }}>文件名称：<Input value={this.state.FileName} 
                    style={{ width: '200px' }} onChange={this.FileNameInput.bind(this)} /></span>
                    <Button type='primary' style={{ marginLeft: '10px' }} onClick={this.queryClick.bind(this)}>查询</Button>
                    <Button style={{ marginLeft: '10px' }}>重置</Button>
                </div>
                <div style={{ padding: '10px' }} className='jindu supervisorTableFY'>
                    <Table style={{backgroundColor:'#fff'}} columns={columns} dataSource={this.state.data} />
                    <Pagination style={{float:'right',marginTop:'10px'}} showQuickJumper 
                    defaultCurrent={this.state.page} total={this.state.totalCount} onChange={this.Pagination.bind(this)} />
                </div>
            </Fragment>
        )
    }
    // 查询
    queryClick(){
        let obj = this.state
        console.log(obj)
    }
    // 规则号
    RuleNumberInput(e){
        this.setState({
            RuleNumber:e.target.value
        })
    }
    // 文件名称
    FileNameInput(e){
        this.setState({
            FileName:e.target.value
        })
    }
    // 分页器
    Pagination(pageNumber){
        this.setState({
            page:pageNumber
        })
    }
    // 分页+初始化+查询
    ToltalDafault(){
        let obj = {}
        obj.page = this.state.page
        obj.RuleNumber = this.state.RuleNumber
        obj.FileName = this.state.FileName
        console.log(obj)
    }
}
export default ReportResults