import React, { Fragment } from 'react'
import { Input, Button, Table, Divider, Pagination, message } from 'antd'
import {TotalListApi,DeleteApi,EditBackfillApi} from '@api/Home/Organizational'

class Organizational extends React.Component {
    constructor() {
        super()
        this.state = {
            Institution: '',//银行机构的Input
            data: [],
            visible: false,
            EditModal:{},//修改弹窗所需要的信息
            page:1,
            totalCount:10
        }
    }
    render() {
        const columns = [
            {
                title: '银行机构名称',
                width: 100,
                dataIndex: 'yxjgmc',
                key: 'name',
                fixed: 'left',
                ellipsis: true
            },
            {
                title: '银行机构代码',
                width: 100,
                dataIndex: 'yxjgdm',
                key: 'age',
                fixed: 'left',
                ellipsis: true
            },
            { title: '金融许可证号', dataIndex: 'jrxkzh', key: '1', ellipsis: true },
            { title: '银行办公地点', dataIndex: 'jgdz', key: '2', ellipsis: true },
            // { title: '银行通信地址', dataIndex: 'PostalAddress', key: '3', ellipsis: true },
            { title: '联系人姓名', dataIndex: 'fzrxm', key: '4', ellipsis: true },
            { title: '联系人电话', dataIndex: 'fzrlxdh', key: '5', ellipsis: true },
            // { title: '联系人电子邮箱', dataIndex: 'ContactEmail', key: '6', ellipsis: true },
            { title: '主监管员', dataIndex: 'supervisorName', key: '7', ellipsis: true },
            { title: '监管执行员', dataIndex: 'executorName', key: '8', ellipsis: true },
            {
                title: '操作',
                key: 'operation',
                fixed: 'right',
                width: 100,
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
                    当前位置：首页-机构管理
                </div>
                <div style={{ padding: '10px' }} className='jindu'>
                    <span>银行机构名称：</span>
                    <Input style={{ width: '180px' }} value={this.state.Institution}
                        onChange={this.InstitutionInput.bind(this)} />
                    <Button type="primary" style={{ marginLeft: '20px' }} onClick={this.queryClick.bind(this)}>查询</Button>
                    <Button type="primary" style={{ float: 'right' }} onClick={this.NewInstitution.bind(this)}>新增机构</Button>
                </div>
                <div style={{ padding: '10px' }}>
                    <div style={{ backgroundColor: '#fff' }} className='SuperviseTable'>
                        <Table columns={columns} dataSource={this.state.data} scroll={{ x: 1300 }} />
                    </div>
                    <div>
                        <Pagination showQuickJumper className='jindu' style={{ float: 'right', marginTop: '10px' }} current={this.state.page} total={this.state.totalCount}
                            onChange={this.onChange.bind(this)} />
                    </div>
                </div>
                
            </Fragment>
        )
    }
    componentDidMount(){
        this.TotalDafault()
    }
    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    }
    // 查询
    queryClick() {
        this.setState({
            page:1
        },()=>{
            this.TotalDafault()
        })
        
    }
    // InstitutionInput 银行机构名称的输入框
    InstitutionInput(e) {
        this.setState({
            Institution: e.target.value
        })
    }
    // 新增机构
    NewInstitution() {
        this.props.history.push('/Home/NewInstitution')
    }
    // 编辑
    async EditData(text, record) {
        let data = await EditBackfillApi(record.yxjgdm)
        console.log(data)
        localStorage.setItem('EditInstitution',JSON.stringify(data.data))
        this.props.history.push('/Home/EditInstitution')
        // this.setState({
        //     visible: true,
        //     EditModal:record
        // })
    }
    // 删除
    async DeletedClick(text, record) {
        let data = await DeleteApi(record.nbjgh)
        console.log(data)
        if( data.msg == '成功' ){
            this.success('删除成功')
            this.TotalDafault()
        }else{
            this.error(data.msg)
        }
    }
    // 分页器
    onChange(pageNumber) {
        this.setState({
            page:pageNumber
        },()=>{
            this.TotalDafault()
        })
    }
    // 修改弹窗-确定
    DetermineEdit(){
        console.log(this.state.EditModal)
    }
    // 分页+查询+初始数据  公用的接口函数
    async TotalDafault(){
        let obj = {}
        obj.page = this.state.page
        obj.Institution = this.state.Institution
        console.log(this.state.page)
        let data = await TotalListApi(obj)
        this.setState({
            data:data.data.list,
            page:data.data.currPage,
            totalCount:data.data.totalCount
        })
    }
    success = (val) => {
        message.success(val);
      }
      error = (val) => {
        message.error(val);
      }
}
export default Organizational