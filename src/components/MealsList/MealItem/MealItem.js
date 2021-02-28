import React from 'react';

import style from './MealItem.module.css';

const mealItem = props => {
    let mealItem = null;
    if(!props.summary) {
        mealItem = (
        <div className={style.MealItems}>
            <div className={style.Name}>{props.name}</div>
            <div className={style.Ings}>{props.ings}</div>
            <div className={style.Price}>{props.price} $</div>
            <div className={style.Buttons}>
                <button 
                    className={style.Less} 
                    onClick={props.removed}
                    disabled={props.disabled <=0 ? true : false}
                >Remove</button>
                <button 
                    className={style.More} 
                    onClick={props.added}
                >Add</button>
            </div>
        </div>
    );
    }
    else if(props.summary && props.disabled) {
        mealItem = (
            <div className={style.Summary}>
                <div className={style.Name}>{props.name}</div>
                <div className={style.Ings}>{props.ings}</div>
                <div className={style.Price}>{props.price} $</div>
                <div className={style.Amount}>x{props.disabled}</div>
                <div className={style.Buttons}>
                    <button 
                        className={style.Less} 
                        onClick={props.removed}
                    >Remove</button>
                    <button 
                        className={style.More} 
                        onClick={props.added}
                    >Add</button>
                </div>
            </div>
        );
    }
    return (
        <React.Fragment>
            {mealItem}
        </React.Fragment>
    )
}

export default mealItem;