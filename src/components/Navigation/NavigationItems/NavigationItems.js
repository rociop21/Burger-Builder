import React, {Component} from 'react';
import NavigationItem from './NavigationItem';

class navigationItems extends Component {

    render () {

        let signIn = null;
        let checkout = null;
        let logOut = null;
        let orders = null;

        if (this.props.isAuth === false) {
            signIn = <NavigationItem link="/signin">Sign In</NavigationItem>
        };

        if (this.props.isAuth) {
            orders = <NavigationItem link="/orders">Orders</NavigationItem>
            checkout = <NavigationItem link="/checkout">Checkout</NavigationItem>
            logOut = <NavigationItem link="/logOut">Log Out</NavigationItem>
        };
        
        return (
            <ul className='NavigationIems'>
                <NavigationItem link="/" active>Burger Builder</NavigationItem>
                {signIn}
                {orders}
                {checkout}
                {logOut}
            </ul>
        )
    }
}

export default navigationItems;

