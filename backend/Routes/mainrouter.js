
const express = require("express");
const userRouter = require("./user.js")
const AccountRouter = require("./Account.js")
const router = express.Router();


router.use('/user',userRouter)

router.use('/account',AccountRouter)



module.exports =router