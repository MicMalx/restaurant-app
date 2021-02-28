import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import style from './Orders.module.css';

import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';

class Orders extends Component {
    state = {
        loading: false,
        orders: [],
        error: false
    }

    componentDidMount() {
        this.setState({loading: true})
        const queryParams = '?auth=' + this.props.token + '&orderBy="userId"&equalTo="' + this.props.userId + '"';
        axios.get('/order.json' + queryParams)
        .then(res => {
            const fetchedOrders = [];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({loading: false, orders: fetchedOrders, error: false});
        })
        .catch(err => {
            this.setState({loading: false, error: true});
        });
    }

    render() {
        let orders = <Spinner />;
        if(!this.state.loading && this.state.error) {
            orders = <h3 className={style.Error}>Something went wrong! Try again later</h3>;
        }
        else if(!this.state.loading) {
            orders = this.state.orders.map(order => (
                <Order
                    key={order.id}
                    meals={order.meals}
                    price={order.price}
                />
            ));
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    };
};

export default connect(mapStateToProps)(Orders);