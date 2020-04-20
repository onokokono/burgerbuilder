import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import css from './Burger.module.css';
import {withRouter} from 'react-router-dom';


const burger = props => {
    let transformedIngredients =
        Object.keys(props.ingredients)
            .map(igKey => {
                return [...Array(props.ingredients[igKey])].map((_, i) => {
                    return <BurgerIngredient key={igKey + i} type={igKey} />
                });
            })
            .reduce((acc, curr) => {
                return acc.concat(curr);
            });

    if(transformedIngredients.length === 0) transformedIngredients = 'Please add ingredients';

    return (
        <div className={css.Burger} >
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default withRouter(burger);