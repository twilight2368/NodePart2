const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const User = require('./models/model')
const app = express();
const customerRoute = require('./routes/customer')

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECTION)
.then(()=>{
    console.log('app listen on '+ process.env.PORT);
    app.listen(process.env.PORT);
})
.catch((err)=>{
    console.log(err);
})


app.get('/', (req, res) => {
    res.send('<h1>hello</h1>')
})

// customer route
app.use(customerRoute);