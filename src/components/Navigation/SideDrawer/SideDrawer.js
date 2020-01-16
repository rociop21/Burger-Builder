import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backrop'

const sideDrawer = (props) => {
    let attachedClasses = ['SideDrawer Close']
    if (props.open) {
        attachedClasses = ['SideDrawer Open']
    }
    return(
        <Aux>
            <Backdrop clicked={props.closed} show={props.open} />
            <div className={attachedClasses}>
                <Logo height="11%"/>
                <nav  style={{marginTop:'32px'}}>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div> 
        </Aux>
        
    );
};

export default sideDrawer;