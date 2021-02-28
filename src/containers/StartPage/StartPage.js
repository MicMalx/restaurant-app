import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import style from './StartPage.module.css';
import Soup from '../../assets/Images/Soup.jpg';
import KidsMenu from '../../assets/Images/KidsMenu.jpg';
import MainCourse from '../../assets/Images/MainCourse.jpg';
import Dessert from '../../assets/Images/Dessert.jpg';

import MealType from '../../components/MealType/MealType';

class StartPage extends Component {
    componentWillUnmount() {
        if(this.props.purchased)
        {
            this.props.onPurchasedReset();
            this.props.onInitMeals();
        }
    }
    render() {
        return (
            <div className={style.Container}>
                {this.props.purchased ? <h2>Your order has been made successfully.</h2> : null}
                <h1>MENU</h1>
                <MealType imgSrc={Soup} label={"Soups"} url="/soups" />
                <MealType imgSrc={KidsMenu} label={"Kids Menu"} url="/kidsMenu"/>
                <MealType imgSrc={MainCourse} label={"Main Course"} url="/mainCourse"/>
                <MealType imgSrc={Dessert} label={"Desserts"} url="/desserts"/>
            </div>
        );
    }  
}

const mapStateToProps = state => {
    return {
        purchased: state.orderSender.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitMeals: () => dispatch(actions.initMeals()),
        onPurchasedReset: () => dispatch(actions.purchasedReset()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
