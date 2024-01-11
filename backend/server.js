const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const postsRouter = require('.posts.js');
const authRouter = require('.auth.js');
const app = express();

// Anslut till  MongoDB-databas
mongoose.connect('mongodb+srv://Cluster59057:Sl1pRkVTeWh5@cluster59057.apgxdlo.mongodb.net/JavaProjekt', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

// Middleware för att använda JSON
app.use(express.json());
//sessionsvariabel 
app.use(session({
    secret: 'JavaProjekt',
    resave: false,
    saveUninitialized: true,
}));

// Rutter
app.use('/api/users', authRouter);
app.use('/api/posts', postsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});