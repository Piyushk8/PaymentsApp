
const bcrypt = require('bcrypt')
const express = require('express');
const {authMiddleware} = require("../middleware.js")
const zod  = require("zod");
const userRouter  = express.Router()
//jwt 
const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
//databases
const {User} = require("../db/db.js");
const { Router } = require("express");

const signupSchema = zod.object({
    username :zod.string().email(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string()
})


userRouter.post("/signup", async(req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"email already taken/Incorrect inputs"
        })
    }

    const ExistingUser =await User.findOne({
        username:body.username
    })


    if (ExistingUser){
        console.log('hellllll')
        
        return res.json("Email already taken");

    }


//bcrypting 
const hash = await bcrypt.hash(body.password,10);
console.log(hash)
    const dbuser = await User.create({
    username:body.username,
    password:hash,
    firstname:body.firstname,
    lastname:body.lastname
    })

    const token = jwt.sign({
        userId:dbuser._id
    },JWT_SECRET)

    res.json({message:"User Created successfully",
        token:token
    })
    })

const SignInSchema = zod.object({
    username:zod.string().email(),
    password:zod.string()
})

userRouter.post("/signin",async (req,res)=>{
    console.log("user signin ")
    const body = req.body;
  
    const {success} = SignInSchema.safeParse(req.body);
    if(!success){ 
        return res.status(411).json({
            message:"email already taken/Incorrect inputs"
            
        })
    }

  
    const users =await User.find({
        username:body.username,
       
    })

const user = users.filter(async(user)=>{
await bcrypt.compare(body.password,user.password)
})



if (user){
   
    const token = jwt.sign({
        userId:user[0]._id
    },JWT_SECRET)
     
    res.json({
        token:token,
        Username:user.username,
        Firstname:user.firstname

    })
}


    return;
    
    
    
    })


// ! UPDATE USER PASSWORD
//ZOD TEMPLATE

const updatebody = zod.object({
    password:zod.string().optional(),
    firstname:zod.string().optional(),
    lastname:zod.string().optional()
})

userRouter.put("/",authMiddleware,async(req,res)=>{
    const {success} = updatebody.safeParse(req.body)

    if(!success){
        res.status(411).json({
            message:"error while updating information"
        })
    }


    const filter = { username: req.headers.username }; // Filter criteria to select the user
    const update = { $set: { password: req.body.password } }; // Update operation to set the new hashed password
  
    await User.updateOne(filter,update)
res.json({
    message:"Update succesful"
})
})


//!this is  a get statement with filterable option in it 

// userRouter.get("/",authMiddleware,async(req,res)=>{


// const Body = req.params;
// const users =await User.find({
//     $or:[{firstname:`/${Body.firstname}/`},{lastname:`/${Body.lastname}/`},{_id:`${Body.id}`}]

// })
// res.json({
//     user: users.map(user => ({
//         username: user.username,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         _id: user._id
//     }))
// })

// })


//! Good solution code for filter user option
userRouter.get("/bulk",authMiddleware, async (req, res) => {
    const filter = req.query.filter;
    let users;
    // console.log(req.user.userId);

    if (filter == undefined || filter == "") {
        console.log("no filter");
        // users = await User.find({});
        users = await User.find({ _id: { $ne: req.user.userId } })



    } else {
        users = await User.find({
            firstname: {
                $regex: filter,
                $options: 'i'
            }
        });
    }
   
    res.json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            _id: user._id
        }))
    });
});



module.exports=userRouter;