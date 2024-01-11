const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');

// Hämta alla inlägg
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

// Skapa ett nytt inlägg
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

// Uppdatera ett befintligt inlägg baserat på ID
router.put('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title, content: req.body.content } }
        );
        res.json(updatedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

// Ta bort ett befintligt inlägg baserat på ID
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;