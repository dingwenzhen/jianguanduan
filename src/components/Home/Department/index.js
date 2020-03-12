import React, { Fragment } from 'react'
import { Input, Button, Table, Pagination, Divider, Modal, Select, message, Icon } from 'antd'
import NewDepartment from './NewDepartment'
import { TotalListApi, DeleteIdApi, EditInformationApi, findSuperviseApi, NewDepartmentApi ,EditApi} from '@api/Home/Department'
const { Option } = Select;
class Department extends React.Component {
    constructor() {
        super()
        this.state = {
            DepartmentValue: '',
            visible: false,
            EditBool: false,
            DepartmentName: '',//部门名称
            page: 1,
            data: [],
            totalCount: 10,
            supervise: [],//监管人
            tableList:[],
            implement:[],
            id:0
        }
    }
    render() {
        const columns = [
            { title: '部门名称', dataIndex: 'title', key: 'name' },
            { title: '主监管员', dataIndex: 'supervisorName', key: 'age' },
            { title: '监管执行人', dataIndex: 'executorName', key: 'address' },
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
        ]
        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-部门管理
                </div>
                <div style={{ padding: '10px' }} className='jindu'>
                    <span>
                        部门名称：<Input style={{ width: '180px' }}
                            value={this.state.DepartmentValue}
                            onChange={this.DepartmentInput.bind(this)} />
                    </span>
                    <Button style={{ marginLeft: '20px' }}
                        onClick={this.queryData.bind(this)}
                        type="primary">查询</Button>
                    <Button style={{ marginLeft: '20px' }}
                        onClick={this.cancelClick.bind(this)}
                        type="primary">重置</Button>
                    <Button style={{ marginLeft: '20px', float: 'right' }}
                        onClick={this.NewDepartment.bind(this)}
                        type="primary">新增部门</Button>
                </div>
                <div className="FileManagementTable" style={{ padding: '10px' }}>
                    <Table
                        columns={columns}
                        dataSource={this.state.data}
                        style={{ backgroundColor: '#fff' }}
                    />
                </div>
                <div>
                    <Pagination className='jindu' style={{ float: 'right' }} defaultCurrent={this.state.page} total={this.state.totalCount}
                        onChange={this.onChange.bind(this)} />
                </div>
                <Modal
                    title="新增部门"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <NewDepartment DetermineClick={this.DetermineClick.bind(this)} ClearClick={this.handleCancel.bind(this)} />
                </Modal>
                <Modal
                    title="修改信息"
                    visible={this.state.EditBool}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div>
                    <i style={{ display: 'inline-block', width: '10px', color: 'red' }}>*</i><span style={{ width: '100px', display: 'inline-block' }}>部门名称：</span>
                        <Input style={{ width: '320px', marginLeft: '10px' }}
                            value={this.state.DepartmentName}
                            onChange={this.DepartmentNameInput.bind(this)} />
                            <Icon style={{ display: 'inline-block', fontSize: '20px', marginLeft: '10px' }}
                                    onClick={this.NewSupervisor.bind(this)} type="plus-circle" />
                    </div>
                    {
                        this.state.tableList.map((item, index) => {
                            return <div key={index}>
                                <div style={{ marginTop: '20px' }}>
                                <i style={{ display: 'inline-block', width: '10px', color: 'red' }}>*</i><span style={{ width: '100px', display: 'inline-block' }}>主监管员：</span>
                                    <Select
                                        style={{ width: '320px', marginLeft: '10px' }}
                                        placeholder="请选择主监管员"
                                        value={item.jgrname}
                                        onChange={this.ChiefSupervisor.bind(this,index)}
                                    >
                                        {
                                            this.state.supervise.map(item => {
                                                return <Option key={item.id}>{item.name}</Option>
                                            })
                                        }
                                    </Select>
                                    <Icon type="minus-circle" style={{ display: 'inline-block', fontSize: '20px', marginLeft: '10px' }}
                                    onClick={this.SubtractClick.bind(this,index)}/>
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                <i style={{ display: 'inline-block', width: '10px', color: 'red' }}>*</i><span style={{ width: '100px', display: 'inline-block' }}>监管执行员：</span>
                                    <Select
                                        mode="multiple"
                                        style={{ width: '320px', marginLeft: '10px' }}
                                        placeholder="请选择监管执行员"
                                        value={item.dafaultName}
                                        onChange={this.SupervisionExecutive.bind(this,index)}
                                    >
                                    {
                                        this.state.implement.map(item => {
                                            return <Option key={item.id}>{item.name}</Option>
                                        })
                                    }
                                    </Select>
                                </div>
                            </div>
                        })
                    }
                    <div style={{ marginTop: '20px' }}>
                        <Button type="primary" onClick={this.EditDetermineClick.bind(this)}>确定</Button>
                        <Button onClick={this.ClearClick.bind(this)} style={{ marginLeft: '20px' }}>取消</Button>
                    </div>
                </Modal>
            </Fragment>
        )
    }
     componentDidMount() {
        this.dafaultsupervise()
    }
    async dafaultsupervise(){
        let data = await findSuperviseApi()
        this.setState({
            supervise:data.data.supervise,
            implement:data.data.implement
        })
        this.TotalDafault()
    }
    // 查询+分页+初始化数据 接口函数
    async TotalDafault() {
        let obj = {}
        obj.page = this.state.page
        obj.DepartmentValue = this.state.DepartmentValue
        let data = await TotalListApi(obj)
        this.setState({
            page: data.data.currPage,
            data: data.data.list,
            totalCount: data.data.totalCount
        })
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
    // 重置
    cancelClick() {
        this.setState({
            DepartmentValue: '',
            page: 1
        }, () => {
            this.TotalDafault()
        })
    }
    // 部门输入框
    DepartmentInput(e) {
        this.setState({
            DepartmentValue: e.target.value
        })
    }
    queryData() {
        this.TotalDafault()
    }
    // 新增部门
    NewDepartment() {
        this.setState({
            visible: true
        })
    }
    // 新增部门点击确定穿过要添加的数据
    async DetermineClick(val) {
        let data = await NewDepartmentApi(val)
        if (data.msg == '成功') {
            this.setState({
                visible: false
            }, () => {
                this.TotalDafault()
            })
            this.success('添加成功')
        }else{
            this.error(data.message)
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
    // 编辑
    async EditData(text, record) {
        let data = await EditInformationApi(record.id)
        console.log(data, '编辑')
        if(!data.data.zVoList){
            console.log('不存在')
            data.data.zVoList = [{jgyId:'',zxrIds:[]}]
        }else if(data.data.zVoList){
            let dafault = []
            for( var i = 0 ; i<data.data.zVoList.length ; i++ ){
                let obj = {}
                obj.jgyId = data.data.zVoList[i].jgyId
                obj.jgrname = data.data.zVoList[i].jgrname
                if(data.data.zVoList[i].checkZxrList){
                    let List = []
                    for( var j = 0 ; j<data.data.zVoList[i].checkZxrList.length ; j++ ){
                        List.push(data.data.zVoList[i].checkZxrList[j].zxrname)
                    }
                    data.data.zVoList[i].dafaultName = List
                }else{
                    data.data.zVoList[i].dafaultName = []
                }   
            }
        }
        this.setState({
            tableList:data.data.zVoList,
            DepartmentName: data.data.title,//部门名称
            id:data.data.id,
            EditBool: true
        })
    }
    // 删除
    async DeletedClick(text, record) {
        let data = await DeleteIdApi(record.id)
        if(data.msg == '成功'){
            this.TotalDafault()
            this.success('删除成功')
        }else{
            this.error(data.msg)
        }
    }

    // 修改信息
    // 主监管员的下拉
    ChiefSupervisor(index,value) {
        let tableList = this.state.tableList
        console.log(tableList,'请选择监管执行员')
        tableList[index].jgyId = value
        tableList[index].jgrname = value
        this.setState({
            ChiefSupervisor: value,
            tableList
        })
    }
    // 监管执行员
    SupervisionExecutive(index,value) {
        let tableList = this.state.tableList
        tableList[index].dafaultName = value
        this.setState({
            SupervisionExecutive: value,
            tableList
        })
    }
    // 删除原有的监管人
    SubtractClick(index){
        let tableList = this.state.tableList
        tableList.splice(index,1)
        this.setState({
            tableList
        })
    }
    // 新增监管员+执行人
    NewSupervisor() {
        let tableList = this.state.tableList
        let obj = {}
        tableList.push(obj)
        this.setState({
            tableList
        })
    }
    // 确定
    async EditDetermineClick() {
        let obj = {}
        let tableList = this.state.tableList
        let implement = this.state.implement
        let List = []
        for(var i = 0 ; i<tableList.length ; i++){
            let obj = {}
            obj.jgyId = tableList[i].jgyId
            obj.zxrIds = []
            if(tableList[i].dafaultName){
                for( var j = 0 ; j<tableList[i].dafaultName.length ; j++ ){
                    if(tableList[i].checkZxrList){
                        for( var y = 0 ; y<tableList[i].checkZxrList.length ; y++ ){
                            if(tableList[i].checkZxrList[y].executorId == tableList[i].dafaultName[j] || tableList[i].checkZxrList[y].zxrname == tableList[i].dafaultName[j]){
                                obj.zxrIds.push(Number(tableList[i].checkZxrList[y].executorId))
                            }
                        }
                    }else{
                        for( var m = 0 ; m<implement.length ; m++ ){
                            for( var n = 0 ; n<tableList[i].dafaultName.length ; n++ ){
                                if(implement[m].id ==tableList[i].dafaultName[n] || implement[m].name ==tableList[i].dafaultName[n] ){
                                    obj.zxrIds.push(Number(implement[m].id))
                                }
                            }
                        }
                    }
                    
                }
            }
            
            for( var m = 0 ; m<implement.length ; m++ ){
                if(tableList[i].dafaultName){
                    for( var n = 0 ; n<tableList[i].dafaultName.length ; n++ ){
                        if(implement[m].id ==tableList[i].dafaultName[n] || implement[m].name ==tableList[i].dafaultName[n] ){
                            obj.zxrIds.push(Number(implement[m].id))
                        }
                    }
                }
                
            }
            obj.zxrIds = Array.from(new Set(obj.zxrIds))
            List.push(obj)
        }
        obj.tableList = List
        obj.DepartmentName = this.state.DepartmentName
        obj.id = this.state.id
        let data = await EditApi(obj)
        if( data.msg == '成功' ){
            this.setState({
                EditBool:false,
                page:1
            },()=>{
                this.TotalDafault()
            })
            this.success('修改成功')
            this.dafaultsupervise()
        }
    }
    // 部门名称
    DepartmentNameInput(e) {
        this.setState({
            DepartmentName: e.target.value
        })
    }
    ClearClick() {
        this.setState({
            EditBool: false,
            ChiefSupervisor: '',//主监管员：
            SupervisionExecutive: '',//监管执行员：
            DepartmentName: '',//部门名称

        })
    }
    success = (val) => {
        message.success(val);
    }
    error = (val) => {
        message.error(val);
      }
}
export default Department