import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './../../store/actions/index';
import Burger from './../../components/Burger/Burger'
import OrderForm from './OrderForm/OrderForm'

class Checkout extends Component {

    render () {
        return (
            <div>
                <Burger ingredients={this.props.ings}/>
                <h3>Price: {this.props.price}</h3>
                <OrderForm />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);