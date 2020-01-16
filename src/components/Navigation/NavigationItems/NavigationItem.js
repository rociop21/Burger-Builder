import React from 'react';
import { Link } from 'react-router-dom'

const navigationItem = (props) => (
    <li className='NavigationIem'>
       <Link to={props.link} className={props.active ? '.active' : null} >
            {props.children}
       </Link> 
    </li>
);

export default navigationItem;