import React, { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';


// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//     },
// ];

const AvailableMeals = () => {
    const [mealsData, setMealsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchMeals() {
        try {
            const response = await fetch('https://meals-b9676-default-rtdb.firebaseio.com/meals.json');

            if (!response.ok) {
                throw new Error("Something Went Wrong");
            }

            const data = await response.json();

            const loadedMeals = [];

            for (const key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price
                });
            }
            setMealsData(loadedMeals);
            setIsLoading(false);
        }
        catch (error) {
            console.log(error);
            console.log(error.message);
            setIsLoading(false);
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchMeals();
    }, []);

    if (isLoading) {
        return (
            <section>
                <p className={classes.mealsLoading}>Loading....</p>
            </section>
        )
    }

    if (error) {
        return (
            <section>
                <p className={classes.mealsError}>{error}</p>
            </section>
        )
    }

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsData.map((meal) => {
                        return (
                            <MealItem
                                key={meal.id}
                                id={meal.id}
                                name={meal.name}
                                description={meal.description}
                                price={meal.price}>
                            </MealItem>
                        )
                    })}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals;