import React from 'react';

import style from './Logo.module.css';

import restaurantLogo from '../../assets/Images/logo.png';

const logo = (props) => (
    <div className={style.Logo}>
        <img src={restaurantLogo} alt ="Restaurant" />
    </div>
);

export default logo;