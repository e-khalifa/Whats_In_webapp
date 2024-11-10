import { useEffect } from 'react'
import { useFoodContext } from '../hooks/useFoodContext'
import FoodDetails from '../components/food_details'
import FoodForm from '../components/food_form'

const Home = () => {
    const { food, dispatch } = useFoodContext()
    useEffect(() => {
        const fetchFood = async () => {
            const res = await fetch('/api/food/')
            const json = await res.json()

            if (res.ok) {
                dispatch({ type: 'SET_FOOD', payload: json })
            }
        }
        fetchFood()
    }, [dispatch])
    return (
        <div className="home">
            <div
                className="food">
                {food && food.map((item) => (
                    <FoodDetails key={item._id} item={item} />
                )
                )}
            </div>
            <FoodForm />
        </div>
    )
}

export default Home;