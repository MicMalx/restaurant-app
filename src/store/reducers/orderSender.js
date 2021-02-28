import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    purchased: false,
    error: false
}

const purchaseOrderStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: false
    }; 
};

const purchaseOrderSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        purchased: true,
        error: false
    };
};

const purchaseOrderFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: true
    };
};

const purchasedReset = (state, action) => {
    return {
        ...state,
        purchased: false,
    };
};

const errorPurchasedReset = (state, action) => {
    return {
        ...state,
        error: false
    };
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_ORDER_START: return purchaseOrderStart(state, action);
        case actionTypes.PURCHASE_ORDER_SUCCESS: return purchaseOrderSuccess(state, action);
        case actionTypes.PURCHASE_ORDER_FAIL: return purchaseOrderFail(state, action);
        case actionTypes.PURCHASED_RESET: return purchasedReset(state, action);
        case actionTypes.ERROR_PURCHASED_RESET: return errorPurchasedReset(state, action);   
        default: return state;
    }
}

export default reducer;