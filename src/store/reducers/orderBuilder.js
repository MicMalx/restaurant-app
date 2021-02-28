import * as actionTypes from '../actions/actionTypes';

const initialState = {
    meals: null,
    orderedMeals: {},
    totalPrice: 0,
    error: false,
    building: false
};

const setMeals = (state, action) => {
    return {
        ...state,
        meals: action.meals,
        orderedMeals: {},
        totalPrice: 0,
        error: false,
        building: false
    };
};

const fetchMealsFailed = (state, action) => {
    return {
        ...state,
        error: true,
        building: false
    };
};

const addMeal = (state, action) => {
    let updatedMealAmount, updatedMeal, updatedMeals, isInOrdered, updatedOrderedMeals;

    updatedMealAmount = state.meals[action.mealName]['amount'] + 1;
    updatedMeal = {
        ...state.meals[action.mealName],
        amount:updatedMealAmount
    }
    updatedMeals = {
        ...state.meals,
        [action.mealName]:updatedMeal
    }
    isInOrdered = false;
    for (let mealName in state.orderedMeals) {
        if(mealName === action.mealName) {
            isInOrdered = true;
        }
    }
    if (isInOrdered) {
        updatedOrderedMeals= {
            ...state.orderedMeals,
            [action.mealName]: state.orderedMeals[action.mealName] + 1
        }
    }
    else {
        updatedOrderedMeals = {
            ...state.orderedMeals,
            [action.mealName]: 1
        }
    }
    return {
        ...state,
        meals: updatedMeals,
        totalPrice: state.totalPrice + Number(state.meals[action.mealName]['price']),
        orderedMeals: updatedOrderedMeals,
        building:true
    };
};

const removeMeal = (state, action) => {
    let updatedMealAmount, updatedMeal, updatedMeals, isInOrdered, updatedOrderedMeals, updatedOrdered={};

    updatedMealAmount = state.meals[action.mealName]['amount'] - 1;
    updatedMeal = {
        ...state.meals[action.mealName],
        amount:updatedMealAmount
    }
    updatedMeals = {
        ...state.meals,
        [action.mealName]:updatedMeal
    }
    isInOrdered = false;
    for (let mealName in state.orderedMeals) {
        if(mealName === action.mealName) {
            isInOrdered = true;
        }
    }
    if (isInOrdered) {
        updatedOrderedMeals= {
            ...state.orderedMeals,
            [action.mealName]: state.orderedMeals[action.mealName] - 1
        }
    }
    for(let mealName in updatedOrderedMeals) {
        if(updatedOrderedMeals[mealName]) {
            updatedOrdered = {
                ...updatedOrdered,
                [mealName]: updatedOrderedMeals[mealName]
            }
        }
    }
    const buildingState = Object.keys(updatedOrdered).length ? true : false;
    return {
        ...state,
        meals: updatedMeals,
        totalPrice: state.totalPrice - Number(state.meals[action.mealName]['price']),
        orderedMeals: updatedOrdered,
        building: buildingState
    };
};

const  reducer = (state=initialState, action) => {
    switch ( action.type ) {
        case actionTypes.SET_MEALS: return setMeals(state, action); 
        case actionTypes.FETCH_MEALS_FAILED: return fetchMealsFailed(state, action); 
        case actionTypes.ADD_MEAL: return addMeal(state, action);
        case actionTypes.REMOVE_MEAL: return removeMeal(state, action);     
        default: return state;
    }
};

export default reducer;