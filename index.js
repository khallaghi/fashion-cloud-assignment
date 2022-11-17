require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

configDatabase()
setupServer()

function setupServer() {

    const app = express();
    app.use(express.json());

    app.listen(3000, () => {
        console.log(`Server started at ${3000}`)
    });
    const routes = require('./routes/routes');
    app.use('/api', routes)
}

function configDatabase() {
    const mongoString = process.env.DB_URL;
    console.log(mongoString)
    mongoose.connect(mongoString);
    const database = mongoose.connection;
    database.on('error', (error) => {
        console.log(error);
    });
    database.once('connected', () => {
        console.log('Database connected')
    });
}
