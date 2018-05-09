require('dotenv');

module.exports = {

    'url' : 'mongodb://localhost:27017/employees',
    secret: process.env.TOKEN_SECRET

};