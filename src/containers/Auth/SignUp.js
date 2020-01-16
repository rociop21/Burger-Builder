import React, {Component} from 'react';
import {connect} from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom';

class SignUp extends Component {
    state = {
        controls: {
            email: {
                fieldType: 'input',
                fieldConfig: {
                    type: 'text',
                    placerholder: 'E-mail adress',
                    label: 'E-mail adress',
                },
                value: '',
                rules: {
                    requiered: true,
                    isEmail: true,
                },
                valid: false,
            },
            passsword: {
                fieldType: 'input',
                fieldConfig: {
                    type: 'text',
                    placerholder: 'password',
                    label: 'password',
                },
                value: '',
                rules: {
                    requiered: true,
                    minLength: 6,
                },
                valid: false,
            }
        },
        formValid: false
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onRegister(this.state.controls.email.value, this.state.controls.passsword.value)
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

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedControls = {
            ...this.state.controls
        };
        const updatedControl = {
            ...updatedControls[inputIdentifier]
        };
        updatedControl.value = event.target.value;
        updatedControl.valid = this.checkValidation(updatedControl.value, updatedControl.rules)
        updatedControl.touched = true;
        updatedControls[inputIdentifier] = updatedControl;

        let formValid = true;

        for (let inputIdentifier in updatedControls) {
        formValid = updatedControls[inputIdentifier].valid && formValid;
        }
        this.setState({controls: updatedControls, formValid: formValid});
    }

    render () {
        const formElements = [];

        for (let key in this.state.controls) {
            formElements.push({
                id: key, 
                config: this.state.controls[key]
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
        
        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        };

        let registerRedirect = null;

        if (this.props.isAuth) {
            registerRedirect = <Redirect to="/signin" />
        }

        return (
            <div>
                {registerRedirect}
                {errorMessage}
                {form}
                <p>Already registered?</p> 
                <Link to='/signin' >Log In</Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.register.error,
        isAuth: state.register.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (email, password) => dispatch(actions.register(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);