// import and create express app
const express =require('express')
const app =express()

// envirenment veriables
const dotenv= require('dotenv')
dotenv.config()
// import mongoose for database connection
const mongoose =require('mongoose')


// import and add middlewares
const bodyParser=require('body-parser')
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));

const cookieParser=require('cookie-parser')
app.use(cookieParser())

const helmet= require('helmet')
app.use(helmet())

const morgan=require('morgan')
app.use(morgan('common'))

// cors
const cors =require('cors');
app.use(cors());

 const auth=require("./Auth/Auth")

// config routes

app.use("/user",auth,require('./Routes/User'))
app.use("/",require('./Routes/Auth'))







// connect database using mongoose and run the app
mongoose.connect(process.env.DBUrl)
.then(()=>{
    console.log("database conectionsuccessfull")
    app.listen(process.env.PORT,)
})
.catch((e)=>{
    console.log(e.message)
})
