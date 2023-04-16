import React from 'react';
import mealsImage from '../../assets/mahbub-majid-C2uAWfPYTao-unsplash.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <React.Fragment>
        <header className={classes.header}>
            <h1>React Meals</h1>
            <HeaderCartButton onShowCart={props.onShowCart}></HeaderCartButton>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt="A table full of delicious food!" />
        </div>
    </React.Fragment>
  )
}

export default Header;