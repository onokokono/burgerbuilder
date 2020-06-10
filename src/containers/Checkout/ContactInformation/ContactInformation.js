import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import css from './ContactInformation.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { Redirect } from 'react-router-dom';
import { updateObject, isInputValid } from '../../../shared/utility';

class ContactInformation extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validator: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validator: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validator: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validator: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail'
                },
                value: '',
                validator: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                    options: [
                        { value: 'cheap', displayValue: 'cheap' },
                        { value: 'fast', displayValue: 'fast' }
                    ]
                },
                value: 'cheap',
                valid: true,
                touched: false
            }
        },

        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        totalPrice: 0,
        loading: false,
        isFormValid: false
    };

    orderHandler = (event) => {
        event.preventDefault();

        const contactInformation = {};
        for (let key in this.state.orderForm)
            contactInformation[key] = this.state.orderForm[key].value;

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            contactInformation: contactInformation,
            UID: this.props.UID
        };

        this.props.onBurgerPurchase(order, this.props.token);
    }

    inputChangedHandler = (elementID, event) => {
        //const updatedOrderForm = { ...this.state.orderForm };
        //const updatedFormElement = { ...updatedOrderForm[elementID] };

        //updatedFormElement.value = event.target.value;
        //updatedFormElement.touched = true;
        //updatedFormElement.valid = this.isInputValid(updatedFormElement.value, updatedFormElement.validator);
        //updatedOrderForm[elementID] = updatedFormElement;

        const updatedFormElement = updateObject(this.state.orderForm[elementID], {
            value: event.target.value,
            touched: true,
            valid: isInputValid(event.target.value, this.state.orderForm[elementID].validator)
        });

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [elementID]: updatedFormElement
        })

        let isFormValid = true;
        for (let key in updatedOrderForm)
            isFormValid = updatedOrderForm[key].valid && isFormValid;

        this.setState({ orderForm: updatedOrderForm, isFormValid: isFormValid });
    };

    render() {
        let purchased = this.props.purchased ? <Redirect to="/" /> : null;


        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        return (
            <div className={css.ContactInformation}>
                {purchased}
                <h4> Contact information </h4>
                <form onSubmit={this.orderHandler} >
                    {formElements.map(element => {
                        return <Input
                            key={element.id}
                            onChange={this.inputChangedHandler.bind(this, element.id)}
                            elementType={element.config.elementType}
                            elementConfig={element.config.elementConfig}
                            isValid={!element.config.valid}
                            isTouched={element.config.touched}
                            shouldValidate={element.config.validator}
                            value={element.config.value} />
                    })}
                    <Button
                        disabled={!this.state.isFormValid}
                        type='Success' > ORDER </Button>
                </form>
            </div>
        );
    }

};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        purchased: state.order.purchased,
        token : state.auth.token,
        UID: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onBurgerPurchase: (orderData, token) => dispatch(actionCreators.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactInformation, axios));