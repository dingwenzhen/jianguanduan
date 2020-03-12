import React, { Fragment } from 'react'

class EditData extends React.Component {
    constructor(props){
        super(props)
        this.state=this.props.EditData
    }
    render() {
        console.log(this.props.EditData)
        return (
            <Fragment>
               
            </Fragment>
        )
    }
    queryClick() {
        this.props.ClearClick()
    }
    ClearClick() {
        this.props.ClearClick()
    }
}
export default EditData