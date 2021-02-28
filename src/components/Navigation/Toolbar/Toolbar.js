import React from 'react'

import style from './Toolbar.module.css';

import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = props => (
    <header className={style.Toolbar} >
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <Logo />
        <nav className={style.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth} />
        </nav>
    </header>
);

export default toolbar
