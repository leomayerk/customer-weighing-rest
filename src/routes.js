const express = require('express');
const CustomerWeighingControler = require('./controllers/CustomerWeighingControler')
const routes = express.Router();

routes.post('/customer-weighing', CustomerWeighingControler.create);
routes.get('/customer-weighing/:id', CustomerWeighingControler.index);
routes.get('/customer-weighing', CustomerWeighingControler.query);
routes.delete('/customer-weighing/:id', CustomerWeighingControler.delete);

module.exports = routes;