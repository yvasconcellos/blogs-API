const express = require('express');
const Routes = require('./routes/index');

// ...

const app = express();

app.use(express.json());
app.use('/login', Routes.loginRoutes);
app.use('/user', Routes.userRoutes);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
