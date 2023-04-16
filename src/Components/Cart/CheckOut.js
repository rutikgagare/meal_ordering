import { useRef, useState } from 'react';
import classes from './CheckOut.module.css';

const Checkout = (props) => {
    const [formInputIsValid, setFormInputIsValid] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const isEmpty = (value) => value === "";
    const isNotSixChars = (value) => value.trim().length !== 6;

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalCodeIsValid = !isNotSixChars(enteredPostalCode);
        const enteredCityIsValid = !isEmpty(enteredCity);

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;

        setFormInputIsValid({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postalCode: enteredPostalCodeIsValid,
            city: enteredCityIsValid
        });

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            postalCode:enteredPostalCode,
            city:enteredCity
        });
    };

    return (

        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${formInputIsValid.name ?'':classes.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputIsValid.name && <p>name field must be filled</p>}
            </div>

            <div className={`${classes.control} ${formInputIsValid.street ?'':classes.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputIsValid.name && <p>street field must be filled</p>}
            </div>

            <div className={`${classes.control} ${formInputIsValid.postalCode ?'':classes.invalid}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalCodeInputRef} />
                {!formInputIsValid.name && <p>pincode must be of length 5</p>}
            </div>
            
            <div className={`${classes.control} ${formInputIsValid.city ?'':classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputIsValid.name && <p>city field must be filled</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;