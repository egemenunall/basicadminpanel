const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const dotenv = require("dotenv");
const database = require("./config/database.js")
const authRouter = require("./routes/auth.js")
const postRouter = require("./routes/post.js")
const path = require('path'); // path modülünü import edin


dotenv.config();



const app = express();
app.use(cors());
app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))
app.use("/",authRouter)
app.use("/",postRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT =  5000;

database();







app.listen(PORT,()=>{
    console.log("server is running",PORT)
})