const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');

require('./connection');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use('/images', express.static(path.join(__dirname, '/images')));

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded');
});

app.listen('5000', () => {
  console.log('Server is running');
});
