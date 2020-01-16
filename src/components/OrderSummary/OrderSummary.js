import React from 'react';
import Aux from '../../hoc/Auxiliary';
import Button from '../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map (igKey => {
            return <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
        });

        let conditionalButton = null;

        if (props.isAuth) {
                conditionalButton = <Button btnType='Success' clicked={props.purchaseContinued} >Continue</Button>
            } else {
                conditionalButton = <Button btnType='Danger' clicked={props.purchaseLogIn} >Log In</Button>
            }

    return(
        <Aux>
            <h3>Yor order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Total price: {props.price.toFixed(2)}</p>
            <p>Continue to checkout?</p>
            {conditionalButton}
            <Button 
                btnType='Danger'
                clicked={props.purchaseCancelled} >Cancel</Button>
        </Aux>
    )
};

export default orderSummary;