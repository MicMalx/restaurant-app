import React from 'react';
import { NavLink } from 'react-router-dom';

import style from './MealType.module.css';

const mealType = props => {
    return (
        <NavLink to={props.url}>
        <div className={style.MealType}>
            <img src={props.imgSrc} alt={props.label} />
            <div className={style.Label}><b>{props.label}</b></div>
        </div>
        </NavLink>
    );
}

export default mealType;