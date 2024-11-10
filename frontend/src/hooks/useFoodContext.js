import { FoodContext } from "../context/FoodContext";
import { useContext } from "react";

export const useFoodContext = () => {
    const ctx = useContext(FoodContext)
    if (!ctx) {
        throw Error('useFoodContext must be used inside an FoodContextprovider')
    }

    return ctx
}