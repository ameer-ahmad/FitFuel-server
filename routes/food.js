const express = require('express');
const { 
    createMeal,
    getMeals,
    getMeal,
    deleteMeal,
    updateMeal
 } = require('../controllers/foodController')

const router =  express.Router();

// GET all meals
router.get('/', getMeals)

//GET a single meal
router.get('/:id', getMeal)

// POST a new meal
router.post('/', createMeal)

// DELETE a meal
router.delete('/:id', deleteMeal)

// UPDATE a meal
router.patch('/:id', updateMeal)

module.exports = router