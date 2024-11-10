import { useState } from "react"
import { useFoodContext } from '../hooks/useFoodContext'

const FoodForm = () => {
    const { dispatch } = useFoodContext()

    const [title, setTitle] = useState('')
    const [quantity, setQuantity] = useState('')
    const [unit, setUnit] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault() //prevent loading the page after submit
        const item = { title, quantity, unit }

        // Send a POST request to the backend to add a new food item
        const res = await fetch('/api/food/', {
            method: 'POST',  // Specify HTTP method
            body: JSON.stringify(item), //convert object to json
            headers: {
                'Content-Type': 'application/json' //to let the server know that the content being sent in the request body is JSON.
            }
        })
        const json = await res.json()

        if (!res.ok) {
            setError(json.error)
        } else {
            setTitle('')
            setQuantity('')
            setUnit('')
            setError(null)
            console.log('New food added', json)
            dispatch({ type: 'ADD_FOOD', payload: json })
        }
    }


    return (
        <form className="add" onSubmit={handleSubmit}>
            <h3>What did you buy?</h3>
            <label>Item:</label>
            <input type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Quantity:</label>
            <input type="number"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
            />

            <label>Unit:</label>
            <input type="text"
                onChange={(e) => setUnit(e.target.value)}
                value={unit}
            />

            <button>Add Food</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default FoodForm