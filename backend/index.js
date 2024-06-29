const express = require("express");
const cors =  require("cors")
const zod =require("zod");
const mainRouter = require("./Routes/mainrouter")
const app = express();
const allowedOrigins = [
    'http://localhost:5173', // Local development URL
    'https://paymentsapp-d8oq.onrender.com' // Deployed frontend URL
  ];
  
  // CORS configuration
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));
app.use(express.json())
app.use("/api/v1",mainRouter)

// app.use("api/v2",MAin2Router)
app.listen(3000,()=>{
    console.log("hello")
});
