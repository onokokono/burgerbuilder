import React, { useState } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import css from './Auth.module.css';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, isInputValid } from '../../shared/utility';

const Auth = props => {

    const [form, setForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email'
            },
            value: '',
            validator: {
                required: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validator: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
    });
    const [isSignup, setIsSignUpup] = useState(false);

    useState(() => {
        if (!props.isBuilding && props.authRedirectPath !== '/') {
            props.onSetAuthRedirect();
        }
    }, []);

    function inputChangedHandler(elementKey, event) {
        const updatedFormElement = updateObject(form[elementKey], {
            value: event.target.value,
            toucher: true,
            isValid: isInputValid(event.target.value, form[elementKey].validator)
        });

        const updatedForm = updateObject(form, {
            [elementKey]: updatedFormElement
        })

        setForm(updatedForm);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(form.email.value, form.password.value, isSignup);

    }

    const handleSwitch = (event) => {
        event.preventDefault();
        setIsSignUpup(!isSignup)
    }

    const formElements = [];
    let errorMessage = null;
    if (props.error) {
        errorMessage = <p style={{ color: 'red' }}> {props.error.message} </p>;
    };

    for (let key in form) {
        formElements.push({ key: key, config: form[key] });
    }
    let render = formElements.map(element => {
        return <Input
            key={element.key}
            onChange={inputChangedHandler.bind(this, element.key)}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            isValid={!element.config.valid}
            isTouched={element.config.touched}
            shouldValidate={element.config.validator}
            value={element.config.value} />
    });

    if (props.loading) render = <Spinner />;

    let authRedirect = null
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }


    return (
        <form onSubmit={submitHandler} className={css.Auth} >
            {authRedirect}
            {render}
            {errorMessage}
            <Button type="Success" > SUBMIT </Button>
            <Button onClick={handleSwitch} type='Danger'> SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'} </Button>
        </form>
    )
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token ? true : false,
        isBuilding: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actionCreators.auth(email, password, isSignup)),
        onSetAuthRedirect: () => dispatch(actionCreators.set_auth_redirect_path('/'))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);