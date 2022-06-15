require('dotenv').config();
const mongoose = require('mongoose');
console.log("The process.env.MONGO_URI value:",process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI);
