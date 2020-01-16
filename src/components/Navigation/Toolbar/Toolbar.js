import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import { Link } from 'react-router-dom'

const Toolbar = (props) => (
    <header className='Toolbar'>
        <button className='SideButton' onClick={props.opened}>Menu</button>
        <Link to="/" style={{height: 56, paddingTop: 10}}>
            <Logo height="80%" />
        </Link>
        <nav className='DesktopOnly' >
            <NavigationItems isAuth={props.isAuth} />
        </nav>
    </header>
);

export default Toolbar;