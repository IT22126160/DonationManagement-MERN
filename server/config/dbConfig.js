const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on('connected' , () => {
    console.log('MongoDB connected');
})

connection.on('error' , (err) => {
    console.log(' MongoDB connection error');
})

module.exports = connection;