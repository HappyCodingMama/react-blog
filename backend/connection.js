const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.ujbqwvw.mongodb.net/mytechblog?retryWrites=true&w=majority
`,
  () => {
    console.log('Connected to DB');
  }
);
