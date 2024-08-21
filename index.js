const express=require('express');
const dotenv =require('dotenv');
const cors=require('cors');
const connectDB=require("./config/db")
dotenv.config();//configure.env file
const app=express();
app.use(express.json());
app.use(cors());
connectDB();

app.use('/api/user', require('./routes/userroutes'));
const PORT=process.env.PORT;
//read Port value from env file
app.listen(PORT,()=>console.log(`Applictaion is running on ${PORT}`)
)