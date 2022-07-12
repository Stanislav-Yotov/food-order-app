import { useEffect, useState } from 'react';
import styles from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-http-2d866-default-rtdb.europe-west1.firebasedatabase.app/Meals.json');
      const responseData = await response.json();
      const loadedMeals = [];

      for (const key in responseData) {
       loadedMeals.push({
        id: key,
        name: responseData[key].name,
        description: responseData[key].description,
        price: responseData[key].price
       });
      }
      setMeals(loadedMeals);
    };

    fetchMeals();
  }, [])

  const mealsList = meals.map(m => <MealItem
    key={m.id}
    id={m.id}
    name={m.name}
    description={m.description}
    price={m.price}
  />);

  return (
    <section className={styles.meals}>
      <Card>
        <ul>
          {mealsList}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;