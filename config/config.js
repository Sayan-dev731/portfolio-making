const path = require('path');

const config = {
    port: process.env.PORT || 3000,
    publicDir: path.join(__dirname, '../public'),
    pagesDir: path.join(__dirname, '../public/pages'),
    environment: process.env.NODE_ENV || 'development'
};

module.exports = config;
