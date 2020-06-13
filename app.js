//add files
const userRoutes = require('./Routes/user');

const User = require('./models/users');

const path = require('path'); 

const express = require('express'); 

const body = require('body-parser');// parse application/x-www-form-urlencoded

const mongoose = require('mongoose'); 

const mongoDbUrl ='mongodb+srv://NabilMohamed:yZ5iUBROevb6Mr4w@cluster0-pdyp5.mongodb.net/edocom?retryWrites=true&w=majority';

const app = express();

app.use(body.urlencoded({extended: false}));

app.set('view engine','html');

app.use(express.static(path.join(__dirname,'assets')));

app.engine('html', require('ejs').renderFile);

// app.set('views','Views');

app.use(userRoutes);


mongoose.connect(mongoDbUrl)
.then(()=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err)
})
