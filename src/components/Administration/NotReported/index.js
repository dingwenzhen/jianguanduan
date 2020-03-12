import React, { Fragment } from 'react'
import FromList from './FromList'
import { Table, Pagination } from 'antd';
import { queryApi } from '@api/Administration/NotReported'
class Reporting extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [],
            queryData: {
                TaskData: '',
                collectionData: '',
                fileData: '',
                BankName: ''
            },
            page: 1,
            totalCount:10
        }
    }
    render() {
        const columns = [
            {
                title: '文件名称',
                dataIndex: 'bmCn',
                key: 'name',
            },
            { title: '银行名称', dataIndex: 'yhjgmc', key: '1' },
            { title: '任务号', dataIndex: 'taskNumber', key: '2' },
            { title: '采集日期', dataIndex: 'cjrq', key: '4' }
        ]
        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-未上报列表
                </div>
                <FromList queryData={this.queryData.bind(this)} />
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
    componentDidMount() {
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
    // 分页器
    onChange(pageNumber) {
        this.setState({
            page: pageNumber
        })
    }
    // 分页器+查询
    async Toltaldata() {
        let obj = { ...this.state.queryData, page: this.state.page }
        let data = await queryApi(obj)
        if(data.data){
            this.setState({
                data: data.data.page.list,
                page: data.data.page.currPage,
                totalCount: data.data.page.totalCount
            })
        }
        
    }
}
export default Reporting