import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as burgerActions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

class BurgerBuilder extends Component{
    state = {
        purchasing: false,
    };

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum>0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false}) 
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    purchaseLogInHandler = () => {
        alert('You have to be loged in to place your order');
        this.props.history.push('/signin')
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.props.ings} 
                        purchaseCancelled={this.purchaseCancelHandler} 
                        purchaseContinued={this.purchaseContinueHandler} 
                        purchaseLogIn = {this.purchaseLogInHandler}
                        price={this.props.price}
                        isAuth={this.props.isAuth} />
                </Modal>
                <Burger ingredients={this.props.ings} />
                <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved} 
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchaseable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler} />
            </Aux>
        );
    }
}

const mapDispatchProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerActions.removeIngredient(ingName)),
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        isAuth: state.logIn.token !== null
    };
}

export default connect(mapStateToProps, mapDispatchProps)(withErrorHandler(BurgerBuilder, axios));