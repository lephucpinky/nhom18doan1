// Example code snippet
const jwt = require('jsonwebtoken');
const secretKey = 'shoeshop123456'; // Replace 'your_secret_key' with your actual secret key

const  generateToken = (id) => {
    return jwt.sign({id}, secretKey, {
        expiresIn: "30d",
    });
};


module.exports= generateToken;



