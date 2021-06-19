const express = require('express');
const { PORT } = require('./config');
const database = require('./config/database')
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');

start();

async function start() {
    const app = express();

    await database(app);
    expressConfig(app);

    routesConfig(app);


    app.listen(PORT, () => console.log(`App started on htpp://localhost/${PORT}`));
}