import React, { Component } from 'react';
import style from './OrderBuilder.module.css';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import MealsList from '../../components/MealsList/MealsList';

class OrderBuilder extends Component {
    componentDidMount() {
        if(!this.props.meals){
            this.props.onInitMeals();
        }
    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.props.history.push('/checkout');
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    render() {
        let mealsList = this.props.error ? <p>Meals can't be loaded</p> : <Spinner />;
        if(this.props.meals) {
            mealsList = <MealsList 
                menuPart={this.props.menuPart}
                meals={this.props.meals}
                mealAdded={this.props.onMealAdded}
                mealRemoved={this.props.onMealRemoved}
                summary={false}
            />;
        }
        let mealsSummary = null;
        if(this.props.meals) {
            mealsSummary = (
            <MealsList 
                meals={this.props.meals}
                mealAdded={this.props.onMealAdded}
                mealRemoved={this.props.onMealRemoved}
                summary={true}
                totalPrice={this.props.totalPrice}
            />
            );
        }
        return (
            <div className={style.OrderBuilder}>
                {mealsList}
                {mealsSummary}
                <Button
                    btnType="Success"
                    disabled={Object.keys(this.props.orderedMeals).length ? false : true}
                    clicked={this.purchaseHandler} 
                >{this.props.isAuth ? 'ORDER NOW' : 'LOGIN TO ORDER'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        meals: state.orderBuilder.meals,
        totalPrice: state.orderBuilder.totalPrice,
        error: state.orderBuilder.error,
        purchased: state.orderSender.purchased,
        isAuth: state.auth.token !== null,
        orderedMeals: state.orderBuilder.orderedMeals
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitMeals: () => dispatch(actions.initMeals()),
        onMealAdded: (mealName) => dispatch(actions.addMeal(mealName)),
        onMealRemoved: (mealName) => dispatch(actions.removeMeal(mealName)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderBuilder));