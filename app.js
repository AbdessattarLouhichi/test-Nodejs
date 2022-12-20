//  Config Environment
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const authRole = require('./passport/authRole')
const passport = require('passport');
require('./passport/bearer');

//start a new Express application
const app = express();

// connect to database
const PORT = 4000 || process.env.PORT;
require('./database/connect');
app.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
});
 

// middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

//EJS TEMPLATE
app.set('view engine', 'ejs');
app.set('views',path.join('views'))


 //Get request
app.get('/home',(req, res)=>{
     res.status(200).render('index')
}); 

// dashboard 
app.get('/dashboard',passport.authenticate('bearer', { session: false }),authRole(["admin"]),(req,res)=>{
    res.status(200).render('dashboard')
})

// initialize routes
app.use('/api',require('./routes/authRoute'));
app.use('/api',require('./routes/customerRoute'));
app.use('/api',require('./routes/productRoute'));
app.use('/api',require('./routes/orderRoute'));


//PORT
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);