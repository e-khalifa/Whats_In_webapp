import { useFoodContext } from '../hooks/useFoodContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const FoodDetails = ({ item }) => {
    const { dispatch } = useFoodContext()
    const handleClick = async () => {
        const res = await fetch('/api/food/' + item._id, {
            method: 'DELETE'
        })
        const json = await res.json()
        if (res.ok) {
            dispatch({ type: 'DELETE_FOOD', payload: json })
        }
    }

    const createdAtDate = item.createdAt ? new Date(item.createdAt) : null;
    const isValidDate = createdAtDate instanceof Date && !isNaN(createdAtDate);

    return (
        <div className="food-details">
            <h4>{item.title}</h4>
            <p><strong>Quantity: </strong>{item.quantity}</p>
            <p><strong>Unit: </strong>{item.unit}</p>
            <p>
                {isValidDate
                    ? formatDistanceToNow(createdAtDate, { addSuffix: true })
                    : 'Unknown date'}
            </p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default FoodDetails
