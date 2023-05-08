const Food = require('../models/foodModel')
const mongoose = require('mongoose')

// get all meals
const getMeals = async (req, res) => {
    const meals = await Food.find({}).sort({createdAt: -1})

    res.status(200).json(meals)
}

// get a single meal
const getMeal = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such meal'})
    }

    const meal = await Food.findById(id)

    if(!meal) {
        return res.status(404).json({error: 'No such meal'})
    }
    
    res.status(200).json(meal)
}

// create new workout
const createMeal = async (req, res) => {
    const { title, calories, protein, carbs, fat } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!calories) {
        emptyFields.push('calories')
    }
    if (!protein) {
        emptyFields.push('protein')
    }
    if (!carbs) {
        emptyFields.push('carbs')
    }
    if (!fat) {
        emptyFields.push('fat')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    try {
        const meal = await Food.create({title, calories, protein, carbs, fat})
        res.status(200).json(meal)
    } catch (err) {
        res.status(400).json({error: err.message})
    }

}

// delete a meal 
const deleteMeal = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such meal'})
    }

    const meal = await Food.findOneAndDelete({_id: id})

    if(!meal) {
        return res.status(404).json({error: 'No such meal'})
    }

    res.status(200).json(meal)
}

// update a meal
const updateMeal = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such meal'})
    }

    const meal = await Food.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!meal) {
        return res.status(404).json({error: 'No such meal'})
    }

    res.status(200).json(meal)
}


module.exports = {
    createMeal,
    getMeals,
    getMeal,
    deleteMeal,
    updateMeal
}