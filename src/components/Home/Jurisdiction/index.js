import React, { Fragment } from 'react'
import QueryFrom from './queryFrom'
import { Table, Divider, message, Modal, Input, Select, Button } from 'antd';
import { TotalListApi, DeleteIdApi, ReturnSelectionApi, UpperLevelApi, EditJurisdictionApi } from '@api/Home/Jurisdiction'
import EditJurisdiction from './EditJurisdiction'
const { TextArea } = Input;
const { Option } = Select
class Jurisdiction extends React.Component {
  constructor() {
    super()
    this.state = {
      querydata: {
        ruleName: '',
        ruleDescribe: '',
      },
      data: [],
      visible: false,
      EditJurisdictionDat: { allParentList: [] }
    }
  }
  render() {
    const columns = [
      {
        title: '权限名称',
        dataIndex: 'name',
        key: 'name',
        ellipsis: true,
      },
      {
        title: '权限描述',
        dataIndex: 'description',
        key: 'age',
        ellipsis: true,
      },
      {
        title: '权限类型',
        key: 'address',
        ellipsis: true,
        render: (text, record) => {
          if (record.type == 0) {
            return <span>目录</span>
          } else if (record.type == 1) {
            return <span>菜单</span>
          } else if (record.type == 2) {
            return <span>按钮</span>
          }
        },
      },
      {
        title: '操作',
        key: 'action',
        ellipsis: true,
        render: (text, record) => (
          <span>
            <a onClick={this.EditDataClick.bind(this, text, record)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={this.DeleteDataClick.bind(this, text, record)}>删除</a>
          </span>
        ),
      },
    ]
    let EditJurisdictionDat = this.state.EditJurisdictionDat
    if (EditJurisdictionDat.type == 0) {
      EditJurisdictionDat.typeName = '目录'
    } else if (EditJurisdictionDat.type == 1) {
      EditJurisdictionDat.typeName = '菜单'
    } else if (EditJurisdictionDat.type == 2) {
      EditJurisdictionDat.typeName = '按钮'
    }
    return (

      <Fragment>
        <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
          当前位置：首页-权限管理
                </div>
        <QueryFrom queryClick={this.queryClick.bind(this)} NewAddClick={this.NewAddClick.bind(this)} />
        <div style={{ padding: '10px' }} className='SHLSFX'>
          <Table style={{ backgroundColor: '#fff' }} columns={columns} dataSource={this.state.data} />
        </div>
        <Modal
          title="编辑权限"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <div >
            <div className='jindu'>
              <i style={{ display: 'inline-block', width: '10px', color: 'red' }}>*</i>
              <span style={{ width: '90px', display: 'inline-block' }}>权限名：</span>
              <Input style={{ width: '300px' }} value={EditJurisdictionDat.name}
                onChange={this.RoleNameInput.bind(this)} />
            </div>
            <div style={{ marginTop: '10px' }} className='jindu'>
              <span style={{ width: '100px', display: 'inline-block', float: 'left' }}>
                <i style={{ display: 'inline-block', width: '10px', color: 'red' }}>*</i>权限类型：</span>
              <Select value={EditJurisdictionDat.typeName} defaultValue="请选择权限类型" style={{ width: 300 }} onChange={this.handleChange.bind(this)}>
                <Option value="0">目录</Option>
                <Option value="1">菜单</Option>
                <Option value="2">按钮</Option>
              </Select>
            </div>
            <div style={{ marginTop: '10px' }} className='jindu'>
              <span style={{ width: '100px', display: 'inline-block', float: 'left' }}>
                <i style={{ display: 'inline-block', width: '10px', color: 'red' }}>*</i>上一级菜单：</span>
              <Select value={EditJurisdictionDat.parentName} defaultValue="请选择上一级菜单" style={{ width: 300 }} onChange={this.UpperLevelChange.bind(this)}>
                {
                  EditJurisdictionDat.allParentList.map(item => {
                    return <Option value={item.id} key={item.id}>{item.name}</Option>
                  })
                }
              </Select>
            </div>
            <div style={{ marginTop: '10px' }} className='jindu'>
              <span style={{ width: '100px', display: 'inline-block', float: 'left', paddingLeft: '10px' }}>描述：</span>
              <TextArea
                value={EditJurisdictionDat.description}
                onChange={this.describeInput.bind(this)}
                autoSize={{ minRows: 3, maxRows: 5 }}
                style={{ width: '300px' }}
              />
            </div>

            <div style={{ marginTop: '20px' }}>
              <Button onClick={this.NextSetpClick.bind(this)} type='primary'>确定</Button>
              <Button style={{ marginLeft: '20px' }} onClick={this.handleOk.bind(this)}>关闭</Button>
            </div>
          </div>
        </Modal>
      </Fragment>
    )
  }
  componentDidMount() {
    this.DafaultGetData()
  }
  NewAddClick() {
    this.DafaultGetData()
  }
  // 查询
  queryClick(val) {
    console.log(val)
    this.setState({
      querydata: val
    }, () => {
      this.DafaultGetData()
    })
  }
  // 分页器
  onChange(pageNumber) {
    this.setState({
      Page: pageNumber
    })
  }
  // 编辑
  async EditDataClick(text, record) {
    let data = await ReturnSelectionApi(record.id)
    if (data.msg == '成功') {
      this.setState({
        visible: true,
        EditJurisdictionDat: data.data
      })
    } else {
      message.error(data.msg)
    }

  }
  // 删除
  async DeleteDataClick(text, record) {
    let data = await DeleteIdApi(record.id)
    if (data.msg == '成功') {
      this.success('删除成功')
      this.DafaultGetData()
    } else {
      this.error(data.msg)
    }
  }
  // 查询+分页器+初始化默认数据
  async DafaultGetData() {
    let obj = { ...this.state.querydata }
    let data = await TotalListApi(obj)
    let List = data.data
    let array = []
    let bool = List.find(function (value) {
      if (value.type == 0) {
        return '存在一级'
      } if (value.type == 1) {
        return '存在二级'
      } if (value.type == 2) {
        return '存在二级'
      }
    })
    if (bool.type == 0) {
      for (var i = 0; i < List.length; i++) {
        if (List[i].type == 0) {
          List[i].children = []
          List[i].key = List[i].id
          array.push(List[i])
          continue
        }
      }
    } else if (bool.type == 1) {
      for (var i = 0; i < List.length; i++) {
        if (List[i].type == 1) {
          List[i].children = []
          List[i].key = List[i].id
          array.push(List[i])
          continue
        }
      }
    } else if (bool.type == 2) {
      for (var i = 0; i < List.length; i++) {
        if (List[i].type == 2) {
          List[i].children = []
          List[i].key = List[i].id
          array.push(List[i])
          continue
        }
      }
    }
    console.log(bool, '898989ni')

    for (var j = 0; j < array.length; j++) {
      for (var k = 0; k < List.length; k++) {
        if (array[j].id == List[k].parentId) {
          List[k].children = []
          List[k].key = List[k].id
          array[j].children.push(List[k])
        }
        if (array[j].children) {
          for (var t = 0; t < array[j].children.length; t++) {
            if (array[j].children[t].id == List[k].parentId) {
              array[j].children[t].key = array[j].children[t].id
              List[k].key = List[k].id
              array[j].children[t].children.push(List[k])
            }
          }
        }
      }
    }
    if (data.data) {
      this.setState({
        data: array
      })
    }
  }
  success = (val) => {
    message.success(val);
  }
  error = (val) => {
    message.error(val);
  }
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  // 修改
  // 角色名
  RoleNameInput(e) {
    let EditJurisdictionDat = this.state.EditJurisdictionDat
    EditJurisdictionDat.name = e.target.value
    this.setState({
      EditJurisdictionDat
    })
  }
  // 描述
  describeInput(e) {
    let EditJurisdictionDat = this.state.EditJurisdictionDat
    EditJurisdictionDat.description = e.target.value
    this.setState({
      EditJurisdictionDat
    })
  }
  // 下一步
  async NextSetpClick() {
    let obj = {}
    obj.id = this.state.EditJurisdictionDat.id
    if (!this.state.EditJurisdictionDat.name) {
      this.error('权限名不能为空')
    } else if (!this.state.EditJurisdictionDat.type) {
      this.error('权限l类型不能为空')
    } else if (!this.state.EditJurisdictionDat.parentId) {
      this.error('上一级菜单不能为空')
    } else {
      obj.name = this.state.EditJurisdictionDat.name
      obj.description = this.state.EditJurisdictionDat.description
      obj.type = this.state.EditJurisdictionDat.type
      obj.parentId = this.state.EditJurisdictionDat.parentId
      console.log(obj)
      let data = await EditJurisdictionApi(obj)
      if (data.msg == '成功') {
        this.success('修改成功')
        this.DafaultGetData()
        this.setState({
          visible: false
        })
      } else {
        this.error(data.msg)
      }
    }
  }
  // 选择权限类型
  async handleChange(value) {
    let data = await UpperLevelApi(value)
    let EditJurisdictionDat = this.state.EditJurisdictionDat
    EditJurisdictionDat.allParentList = data.data
    this.setState({
      type: value,
      EditJurisdictionDat
    })

  }
  // 选择上一级
  UpperLevelChange(value) {
    let EditJurisdictionDat = this.state.EditJurisdictionDat
    EditJurisdictionDat.parentId = value
    this.setState({
      EditJurisdictionDat
    })
  }

}
export default Jurisdiction