import React, { Component } from 'react'
import { connect } from 'react-redux'
import Business from '../../components/business/Business'
import { getBusinessEmpAction } from '../../redux/actions/businessEmp/businessEmpAction'

export class businessEmpContainer extends Component {
    render() {
        return (
            <Business {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        errorBusinessEmp: state.businessEmpReducers.error,
        loadingBusinessEmp: state.businessEmpReducers.loading,
        responseBusinessEmp: state.businessEmpReducers.response,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBusinessEmpAction: (data) => {
            dispatch(getBusinessEmpAction(data));
        },

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(businessEmpContainer)
