import React from 'react';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label: 'Salad' , type: 'salad'},
    {label: 'Meat' , type: 'meat'},
    {label: 'Bacon' , type: 'bacon'},
    {label: 'Cheese' , type: 'cheese'},
];

const buildControls = (props) =>(
    <div className='BuildControls'>
        <h4>Current price: {props.price.toFixed(2)}</h4>
        {controls.map (ctrl => (
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            added={ () => props.ingredientAdded (ctrl.type)}
            removed={ () => props.ingredientRemoved (ctrl.type)}
            disabled={props.disabled[ctrl.type]} />
        ))}
        <button 
        className='OrderButton'
        disabled={!props.purchaseable}
        onClick={props.ordered} >Order now</button>
    </div>
);

export default buildControls;