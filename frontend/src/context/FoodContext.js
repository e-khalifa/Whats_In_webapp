import { createContext, useReducer } from 'react'

export const FoodContext = createContext()
export const foodReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FOOD':
            return {
                food: action.payload
            }
        case 'ADD_FOOD':
            return {
                food: [action.payload, ...state.food] //the new food item from `action.payload` is added to the beginning of the `food` array.
            }
        case 'DELETE_FOOD':
            return {
                food: state.food.filter((f) => f._id !== action.payload._id

                )
            }
        default: return state
    }
}
export const FoodContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(foodReducer, { food: null })

    return (
        <FoodContext.Provider value={{ ...state, dispatch }}>
            {children}
        </FoodContext.Provider>
    )
}