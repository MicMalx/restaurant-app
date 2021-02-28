import React from 'react';

import style from './MealsList.module.css';
import MealItem from './MealItem/MealItem';

const mealsList = props => {
    return (
        <div className={style.MealsList}>
            {props.summary ? <div className={style.OrderSummary}>Order Summary</div> : null}
            {Object.keys(props.meals).map(mealName => {
                if((props.meals[mealName]['type'] === props.menuPart) || props.summary)
                {
                    return (
                        <MealItem 
                            key={mealName}
                            name={mealName}
                            ings={props.meals[mealName]['description']}
                            price={props.meals[mealName]['price']}
                            disabled={props.meals[mealName]['amount']}
                            summary={props.summary}
                            added={() => props.mealAdded(mealName)}
                            removed={() => props.mealRemoved(mealName)}
                        />   
                    );
                } else {
                    return null;
                }
            })
            }
            {props.summary ? <div className={style.TotalPrice}>Total Price: {props.totalPrice.toFixed(1)} $</div> : null}
        </div>
    );
}

export default mealsList;