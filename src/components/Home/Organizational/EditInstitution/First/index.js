import React, { Fragment } from 'react'
import { Input, Button } from 'antd'
class Frist extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.FristData
    }
    render() {
        return (
            <Fragment>
                <div style={{position:'absolute',right:'0',left:'0',margin:'auto',width:'400px',top:'20px'}}>
                    <div>
                        <span style={{ width: '120px', display: 'inline-block' }}>银行机构名称：</span>
                        <Input style={{ width: '250px' }} value={this.state.OrganizationName}
                            onChange={this.OrganizationNameInput.bind(this)} />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <span style={{ width: '120px', display: 'inline-block' }}>银行机构代码：</span>
                        <Input style={{ width: '250px' }} value={this.state.OrganizationCode}
                            onChange={this.OrganizationCodeInput.bind(this)} />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <span style={{ width: '120px', display: 'inline-block' }}>金融许可证号：</span>
                        <Input style={{ width: '250px' }} value={this.state.LicenseLey}
                            onChange={this.LicenseLeyInput.bind(this)} />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <span style={{ width: '120px', display: 'inline-block' }}>银行办公地址：</span>
                        <Input style={{ width: '250px' }} value={this.state.BankOffice}
                            onChange={this.BankOfficeInput.bind(this)} />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <span style={{ width: '120px', display: 'inline-block' }}>银行通讯地址：</span>
                        <Input style={{ width: '250px' }} value={this.state.PostalAddress}
                            onChange={this.PostalAddressInput.bind(this)} />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <span style={{ width: '120px', display: 'inline-block' }}>联系人姓名：</span>
                        <Input style={{ width: '250px' }} value={this.state.ContactName}
                            onChange={this.ContactNameInput.bind(this)} />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <span style={{ width: '120px', display: 'inline-block' }}>联系人电话：</span>
                        <Input style={{ width: '250px' }} value={this.state.ContactNumber}
                            onChange={this.ContactNumberInput.bind(this)} />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <span style={{ width: '120px', display: 'inline-block' }}>联系人电子邮箱：</span>
                        <Input style={{ width: '250px' }} value={this.state.ContactEmail}
                            onChange={this.ContactEmailInput.bind(this)} />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <Button type="primary" onClick={this.NextStep.bind(this)}>下一步</Button>
                    </div>
                </div>
            </Fragment>
        )
    }
    // 银行机构名称
    OrganizationNameInput(e) {
        this.setState({
            OrganizationName: e.target.value
        })
    }
    // 银行机构代码：
    OrganizationCodeInput(e) {
        this.setState({
            OrganizationCode: e.target.value
        })
    }
    // 金融许可证号：
    LicenseLeyInput(e) {
        this.setState({
            LicenseLey: e.target.value
        })
    }
    // 银行办公地址：
    BankOfficeInput(e) {
        this.setState({
            BankOffice: e.target.value
        })
    }
    // 银行通讯地址：
    PostalAddressInput(e) {
        this.setState({
            PostalAddress: e.target.value
        })
    }
    // 联系人姓名：
    ContactNameInput(e) {
        this.setState({
            ContactName: e.target.value
        })
    }
    // 联系人电话：
    ContactNumberInput(e) {
        this.setState({
            ContactNumber: e.target.value
        })
    }
    // 联系人电子邮箱：
    ContactEmailInput(e) {
        this.setState({
            ContactEmail: e.target.value
        })
    }
    // 下一步
    NextStep() {
        // let obj = {}
        // obj.OrganizationName = this.state.OrganizationName
        // obj.OrganizationCode = this.state.OrganizationCode
        // obj.LicenseLey = this.state.LicenseLey
        // obj.BankOffice = this.state.BankOffice
        // obj.PostalAddress = this.state.PostalAddress
        // obj.ContactName = this.state.ContactName
        // obj.ContactNumber = this.state.ContactNumber
        // obj.ContactEmail = this.state.ContactEmail
        this.props.NextStep(this.state)
    }
}
export default Frist