import React, { Fragment } from 'react'
import { Transfer, Button } from 'antd';
import { JurisdictionAllApi } from '@api/Home/RoleManagement'
class NewRoleTwo extends React.Component {
    constructor() {
        super()
        this.state = {
            mockData: [],
            targetKeys: [],
        }
    }
    render() {
        return (
            <Fragment>
                <div style={{ position: 'absolute', right: '0', left: '0', margin: 'auto', width: '600px' }}>
                    <div >
                        <div>
                            <span style={{ display: 'inline-block', width: '250px' }}>可选规则</span>
                            <span style={{ display: 'inline-block', width: '250px', marginLeft: '40px' }}>已选规则</span>
                        </div>
                        <Transfer
                            dataSource={this.state.mockData}
                            listStyle={{
                                width: 250,
                                height: 300,
                            }}
                            targetKeys={this.state.targetKeys}
                            onChange={this.handleChange.bind(this)}
                            render={this.renderItem}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Button onClick={this.EndDataClick.bind(this)} style={{ marginRight: '20px' }}>完成</Button>
                        <Button onClick={this.clearClick.bind(this)}>上一步</Button>
                    </div>
                </div>
            </Fragment>
        )
    }
    async componentDidMount() {
        let arry = []
        let data = await JurisdictionAllApi()
        console.log(data)
        for (var i = 0; i < data.data.length; i++) {
            let obj = {}
            obj.key=data.data[i].id
            obj.title=data.data[i].name
            obj.description=data.data[i].description
            arry.push(obj)
        }
        this.setState({
            mockData: arry
        })
        // this.getMock();
    }
    handleChange = (targetKeys, direction, moveKeys) => {
        console.log(targetKeys, '右边已选择的权限')
        console.log(targetKeys, direction, moveKeys);
        this.setState({ targetKeys });
    };

    renderItem = item => {
        const customLabel = (
            <span className="custom-item">
                {item.title} - {item.description}
            </span>
        );

        return {
            label: customLabel, // for displayed item
            value: item.title, // for title and filter matching
        };
    }
    // 上一步
    clearClick() {
        this.props.clearClick()
    }
    // 完成
    EndDataClick() {
        this.props.completeClick(this.state.targetKeys)
    }
}
export default NewRoleTwo