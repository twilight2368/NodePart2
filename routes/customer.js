const express = require('express');
const mongoose = require('mongoose');

const route = express();
route.use(express.json())
route.use(express.urlencoded({extended: true}));
route.use(express.static('public'));

const User = require('../models/model')

route.get('/api/customer', async (req, res)=>{
    try {
        const result = await User.find();
        res.send({"user": result});
    
    } catch (error) {
        res.status(500).json({error: e.message});
    }
})


route.post('/api/customer', async (req, res) => {
    const an_user = new User(req.body);

    try {
        await an_user.save();
        res.json(an_user); 
    } catch (error) {
        res.json({error});
    }
})

route.get('/api/customer/:id', async (req, res) =>{
    const id = req.params.id;
    try {
        User.findById(id).then((data)=>{
            res.json({user: data});
        })
    } catch (error) {
        console.log({error})
    }
})

route.put('/api/customer/:id', async(req, res) => {
    try {
        const userId = req.params.id;
        const result = await User.replaceOne({_id: userId}, req.body);
        console.log(result);
        res.json({updateCount: result.modifiedCount});
    } catch (error) {
        res.status(500).json({error: 'Opps cant update'})
    }
});

route.delete('/api/customer/:id', async(req, res) => {
    try {
        const userId = req.params.id;
        const result = await User.deleteOne({_id: userId});
        res.json({deletedCount: result.deletedCount});
    } catch (error) {
        res.status(500).json({error: 'Opps cant delete'});
    }
})

module.exports = route