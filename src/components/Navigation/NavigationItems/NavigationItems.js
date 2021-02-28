import React from 'react';

import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" exact>Menu</NavigationItem>
        {props.isAuth ?
            <React.Fragment>
                <NavigationItem link="/orders" exact>Orders</NavigationItem>
                <NavigationItem link="/logout">Logout</NavigationItem>
            </React.Fragment> :
            <NavigationItem link="/auth">Login</NavigationItem> 
        }
    </ul>
);

export default navigationItems;