import React from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = (props) => {
    return (
        <form className={classes.form} action="">
            <Input label="Amount" input={{
                id: 'amount',
                type: 'number',
                min: '1', max: '5', 
                step: '1', 
                defaultValue: '1'
            }}></Input>
            <button>+ Add</button>
        </form>
    );
}

export default MealItemForm;