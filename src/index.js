// ===========================
// Requires
// ===========================
const express = require('express');
// ===========================
// Initializations
// ===========================
const app = express();
// ===========================
// Middleware
// ===========================
app.use(express.json());
// ===========================
// Port
// ===========================
app.set('port',process.env.PORT || 3000)

app.listen(app.get('port'), ()=>{
    console.log('Listening port: ', app.get('port'));
})