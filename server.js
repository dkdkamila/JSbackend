require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(helmet());
app.use(cors());
const port = process.env.PORT || 3001;

// Anslut till MongoDB 
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

// Skapa ett enkelt blogg-inlägg schema
const blogPostSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const BlogPost = mongoose.model('Post', blogPostSchema);

app.use(bodyParser.json());

// Hämta alla inlägg
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await BlogPost.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching posts' });
    }
});

// Skapa ett nytt inlägg
app.post('/api/posts', async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        const newPost = new BlogPost({ title, content });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error creating post', error.message);
        res.status(500).json({ error: 'Error creating post' });
    }
});

// Uppdatera ett inlägg
app.put('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        const updatedPost = await BlogPost.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );
        res.json(updatedPost);
    } catch (error) {
        console.error('Error updating post', error.message);
        res.status(500).json({ error: 'Error updating post' });
    }
});

// Ta bort ett inlägg
app.delete('/api/posts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPost = await BlogPost.findByIdAndDelete(id);
        res.status(204).json(deletedPost);
    } catch (error) {
        console.error('Error deleting post', error.message);
        res.status(500).json({ error: 'Error deleting post' });
    }
});
// Starta servern
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
