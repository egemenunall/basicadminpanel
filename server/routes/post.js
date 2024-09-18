const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getPosts, createPost, updatePost, deletePost, getPostById } = require('../controllers/post.js');

// Multer ayarları
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Routes
// Mevcut bir postu ID ile alma
router.get('/posts/:id', getPostById);  // Tek post verisi
router.get('/getPosts', getPosts);
router.post('/createPost', upload.single('image'), createPost); // 'image' alan adını doğru belirleyin
router.patch('/updatePost/:id', upload.single('image'), updatePost); // 'image' alan adını doğru belirleyin
router.delete('/deletePost/:id', deletePost);

module.exports = router;
