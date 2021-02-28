import * as actionType from './actionTypes';
import axios from '../../axios-orders';

export const purchaseOrderSuccess = (orderData) => {
    return {
        type: actionType.PURCHASE_ORDER_SUCCESS,
        orderData: orderData
    };
};

export const purchaseOrderFail = (error) => {
    return {
        type: actionType.PURCHASE_ORDER_FAIL,
        error: error
    };
};

export const purchaseOrderStart = () => {
    return {
        type: actionType.PURCHASE_ORDER_START
    };
};

export const purchaseOrder = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseOrderStart());
        axios.post('/order.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseOrderSuccess(response.data.name, orderData));
            })
            .catch(() => {
                dispatch(purchaseOrderFail());
            });
    };
};

export const purchasedReset = () => {
    return {
        type: actionType.PURCHASED_RESET
    };
};

export const errorPurchasedReset = () => {
    return {
        type: actionType.ERROR_PURCHASED_RESET
    };
};