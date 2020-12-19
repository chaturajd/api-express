const express = require('express');
const organicnomDb = require('../database/organicnom');

const organicnomRouter = express.Router();

organicnomRouter.get('/exercises/all',async (req,res,next)=>{
    try {
        let results = await organicnomDb.allExercises();
        res.json(results);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
})

organicnomRouter.get('/lessons/all',async (req,res,next)=>{
    try {
        let results = await organicnomDb.allLessons();
        res.json(results);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
})

module.exports = organicnomRouter;