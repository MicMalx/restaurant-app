import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const setMeals = (meals) => {
    return {
        type: actionTypes.SET_MEALS,
        meals: meals
    };
};

export const fetchMealsFailed = () => {
    return {
        type: actionTypes.FETCH_MEALS_FAILED
    };
};

export const initMeals = () => {
    return dispatch => {
        axios.get('/meals.json')
            .then(response => {
                dispatch(setMeals(response.data));
            })
            .catch(error => {
                dispatch(fetchMealsFailed());
            });
    };
};

export const addMeal = (name) => {
    return {
        type: actionTypes.ADD_MEAL,
        mealName: name
    };
};

export const removeMeal = (name) => {
    return {
        type: actionTypes.REMOVE_MEAL,
        mealName: name
    };
};