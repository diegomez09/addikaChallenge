// ===========================
//  Config file
// ===========================
require('./config/config');
// ===========================
// Requires
// ===========================
const express = require('express');
require('./config/db');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user')
const loginRouter = require('./routes/login');
const postRouter = require('./routes/post');
const reviewRouter = require('./routes/review');
const logRouter = require('./routes/log');
// ===========================
// Initializations
// ===========================
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(userRouter);
app.use(loginRouter);
app.use(postRouter);
app.use(reviewRouter);
app.use(logRouter);
// ===========================
// Middleware
// ===========================
app.use(express.json());
// ===========================
// Port
// ===========================
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('Listening port: ', app.get('port'));
})