import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    // TO USE ASYNC/AWAIT IN useEffect, CREATE A FUNCTION THAT HOLDS THE PROMISE, THEN CALL THE FUNCTION INSIDE OF useEffect.
    const fetchMeals = async () => {
      const response = await fetch('https://food-order-app-10c85-default-rtdb.firebaseio.com/meals.json');

      if (!response.ok){
        throw new Error('Something went wrong')
      };

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    }
    // CALLING THE FUNCTION
    fetchMeals().catch ((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if(isLoading){
    return(
      <section className={styles.MealsLoading}>
        <p>loading...</p>
      </section>
    )
  }

  if(httpError){
    return(
      <section className={styles.MealsError}>
        <p>{httpError}</p>
      </section>
    )
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      description={meal.description}
      name={meal.name}
      price={meal.price}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
