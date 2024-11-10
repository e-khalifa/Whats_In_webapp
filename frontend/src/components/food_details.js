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
    return (
        <div className="food-details">
            <h4> {item.title}</h4>
            <p><strong>Quantity: </strong>{item.quantity}</p>
            <p><strong>Unit: </strong>{item.unit}</p>
            <p>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>

        </div>
    )
}
export default FoodDetails;