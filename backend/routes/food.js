const express = require('express')
const {
    getFood,
    getItem,
    addFood,
    deleteItem,
    updateItem
} = require('../controllers/food_controller')
const router = express.Router()

//Get all food
router.get('/', getFood)

//Get one item
router.get('/:id', getItem)

//Add a new item
router.post('/', addFood)

//Delete an item
router.delete('/:id', deleteItem)

//update an item
router.patch('/:id', updateItem)
module.exports = router