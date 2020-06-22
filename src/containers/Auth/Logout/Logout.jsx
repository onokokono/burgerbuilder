import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';

const Logout = props => {

    useEffect(() => {
        props.onLogout();
    }, [props]);

    return <Redirect to="/" />
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actionTypes.auth_logout())
    };
}

export default connect(null, mapDispatchToProps)(Logout);