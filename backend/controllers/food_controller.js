const Food = require('../models/food_model')
const mongoose = require('mongoose')

//get all food
const getFood = async (req, res) => {
    const food = await Food.find({}).sort({ createdAt: -1 })
    res.status(200).json(food) //Put all foof in json list
}

//get a single item
const getItem = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not in the fridge!' })
    }
    const food = await Food.findById(id)

    if (!food) {
        return res.status(404).json({ error: 'Not in the fridge!' })
    }

    res.status(200).json(food)
}

//add new item
const addFood = async (req, res) => {
    const {
        title, quantity, unit
    } = req.body

    if (!title) {
        return res.status(400).json({ error: 'Title is required.' });
    }
    //add doc to db
    try {
        const food = await Food.create({
            title, quantity, unit
        })
        res.status(200).json(food)
    } catch (error) {
        res.status(500).json({ error: "Server error occurred while adding food item." });
    }
}

//delete an item
const deleteItem = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not in the fridge!' })
    }
    const food = await Food.findOneAndDelete({ _id: id })

    if (!food) {
        return res.status(404).json({ error: 'Not in the fridge!' })
    }

    res.status(200).json(food)

}

//update an item
const updateItem = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not in the fridge!' })
    }
    const food = await Food.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!food) {
        return res.status(404).json({ error: 'Not in the fridge!' })
    }

    res.status(200).json(food)
}

module.exports = {
    getFood,
    getItem,
    addFood,
    deleteItem,
    updateItem
}