import React from 'react';
import css from './Order.module.css'

const order = props => {

    const transformedIngredients = [];
    for (let key in props.ingredients) {
        transformedIngredients.push({
            name: key,
            count: props.ingredients[key]
        });
    }

    const ingredients = transformedIngredients.map(ig => {
        return <span className={css.igSpan} key={ig.name}> {ig.name} ({ig.count}) </span>
    })

    return (
        <div className={css.Order}>
            <p> Ingredients: {ingredients} </p>
            <p> Price: <strong> USD {props.totalPrice} </strong> </p>
        </div>
    );
}

export default order;