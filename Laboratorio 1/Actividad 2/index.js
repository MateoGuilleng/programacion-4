const express = require('express');
const app = express();
const port = 3000;

const homeController = require('./controllers/homeController');
const routes = require('./routes/index');
const requestLogger = require('./middlewares/requestLogger');
const logger = require('./middlewares/logger');

app.use(requestLogger);
app.use(logger);

app.use('/api', routes);

app.get('/', homeController.getHome);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});