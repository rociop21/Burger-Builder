import React, {Component} from 'react';
import {connect} from 'react-redux';
import Input from '../../../components/UI/Input/Input';
import * as actions from './../../../store/actions/index';
import Button from '../../../components/UI/Button/Button';

class OrderForm extends Component {
    state = {
        formFields: {
            name: {
                fieldType: 'input',
                fieldConfig: {
                    type: 'text',
                    placerholder: 'Your Name',
                    label: 'Name',
                },
                value: '',
                rules: {
                    requiered: true,
                },
                valid: false,
                touched: false
            },
            zipcode: {
                fieldType: 'input',
                fieldConfig: {
                    type: 'text',
                    placerholder: 'Your Zipcode',
                    label: 'Zipcode',
                },
                value: '',
                rules: {
                    requiered: true,
                    minLength: 4,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            street: {
                fieldType: 'input',
                fieldConfig: {
                    type: 'text',
                    placerholder: 'Your Adress',
                    label: 'Street',
                },
                value: '',
                rules: {
                    requiered: true,
                },
                valid: false,
                touched: false
            },
            email: {
                fieldType: 'input',
                fieldConfig: {
                    type: 'text',
                    placerholder: 'Your e-mail',
                    label: 'E-mail',
                },
                value: '',
                rules: {
                    requiered: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliverymethod: {
                fieldType: 'select',
                fieldConfig: {
                    type: 'dropdown',
                    placerholder: '',
                    label: 'Delivery Options',
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ],
                },
                value: 'fastest',
                rules: {
                    requiered: true,
                },
                valid: true,
                touched: false
            },
        },
        formValid: false
    }

    checkValidation(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.requiered) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    submitHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.formFields) {
            formData[formElementIdentifier] = this.state.formFields[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormFields = {
            ...this.state.formFields
        };
        const updatedFormField = {
            ...updatedFormFields[inputIdentifier]
        };
        updatedFormField.value = event.target.value;
        updatedFormField.valid = this.checkValidation(updatedFormField.value, updatedFormField.rules)
        updatedFormField.touched = true;
        updatedFormFields[inputIdentifier] = updatedFormField;

        let formValid = true;

        for (let inputIdentifier in updatedFormFields) {
        formValid = updatedFormFields[inputIdentifier].valid && formValid;
        }
        this.setState({formFields: updatedFormFields, formValid: formValid});
    }

    render () {
        const formElements = [];

        for (let key in this.state.formFields) {
            formElements.push({
                id: key, 
                config: this.state.formFields[key]
            });
        }

        let form = (
            <form onSubmit={this.submitHandler}>
                {formElements.map(formElement => (
                    <Input 
                        key={formElement.id} 
                        inputtype={formElement.config.fieldType} 
                        fieldconfig={formElement.config.fieldConfig} 
                        value={formElement.config.value}
                        label={formElement.config.fieldConfig.label}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        touched={formElement.config.touched}
                        invalid={!formElement.config.valid} />
                ))}
                <Button btnType='Success'>Confirm</Button>
            </form>   
        );

        return (
            <div>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        token: state.logIn.token,
        userId: state.logIn.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch (actions.purchaseBurger(orderData, token))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);