
require('dotenv').config();

const mongoose = require('mongoose');
const { number } = require('zod');


const jwtSecret = process.env.JWT_SECRET;
const mongoUrl = process.env.MONGODB_URI;

// Connect to MongoDB
 mongoose.connect(mongoUrl);

// Define schemas
// Define schemas
// const AdminSchema = new mongoose.Schema({
//     // Schema definition here
//     username:String,
//     password:String
// });

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:{type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    }
,    password:{
    type:String,
    required:true,
    minLength:6
}
,
    firstname:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    
   
});

const AccountSchema = new mongoose.Schema({
    balance: {
        type: Number,
        required: true,
        min:  (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000)
       
        
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User schema
        required: true,
      },
})


const Account= mongoose.model('Account', AccountSchema);
const User = mongoose.model('User', UserSchema);

module.exports = {
    User,
    Account
}