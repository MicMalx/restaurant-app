import React from 'react';

import style from './Input.module.css';

const input = props => {
    let inputElement = null;
    const inputStyles = [style.InputElement]

    if (props.invalid && props.shouldValidate && props.touched) {
        inputStyles.push(style.Invalid)
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
            className={inputStyles.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />
            break;
        case ('select'):
            inputElement = (
                <React.Fragment>
                <label className={style.Label}>Payment Method: </label>
                <select
                    className={inputStyles.join(' ')}
                    value={props.value} 
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
                </React.Fragment>);
            break;
        default:
            inputElement = <input
            className={inputStyles.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />
    }

    return (
        <div className={style.Input}>
            {inputElement}
        </div>
    );
}

export default input;