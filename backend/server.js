require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Profile = require('./profileModel.js')

const app = express()
app.use(express.json())

const createToken = (_id) =>{
    return jwt.sign({id : _id}, process.env.SECRET_KEY, {expiresIn : '3d'})
} 


//connect to database
mongoose.connect(process.env.db)
.then(()=>{
    //listen to server on port
    app.listen(process.env.PORT,()=>{
        console.log(`server running on port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log(err)
})

//get all profiles
app.get('/api/profiles', async (req,res)=>{
    const profile = await Profile.find().sort({createdAt : -1})
    res.status(200).json(profile)
})

//get single profile
app.get('/api/profiles/:id', async (req,res)=>{
    const id = req.params.id
    if(mongoose.Types.ObjectId.isValid(id)){
        const profile = await Profile.findById(id)
        res.status(200).json(profile)
    }else{
        res.status(500).json('no profile found')
    }
})

//sort by pay(ascending)
app.get('/api/sortbypay1', async (req, res) => {
    try {
      const profiles = await Profile.find().sort({ pay: 1 });
      res.status(200).json(profiles);
    } catch (error) {
      console.error('Error fetching and sorting profiles:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//sort by pay(descending)
app.get('/api/sortbypay-1', async (req, res) => {
    try {
      const profiles = await Profile.find().sort({ pay: -1 });
      res.status(200).json(profiles);
    } catch (error) {
      console.error('Error fetching and sorting profiles:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//sort by holiday(yes)
app.get('/api/holidayyes', async (req, res) => {
    try {
      const profiles = await Profile.find({onholiday : true})
      res.status(200).json(profiles);
    } catch (error) {
      console.error('Error fetching and sorting profiles:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//sort by holiday(no)
app.get('/api/holidayno', async (req, res) => {
    try {
      const profiles = await Profile.find({onholiday : false})
      res.status(200).json(profiles);
    } catch (error) {
      console.error('Error fetching and sorting profiles:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//create a profile
app.post('/api/profiles', async(req,res)=>{
    const body = req.body
    try{
        const profile = await Profile.create(body)
        res.status(200).json(profile)
    }
    catch(err){
        res.status(404).json(err)    
    }
})

//patch a profile
app.patch('/api/profiles/:id', async(req,res)=>{
    const id = req.params.id
    const update = req.body
    if(mongoose.Types.ObjectId.isValid(id)){
        const profile = await Profile.findByIdAndUpdate(id , {$set : update} , {new : true})
        res.status(200).json(profile)
    }else{
        res.status(500).json('no profile found')
    }
})

//delete a single profile
app.delete('/api/profiles/:id', async(req,res)=>{
    const id = req.params.id
    if(mongoose.Types.ObjectId.isValid(id)){
        const profile = await Profile.findByIdAndDelete(id)
        res.status(200).json(profile)
    }else{
        res.status(500).json('no profile found')
    }
})