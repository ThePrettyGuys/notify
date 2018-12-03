let express= require('express');
let app= express();
let notificationsController = require('../controllers/notificationsController');

//Rutas
app.post('/subscribe', notificationsController.subscribe);

app.post('/unsubscribe', notificationsController.unsubscribe);

app.post('/notify', notificationsController.notify);

app.get('/subscriptions', notificationsController.getSubscriptions);

app.delete('/subscriptions', notificationsController.deleteSubscriptions);

module.exports = app;