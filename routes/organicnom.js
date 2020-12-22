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

organicnomRouter.get('/pointers/get',async (req,res,next)=>{
    try {
        let results = await organicnomDb.getPointers();
        res.json(results);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
})

organicnomRouter.post('/pointers/update',async (req,res,next)=>{
    console.log("Sync request received");
    try {
        const userId = req.info.userId;
        const lessonPointer = req.body.lessonPointer;
        const exercisePointer = req.body.exercisePointer;
        console.log(" Saving status ");

        const result = await organicnomDb.updatePointers(userId,lessonPointer,exercisePointer);
        
        console.log("Pointers Saving status "+ result);
        console.log(`${userId} , ${lessonPointer},${exercisePointer}`);

        res.sendStatus(204);
    } catch (error) {
        console.log(`Error occurred Saving pointers : ${error}`);
        res.sendStatus(500)
    }
});

module.exports = organicnomRouter;