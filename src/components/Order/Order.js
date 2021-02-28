import React from 'react';

import style from './Order.module.css';

const order = props => {
    const meals = [];

    for(let meal in props.meals) {
        meals.push(
            {
                name: meal,
                amount: props.meals[meal]
            }
        );
    }

    const mealOutput = meals.map(meal => (
        <span
            style={{
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid gray',
                padding: '5px'
            }}
            key={meal.name}
        >{meal.name}({meal.amount})</span>
    ));

    return(
        <div className={style.Order}>
            <p>Meals: {mealOutput}</p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)} $</strong></p>
        </div>
    );
};

export default order;