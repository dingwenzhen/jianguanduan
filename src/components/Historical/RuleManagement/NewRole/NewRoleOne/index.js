import React, { Fragment } from 'react'
import { Input, Button, Mentions, message } from 'antd'
const { TextArea } = Input;

class NewRoleOne extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props
  }
  render() {
    return (
      <div>
        <div style={{ position: 'absolute', right: '0', left: '0', margin: 'auto', width: '320px' }}>
          <div className='jindu'>
          <i style={{ display: 'inline-block', width: '10px', color: 'red' }}>*</i>
           <span style={{ width: '60px', display: 'inline-block' }}>角色名：</span>
            <Input style={{ width: '250px', float: 'right' }} value={this.state.RoleName}
              onChange={this.RoleNameInput.bind(this)} />
          </div>
          <div style={{ marginTop: '10px' }} className='jindu'>
         
          <span style={{ width: '70px', display: 'inline-block',paddingLeft:'10px' }}>描述：</span>
            <TextArea
              value={this.state.describe}
              onChange={this.describeInput.bind(this)}
              autoSize={{ minRows: 3, maxRows: 5 }}
              style={{ width: '250px', float: 'right' }}
            />
          </div>
          <div style={{ marginTop: '20px' }}>
            <Button onClick={this.NextSetpClick.bind(this)} style={{ marginLeft: '70px' }}>下一步</Button>
          </div>
        </div>
      </div>
    )
  }

  // 角色名
  RoleNameInput(e) {
    this.setState({
      RoleName: e.target.value
    })
  }
  // 描述
  describeInput(e) {
    this.setState({
      describe: e.target.value
    })
  }
  // 下一步
  NextSetpClick() {
    let obj = {}
    if(!this.state.RoleName){
      this.error('角色名不能为空')
    }else{
      console.log(222)
      obj.RoleName = this.state.RoleName
      obj.describe = this.state.describe
      this.props.NextSetpClick(obj)
    }
  }
  error = (val) => {
    message.error(val);
  }
}
export default NewRoleOne