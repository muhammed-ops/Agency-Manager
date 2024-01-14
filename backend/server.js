require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Profile = require('./profileModel.js')
const User = require('./userModel.js')

const app = express()
app.use(express.json())


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

//login
app.post('/api/login', (req,res)=>{
    res.status(200).json('user logged in')
})

//signup
app.post('/api/signup', async (req,res)=>{
    const {email , password } = req.body
    try{
        const user = await User.signup(email , password)
        res.status(200).json(email , user)

    }
    catch(err){
        res.status(400).json(err.message)
    }
    res.status(200).json('user signed up')

})