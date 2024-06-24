const express = require("express");
const cors =  require("cors")
const zod =require("zod");
const mainRouter = require("./Routes/mainrouter")
const app = express();
app.use(cors());
app.use(express.json())
app.use("/api/v1",mainRouter)

// app.use("api/v2",MAin2Router)
app.listen(3000,()=>{
    console.log("hello")
});
