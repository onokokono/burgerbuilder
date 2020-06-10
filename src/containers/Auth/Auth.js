import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import css from './Auth.module.css';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import {updateObject, isInputValid} from '../../shared/utility';

class Auth extends Component {

    state = {
        form: {
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
        },
        email: '',
        password: '',
        isSignup: true
    };

    componentDidMount() {
        if(!this.props.isBuilding && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirect();
        }
    }

    inputChangedHandler(elementKey, event) {
        /* const updatedForm = { ...this.state.form };
        const updatedFormElement = { ...updatedForm[elementKey] };

        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.isValid = this.isInputValid(updatedFormElement.value, updatedFormElement.validator);
        updatedForm[elementKey] = updatedFormElement; */

        const updatedFormElement = updateObject(this.state.form[elementKey], {
            value: event.target.value,
            toucher: true,
            isValid: isInputValid(event.target.value, this.state.form[elementKey].validator)
        });

        const updatedForm = updateObject(this.state.form, {
            [elementKey]: updatedFormElement
        })

        this.setState({ form: updatedForm });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.form.email.value, this.state.form.password.value, this.state.isSignup);

    }

    handleSwitch = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return { isSignup: prevState.isSignup ? false : true }
        });
    }

    render() {
        const formElements = [];
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p style={{ color: 'red' }}> {this.props.error.message} </p>;
        };

        for (let key in this.state.form) {
            formElements.push({ key: key, config: this.state.form[key] });
        }
        let form = formElements.map(element => {
            return <Input
                key={element.key}
                onChange={this.inputChangedHandler.bind(this, element.key)}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                isValid={!element.config.valid}
                isTouched={element.config.touched}
                shouldValidate={element.config.validator}
                value={element.config.value} />
        });

        if (this.props.loading) form = <Spinner />;

        let authRedirect = null
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }


        return (
            <form onSubmit={this.submitHandler} className={css.Auth} >
                {authRedirect}
                {form}
                {errorMessage}
                <Button type="Success" > SUBMIT </Button>
                <Button onClick={this.handleSwitch} type='Danger'> SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'} </Button>
            </form>
        )
    }
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