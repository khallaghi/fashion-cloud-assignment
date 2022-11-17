const express = require('express');
const router = express.Router();
module.exports = router;
const cacheTool = require('../controllers/cache')

router.get('/get/:key', async (req, res) => {
    console.log("HERE")
    try {
        const value = await cacheTool.retrieveAndUpdate(req.params.key)
        res.status(200).json({value: value})
    } catch (e) {
        res.status(400).json({message: e.message})
    }
});

router.get('/all', async (req, res) => {
    try {
        const all = await cacheTool.retrieveAll();
        res.status(200).json(all);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.put('', async (req, res) => {
    try {
        // TODO: Validate req.body
        const result = await cacheTool.addOrUpdateRecord(req.body);
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.delete('/key/:key', async (req, res) => {
    try {
        const result = await cacheTool.deleteOne(req.params.key);
        res.status(200).json({result: result})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.delete('/all', async (req, res) => {
    try {
        const result = await cacheTool.deleteAll();
        res.status(200).json({result: result})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});


