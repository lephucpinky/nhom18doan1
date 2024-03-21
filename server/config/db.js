const mongoose = require('mongoose');

// Replace 'your_mongodb_uri' with your actual MongoDB URI
const uri = 'mongodb+srv://phuc44654:1411200320@clothing.7pwzvnz.mongodb.net/?retryWrites=true&w=majority&appName=CLOTHING';

async function connectDB() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

module.exports= connectDB();
