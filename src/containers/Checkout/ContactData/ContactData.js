import React, { Component } from 'react';

import style from './ContactData.module.css'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import { checkValidity } from '../../../shared/validation';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            phoneNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Phone Number'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7,
                    maxLength: 9,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            paymentMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'cash', displayValue: 'Cash'},
                        {value: 'card', displayValue: 'Card'}
                    ]
                },
                value: 'cash',
                validation: {},
                valid: true
            },
        },
        formIsValid: false
    }
    componentWillUnmount() {
        this.props.ErrorReset();
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {}
        for(let formElementIdentfier in this.state.orderForm) {
            formData[formElementIdentfier] = this.state.orderForm[formElementIdentfier].value;
        }
        const order = {
            meals: this.props.orderedMeals,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderMeals(order, this.props.token);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm)
        {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button 
                    btnType="Success"
                    disabled={!this.state.formIsValid}    
                >ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={style.ContactData}>
                {this.props.error ? <h3 style={{color: "red"}}>Something went wrong! Try again later</h3> : null}
                <h4>Enter your delivery data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        meals: state.orderBuilder.meals,
        price: state.orderBuilder.totalPrice,
        orderedMeals: state.orderBuilder.orderedMeals,
        loading: state.orderSender.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        error: state.orderSender.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderMeals: (orderData, token) => dispatch(actions.purchaseOrder(orderData, token)),
        ErrorReset: () => dispatch(actions.errorPurchasedReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
