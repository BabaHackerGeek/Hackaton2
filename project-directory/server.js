const express = require('express');
const path = require('path');
const app = express();
const apiRoutes = require('./routes/api');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);

app.listen(3000, () => {
    console.log('Serveur lancé sur le port 3000');
});
