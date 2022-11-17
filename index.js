require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

configDatabase()
setupServer()

function setupServer() {

    const app = express();
    app.use(express.json());
    // TODO: put the port number in .env alongside username and password
    const port = process.env.PORT
    app.listen(port, () => {
        console.log(`Server started at ${port}`)
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
