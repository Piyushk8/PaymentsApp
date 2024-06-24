const express = require('express');
const router = express.Router();
const {Account} = require("../db/db.js")

const mongoose = require('mongoose');
const {authMiddleware} = require("../middleware.js")

router.get("/Balance",authMiddleware,async(req,res)=>{
    console.log("BALANCE ENQUIRY!")
const userid = req.body.userId
try{
const account =await Account.findOne({userId:userid})
console.log(account)
res.json({
    balance:account.balance
})}
catch(e){
    res.json(e)

}


})

router.post("/put",async(req,res)=>{
    const balance = req.body.balance;

    const account = await Account.create({
        userId:req.body.userId,
        balance:balance
    })

    return null;
})

// router.post("/transfer", authMiddleware, async (req, res) => {
//     const { amount, to } = req.body;

//     const account = await Account.findOne({
//         userId: req.userId
//     });

//     if (account.balance < amount) {
//         return res.status(400).json({
//             message: "Insufficient balance"
//         })
//     }

//     const toAccount = await Account.findOne({
//         userId: to
//     });

//     if (!toAccount) {
//         return res.status(400).json({
//             message: "Invalid account"
//         })
//     }

//     await Account.updateOne({
//         userId: req.userId
//     }, {
//         $inc: {
//             balance: -amount
//         }
//     })

//     await Account.updateOne({
//         userId: to
//     }, {
//         $inc: {
//             balance: amount
//         }
//     })

//     res.json({
//         message: "Transfer successful"
//     })
// });
//!good solution for above problem --Transactions

router.post("/transfer", authMiddleware, async (req, res) => {
    console.log("Transfer request reached")
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;
    const user = req.user;
    

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: user.userId}).session(session);


console.log(account,"User ka account")

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
console.log("To ka account"+toAccount)
    if (!toAccount) {
        // console.log("account nhi hai bhai")
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account / User does not have an account"
            
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: user.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});



module.exports = router;















