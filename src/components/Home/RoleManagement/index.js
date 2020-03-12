import React, { Fragment } from 'react'
import FromList from './FromList'
import {Table,Pagination,Divider,message} from 'antd'
import {TotalListApi,DeleteRoleApi,EditBackfillApi} from '@api/Home/RoleManagement'
class RoleManagement extends React.Component {
    constructor(){
        super()
        this.state={
            data: [
                {
                    key: 1,
                    RuleNumber: 'RuleNumber',
                    RuleDescription: 'RuleDescription',
                    SourceName: 'SourceName',
                    RuleType: 'RuleType',
                    standardType: 'standardType'
                }
            ],
            FromData:{
                RoleName:'',
                RoleDescription:'',
                PermissionName:''
            },
            page:1,
            totalCount:10
        }
    }
    render() {
        const columns = [
            { title: '角色名', dataIndex: 'name', key: 'name' },
            { title: '角色描述', dataIndex: 'description', key: 'age' },
            { title: '权限', dataIndex: 'permissionName', key: 'address' },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: (text, record) => (
                    <span>
                        <a onClick={this.EditData.bind(this, text, record)}>编辑</a>
                        <Divider type="vertical" />
                        <a onClick={this.DeletedClick.bind(this, text, record)}>删除</a>
                    </span>
                ),
            },
        ];
        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-角色管理
                </div>
                <FromList queryData={this.FromListData.bind(this)} />
                <div className="FileManagementTable" style={{ padding: '10px' }}>
                    <Table
                        columns={columns}
                        dataSource={this.state.data}
                        style={{ backgroundColor: '#fff' }}
                    />
                </div>
                <div>
                    <Pagination className='jindu' style={{ float: 'right' }} defaultCurrent={this.state.page} 
                    total={this.state.totalCount} onChange={this.onChange.bind(this)} />
                </div>
            </Fragment>
        )
    }
    componentDidMount(){
        this.TotalDafault()
    }
    // 查询+分页+初始化默认的数据
    async TotalDafault(){
        let obj = {...this.state.FromData,page:this.state.page}
        let data = await TotalListApi(obj)
        this.setState({
            data:data.data.list,
            page:data.data.currPage,
            totalCount:data.data.totalCount
        })
        
    }
    FromListData(val){
        this.setState({
            FromData:{...val}
        },()=>{
            this.TotalDafault()
        })
    }
    // 编辑
    async EditData(text, record){
        let data = await EditBackfillApi(record.id)
        console.log(data)
        localStorage.setItem('EditData',JSON.stringify(data.data))
        this.props.history.push('/Home/EditFrom')
    }
    // 删除
    async DeletedClick(text, record){
        let data = await DeleteRoleApi(record.id)
        if(data.msg == '成功'){
            this.TotalDafault()
            this.success('删除成功')
        }else{
            this.error(data.msg)
        }
    }
    // 分页
    onChange(pageNumber){
        this.setState({
            page:pageNumber
        },()=>{
            this.TotalDafault()
        })
    }
    success = (val) => {
        message.success(val);
      }
    error = (val) => {
        message.error(val);
      }
}
export default RoleManagement