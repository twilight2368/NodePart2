const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const User = require('./models/model')
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


mongoose.set('strictQuery', false);
mongoose.connect( process.env.CONNECTION)
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
app.get('/api/customer', async (req, res)=>{
    try {
        const result = await User.find();
        res.send({"user": result});
    
    } catch (error) {
        res.status(500).json({error: e.message});
    }
})


app.post('/api/customer', async (req, res) => {
    const an_user = new User(req.body);

    try {
        await an_user.save();
        res.json(an_user); 
    } catch (error) {
        res.json({error});
    }
})

app.get('/api/customer/:id', async (req, res) =>{
    const id = req.params.id;
    try {
        User.findById(id).then((data)=>{
            res.json({user: data});
        })
    } catch (error) {
        console.log({error})
    }
})

app.put('/api/customer/:id', async(req, res) => {
    try {
        const userId = req.params.id;
        const result = await User.replaceOne({_id: userId}, req.body);
        console.log(result);
        res.json({updateCount: result.modifiedCount});
    } catch (error) {
        res.status(500).json({error: 'Opps cant update'})
    }
});

app.delete('/api/customer/:id', async(req, res) => {
    try {
        const userId = req.params.id;
        const result = await User.deleteOne({_id: userId});
        res.json({deletedCount: result.deletedCount});
    } catch (error) {
        res.status(500).json({error: 'Opps cant delete'});
    }
})