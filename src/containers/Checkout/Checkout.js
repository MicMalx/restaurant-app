import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';

import { connect } from 'react-redux';
import MealsList from '../../components/MealsList/MealsList';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    render() {
        let mealsSummary = <Redirect to="/" />;
        let purchasedRedirect = null;
        if(this.props.meals && Object.keys(this.props.orderedMeals).length) {
            purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
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
            <React.Fragment>
                {purchasedRedirect}
                {mealsSummary}
                <ContactData />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        meals: state.orderBuilder.meals,
        orderedMeals: state.orderBuilder.orderedMeals,
        totalPrice: state.orderBuilder.totalPrice,
        purchased: state.orderSender.purchased
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onMealAdded: (mealName) => dispatch(actions.addMeal(mealName)),
        onMealRemoved: (mealName) => dispatch(actions.removeMeal(mealName))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);