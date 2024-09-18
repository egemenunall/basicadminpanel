const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,  // Resim URL'ini veya dosya yolunu saklamak için
        required: false  // Zorunlu değilse
    }
});

module.exports = mongoose.model("post", postSchema);
