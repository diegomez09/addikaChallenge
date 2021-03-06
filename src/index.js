// ===========================
// Requires
// ===========================
const express = require('express');
require('./config/db');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user')
// ===========================
// Initializations
// ===========================
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(userRouter);
// ===========================
// Middleware
// ===========================
app.use(express.json());
// ===========================
// Port
// ===========================
app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
    console.log('Listening port: ', app.get('port'));
})