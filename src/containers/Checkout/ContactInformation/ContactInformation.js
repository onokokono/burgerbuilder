import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import css from './ContactInformation.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { Redirect } from 'react-router-dom';
import { updateObject, isInputValid } from '../../../shared/utility';

const ContactInformation = props => {

    const [orderForm, setOrderForm] = useState(
        {
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
    );

    const [isFormValid, setIsFormValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();

        const contactInformation = {};
        for (let key in orderForm)
            contactInformation[key] = orderForm[key].value;

        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            contactInformation: contactInformation,
            UID: props.UID
        };

        props.onBurgerPurchase(order, props.token);
    }

    const inputChangedHandler = (elementID, event) => {
        const updatedFormElement = updateObject(orderForm[elementID], {
            value: event.target.value,
            touched: true,
            valid: isInputValid(event.target.value, orderForm[elementID].validator)
        });

        const updatedOrderForm = updateObject(orderForm, {
            [elementID]: updatedFormElement
        })

        let isFormValid = true;
        for (let key in updatedOrderForm)
            isFormValid = updatedOrderForm[key].valid && isFormValid;

        setOrderForm(updatedOrderForm);
        setIsFormValid(isFormValid);
    };

    let purchased = props.purchased ? <Redirect to="/" /> : null;


    const formElements = [];
    for (let key in orderForm) {
        formElements.push({
            id: key,
            config: orderForm[key]
        });
    }

    return (
        <div className={css.ContactInformation}>
            {purchased}
            <h4> Contact information </h4>
            <form onSubmit={orderHandler} >
                {formElements.map(element => {
                    return <Input
                        key={element.id}
                        onChange={inputChangedHandler.bind(this, element.id)}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        isValid={!element.config.valid}
                        isTouched={element.config.touched}
                        shouldValidate={element.config.validator}
                        value={element.config.value} />
                })}
                <Button
                    disabled={!isFormValid}
                    type='Success' > ORDER </Button>
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        purchased: state.order.purchased,
        token: state.auth.token,
        UID: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onBurgerPurchase: (orderData, token) => dispatch(actionCreators.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactInformation, axios));