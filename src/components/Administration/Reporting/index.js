import React, { Fragment } from 'react'
import FromList from './FromList'
import { Table, Pagination } from 'antd';
import { queryApi } from '@api/Administration/Reporting'
class Reporting extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [],
            queryData: {
                TaskData: '',
                collectionData: '',
                BankName: '',
                fileData:''
            },
            page: 1,
            totalCount: 10
        }
    }
    render() {
        const columns = [
            {
                title: '文件名称',
                width: 100,
                dataIndex: 'bmCn',
                key: 'name',
                ellipsis: true,
            },
            { title: '银行名称', dataIndex: 'yxjgmc', key: '1', ellipsis: true, },
            { title: '任务号', dataIndex: 'taskNumber', key: '2', ellipsis: true, },
            { title: '是否为原始文件', dataIndex: 'origNot', key: '3', ellipsis: true, },
            { title: '采集日期', dataIndex: 'cjrq', key: '5', ellipsis: true, },
            { title: '续传次数', dataIndex: 'renewai', key: '6', ellipsis: true, }
        ]
        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-上报情况
                </div>
                <FromList queryData={this.queryData.bind(this)} HandlerData={this.HandlerData.bind(this)} />
                <div className="FileManagementTable" style={{ padding: '10px', backgroundColor: '#fff' }}>
                    <Table columns={columns} dataSource={this.state.data} />
                </div>
                <div>
                    <Pagination className='jindu' style={{ float: 'right' }} showQuickJumper
                        defaultCurrent={this.state.page} total={this.state.totalCount} onChange={this.onChange.bind(this)} />
                </div>
            </Fragment>
        )
    }
    componentDidMount(){
        this.Toltaldata()
    }
    // 上面的查询
    queryData(val) {
        this.setState({
            queryData: val
        }, () => {
            this.Toltaldata()
        })

    }
    // 分页的条件
    HandlerData(val) {
        this.setState({
            queryData: val
        })
    }
    // 分页器
    onChange(pageNumber) {
        this.setState({
            page: pageNumber
        },()=>{
            this.Toltaldata()
        })
    }
    // 分页器+查询
    async Toltaldata() {
        let obj = { ...this.state.queryData, page: this.state.page }
        let data = await queryApi(obj)
        this.setState({
            data: data.data.page.list,
            page: data.data.page.currPage,
            totalCount: data.data.page.totalCount
        })
    }

}
export default Reporting