const express = require('express');
const { PORT } = require('./config');
const database = require('./config/database')
const expressConfig = require('./config/express');

start();

async function start() {
    const app = express();

    await database(app);
    expressConfig(app);
    
    app.get('/', (req, res) => {
        res.send('It works');
    })

    app.listen(PORT, () => console.log(`App started on htpp://localhost/${PORT}`));
}