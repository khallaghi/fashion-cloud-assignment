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

