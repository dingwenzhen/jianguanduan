import React, { Fragment } from 'react'
import { Input, Button, Table, Divider, Pagination, Modal, Select, message } from 'antd'
import { TotalListApi, EditPasswordApi, DeleteAPI, EditElectApi, TotalRoleApi, TotalBanking, TotalDepartment,EditUserApi } from '@api/Home/UserAdministration'
const { Option } = Select;
class UserAdministration extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [],
            userName: '',
            user: '',
            page: 1,
            EditData: {},
            visible: false,
            EditPasswodBool: false,
            passwordOne: '',
            passwordTwo: '',
            LoginName: '',
            totalCount: 10,
            id: 0,
            TotalRole: [],//所有角色
            backfillData: {},//回选的数据
            TotalDepartment: [],//所有部门
            TotalBanking: []//所有银行机构
        }
    }
    render() {
        const columns = [
            {
                title: '登录名',
                dataIndex: 'username',
                key: 'user',
                ellipsis: true
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'username',
                ellipsis: true
            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone',
                ellipsis: true
            },
            {
                title: '电子邮件',
                dataIndex: 'email',
                key: 'email',
                ellipsis: true
            },
            {
                title: '部门',
                dataIndex: 'deptName',
                key: 'department',
                ellipsis: true
            },
            {
                title: '负责机构',
                dataIndex: 'orgName',
                key: 'mechanism',
                ellipsis: true,
            },
            {
                title: '角色',
                dataIndex: 'roleName',
                key: 'rule',
                ellipsis: true
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a onClick={this.EdicDataClick.bind(this, text, record)}>编辑</a>
                        <Divider type="vertical" />
                        <a onClick={this.EditPasswodClick.bind(this, text, record)}>修改密码</a>
                        <Divider type="vertical" />
                        <a onClick={this.DeleteDataClick.bind(this, text, record)}>删除</a>
                    </span>
                ),
            },
        ]

        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-用户管理
                </div>
                <div style={{ padding: '10px' }} className='jindu'>
                    <span>姓名：<Input style={{ width: '150px' }} onChange={this.userNameInput.bind(this)}
                        value={this.state.userName} /></span>
                    <span style={{ marginLeft: '10px' }}>登录名：<Input style={{ width: '150px' }}
                        onChange={this.userInput.bind(this)} value={this.state.user} /></span>
                    <Button style={{ marginLeft: '10px' }} type='primary' onClick={this.queryClick.bind(this)} >查询</Button>
                    <Button style={{ marginLeft: '10px' }} onClick={this.cencelDataClick.bind(this)}>重置</Button>
                    <Button style={{ float: 'right' }} type='primary' onClick={this.NewUserClick.bind(this)}>新增用户</Button>
                </div>
                <div style={{ padding: '10px' }} className='supervisorTableFY'>
                    <Table style={{ backgroundColor: '#fff' }} columns={columns} dataSource={this.state.data} />
                </div>
                <div className='jindu' style={{ padding: '10px' }}>
                    <Pagination style={{ float: 'right' }} showQuickJumper defaultCurrent={this.state.page} total={this.state.totalCount} onChange={this.onChange.bind(this)} />
                </div>
                <Modal
                    title="用户信息修改"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div>
                        <span style={{ width: '70px', display: 'inline-block' }}>登录名：</span>
                        <Input style={{ width: '280px', marginLeft: '10px' }} value={this.state.backfillData.username}
                            onChange={this.ModalUserInput.bind(this)} />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <span style={{ width: '70px', display: 'inline-block' }}>姓名：</span>
                        <Input style={{ width: '280px', marginLeft: '10px' }} value={this.state.backfillData.name}
                            onChange={this.ModaluserNameInput.bind(this)} />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <span style={{ width: '70px', display: 'inline-block' }}>电话：</span>
                        <Input style={{ width: '280px', marginLeft: '10px' }} value={this.state.backfillData.phone}
                            onChange={this.ModalphoneInput.bind(this)} />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <span style={{ width: '70px', display: 'inline-block' }}>邮箱：</span>
                        <Input style={{ width: '280px', marginLeft: '10px' }} value={this.state.backfillData.email}
                            onChange={this.ModalemailInput.bind(this)} />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <span style={{ width: '70px', display: 'inline-block' }}>部门：</span>
                        <Select value={this.state.backfillData.deptName} style={{ width: '280px', marginLeft: '10px' }}
                            onChange={this.ModaldepartmentInput.bind(this)}>
                            {
                                this.state.TotalDepartment.map((item, index) => {
                                    return <Option value={item.title} key={index}>{item.title}</Option>
                                })
                            }
                        </Select>

                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <span style={{ width: '70px', display: 'inline-block' }}>负责机构：</span>
                        <Select
                            mode="multiple"
                            style={{ width: '280px', marginLeft: '10px' }}
                            placeholder="请选择机构"
                            value={this.state.backfillData.orgCodeList}
                            onChange={this.handleChange.bind(this)}
                        >
                            {
                                this.state.TotalBanking.map((item, index) => {
                                    return <Option value={item.yxjgdm} key={index}>{item.yxjgmc}</Option>
                                })
                            }
                        </Select>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <span style={{ width: '70px', display: 'inline-block' }}>角色：</span>
                        <Select value={this.state.backfillData.roleName} style={{ width: '280px', marginLeft: '10px' }} 
                        onChange={this.RuleSelect.bind(this)}>
                            {
                                this.state.TotalRole.map((item, index) => {
                                    return <Option value={item.name} key={index}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </div>
                    <div style={{ marginLeft: '70px', marginTop: '20px' }}>
                        <Button type='primary' onClick={this.ModalSubmitClick.bind(this)}>确定</Button>
                        <Button style={{ marginLeft: '20px' }} onClick={this.ModalcancelClick.bind(this)}>取消</Button>
                    </div>
                </Modal>
                <Modal
                    title="用户信息修改"
                    visible={this.state.EditPasswodBool}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div>
                        <span style={{ display: 'inline-block', width: '120px' }}>登录名：</span><Input
                            style={{ width: '300px' }} value={this.state.LoginName} disabled
                        />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <span style={{ display: 'inline-block', width: '120px' }}>输入新密码：</span><Input.Password
                            placeholder="请输入新密码" value={this.state.passwordOne} style={{ width: '300px' }}
                            onChange={this.passwordOneInput.bind(this)} />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <span style={{ display: 'inline-block', width: '120px' }}>再次输入新密码：</span><Input.Password
                            placeholder="请输入新密码" value={this.state.passwordTwo} style={{ width: '300px' }}
                            onChange={this.passwordTwoInput.bind(this)} />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <Button type='primary' onClick={this.passwordClick.bind(this)}>确定</Button>
                        <Button onClick={this.cancelPasswordClick.bind(this)} style={{ marginLeft: '20px' }}>取消</Button>
                    </div>
                </Modal>
            </Fragment>
        )
    }
    componentDidMount() {
        this.comprehensiveData()
        this.TotalRoleList()//获取所有角色
        this.TotalDepartmentList()//获取所有部门
        this.TotalBankingList()//所有银行负责机构
    }
    async TotalBankingList() {
        let data = await TotalBanking()
        this.setState({
            TotalBanking: data.data
        })
    }
    async TotalRoleList() {
        let data = await TotalRoleApi()
        this.setState({
            TotalRole: data.data
        })
    }
    async TotalDepartmentList() {
        let data = await TotalDepartment()
        this.setState({
            TotalDepartment: data.data
        })
    }
    // 修改密码
    EditPasswodClick(text, record) {

        this.setState({
            EditPasswodBool: true,
            LoginName: record.username,
            id: record.id
        })
    }
    handleChange(value) {
        console.log(value)
        let backfillData = this.state.backfillData
        
        backfillData.orgCodeList = value
        this.setState({
            backfillData
        })
    }
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
            EditPasswodBool: false
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
            EditPasswodBool: false
        });
    }
    // 跳转到新增用户界面
    NewUserClick() {
        this.props.history.push('/Home/NewUser')
    }
    // 分页
    onChange(pageNumber) {
        this.setState({
            page: pageNumber
        }, () => {
            this.comprehensiveData()
        })
    }
    // 编辑
    async EdicDataClick(text, record) {
        let data = await EditElectApi(record.id)
        console.log(data)
        let TotalBankingList = []
        for (var m = 0; m < data.data.chickJgxxysbList.length; m++) {
            TotalBankingList.push(data.data.chickJgxxysbList[m].orgName)
        }
        let TotalDepartment = this.state.TotalDepartment
        console.log(TotalDepartment)
        for (var i = 0; i < TotalDepartment.length; i++) {
            if (TotalDepartment[i].id == data.data.deptId) {
                console.log(TotalDepartment[i].title)
                data.data.deptName = TotalDepartment[i].title
            }
        }
        data.data.roleId = data.data.chickRoleList[0].id
        data.data.roleName = data.data.chickRoleList[0].name
        data.data.orgCodeList = TotalBankingList
        this.setState({
            visible: true,
            backfillData: data.data
        })
    }
    // 删除
    async DeleteDataClick(text, record) {
        let obj = {}
        obj.id = record.id
        obj.roleName = record.roleName
        let data = await DeleteAPI(obj)
        if (data.msg == '成功') {
            this.success('删除成功')
            this.comprehensiveData()
        } else {
            this.error(data.msg)
        }
    }
    // 查询
    queryClick() {
        this.comprehensiveData()
    }
    // 重置
    cencelDataClick() {
        this.setState({
            user: '',
            userName: '',
            page: 1
        }, () => {
            this.comprehensiveData()
        })
    }
    // 姓名
    userInput(e) {
        this.setState({
            user: e.target.value
        })
    }
    // 登录名
    userNameInput(e) {
        this.setState({
            userName: e.target.value
        })
    }
    // 综合  查询+分页请求数据
    async comprehensiveData() {
        let obj = {}
        obj.user = this.state.user
        obj.userName = this.state.userName
        obj.page = this.state.page
        let data = await TotalListApi(obj)
        this.setState({
            data: data.data.list,
            page: data.data.currPage,
            totalCount: data.data.totalCount
        })
        console.log(data)
    }
    // 修改数据
    // 登录名的修改
    ModalUserInput(e) {
        let backfillData = this.state.backfillData
        backfillData.username = e.target.value
        this.setState({
            backfillData
        })
    }
    // 修改-姓名
    ModaluserNameInput(e) {
        let backfillData = this.state.backfillData
        backfillData.name = e.target.value
        this.setState({
            backfillData
        })
    }
    // 修改-电话
    ModalphoneInput(e) {
        let backfillData = this.state.backfillData
        backfillData.phone = e.target.value
        this.setState({
            backfillData
        })
    }
    // 修改-邮箱
    ModalemailInput(e) {
        let backfillData = this.state.backfillData
        backfillData.email = e.target.value
        this.setState({
            backfillData
        })
    }
    // 修改-部门
    ModaldepartmentInput(value) {
        let backfillData = this.state.backfillData
        let TotalDepartment = this.state.TotalDepartment
        for (var i = 0; i < TotalDepartment.length; i++) {
            if (TotalDepartment[i].title == value) {
                backfillData.deptId = TotalDepartment[i].id
            }
        }
        backfillData.deptName = value
        this.setState({
            backfillData
        })
    }
    // 修改-角色
    RuleSelect(value) {
        let TotalRole = this.state.TotalRole
        let backfillData = this.state.backfillData
        for( var i = 0 ; i<TotalRole.length ; i++ ){
            if(value == TotalRole[i].name){
                backfillData.roleId = TotalRole[i].id
            }
        }
        backfillData.roleName = value

        this.setState({
            backfillData
        })
    }
    // 修改-确定
    async ModalSubmitClick() {
        let TotalBanking = this.state.TotalBanking
        let obj = this.state.backfillData
        let List = []
        for( var i = 0 ; i<TotalBanking.length ; i++ ){
            for( var j = 0 ; j<obj.orgCodeList.length ; j++ ){
                if(TotalBanking[i].yxjgdm == obj.orgCodeList[j] || TotalBanking[i].yxjgmc == obj.orgCodeList[j]){
                    List.push(TotalBanking[i].yxjgdm)
                }
            }
        }
        obj.List = List
        let data = await EditUserApi(obj)
        if(data.msg == '成功'){
            this.success('修改成功')
            this.comprehensiveData()
            this.ModalcancelClick()
        }else{
            this.error(data.msg)
        }
        console.log(data)
    }
    // 修改-取消
    ModalcancelClick() {
        this.setState({
            visible: false
        })
    }
    // 修改密码
    // 修改登录名
    LoginNameInput(e) {
        this.setState({
            LoginName: e.target.value
        })
    }
    // 输入新密码
    passwordOneInput(e) {
        this.setState({
            passwordOne: e.target.value
        })
    }
    // 重复输入密码
    passwordTwoInput(e) {
        this.setState({
            passwordTwo: e.target.value
        })
    }
    async passwordClick() {
        if (this.state.passwordOne != this.state.passwordTwo) {
            this.error('前后输入的密码不一致')
        } else if (this.state.passwordOne == '' || this.state.passwordTwo == '') {
            this.error('前后输入的密码不能为空')
        } else {
            let obj = {}
            obj.id = this.state.id
            obj.password = this.state.passwordOne
            obj.confirmPassword = this.state.passwordTwo
            let data = await EditPasswordApi(obj)
            if (data.msg == '成功') {
                this.setState({
                    EditPasswodBool: false,
                    LoginName: '',
                    passwordOne: '',
                    passwordTwo: ''
                })
                this.success('修改密码成功')
            } else {
                this.error(data.msg)
            }
        }
    }
    cancelPasswordClick() {
        this.setState({
            LoginName: '',
            passwordOne: '',
            passwordTwo: '',
            EditPasswodBool: false
        })
    }
    success = (val) => {
        message.success(val);
    }
    error = (val) => {
        message.error(val);
    }

}
export default UserAdministration