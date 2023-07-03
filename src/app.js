const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/user.routers');
const asignaturasRouter = require('./routers/asignaturas.routers');
const { errorHandler } = require('./controller/user.controller');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/students', userRouter);
app.use('/asignaturas', asignaturasRouter);

app.use(errorHandler);

module.exports = app;
