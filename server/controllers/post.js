const PostSchema = require('../models/post'); // Model dosyanızı doğru şekilde içe aktarın
const fs = require('fs');
const path = require('path');

// Tüm post'ları al
const getPosts = async (req, res) => {
    try {
        const posts = await PostSchema.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Yeni bir post oluştur
const createPost = async (req, res) => {
    try {
        const { user, title, description } = req.body;
        const image = req.file ? req.file.filename : null; // Resim varsa dosya adını al
        const newPost = await PostSchema.create({
            user,
            title,
            description,
            image
        });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Post güncelle
const updatePost = async (req, res) => {
    const { user, title, description } = req.body;
    const newImage = req.file ? req.file.filename : req.body.existingImage; // Yeni resim varsa kullan

    try {
        const post = await PostSchema.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post bulunamadı." });
        }

        // Eski resmi sil
        if (post.image && req.file) {
            const oldImagePath = path.join(__dirname, '../uploads', post.image);
            fs.unlink(oldImagePath, (err) => {
                if (err) console.error('Eski resmi silerken hata oluştu:', err);
            });
        }

        // Post'u güncelle
        const updatedPost = await PostSchema.findByIdAndUpdate(req.params.id, {
            user,
            title,
            description,
            image: newImage // Yeni veya mevcut resmi kullan
        }, { new: true });

        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: "Post güncellenirken bir hata oluştu." });
    }
};

// Post sil
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await PostSchema.findById(id);
        
        if (post && post.image) {
            const imagePath = path.join(__dirname, '../uploads', post.image);
            fs.unlink(imagePath, (err) => {
                if (err) console.error('Resmi silerken hata oluştu:', err);
            });
        }

        await PostSchema.findByIdAndDelete(id);
        res.status(200).json({ msg: "Post başarıyla silindi" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// ID'ye göre post verisini al
const getPostById = async (req, res) => {
    try {
        const post = await PostSchema.findById(req.params.id); // Post modelinden veri çek
        if (!post) return res.status(404).json({ message: 'Post bulunamadı' });
        res.json(post); // JSON formatında postu geri döndür
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getPosts, createPost, updatePost, deletePost, getPostById };
