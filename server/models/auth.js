const mongoose = require("mongoose");


const AuthSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        trim:true
    },
    password:{
        type: String,
        required:true
    }
})


module.exports = mongoose.model("auth", AuthSchema)
