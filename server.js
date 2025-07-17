const express = require('express');
const path = require('path');

const config = require('./config/config');
const { cleanUrlMiddleware, notFoundHandler } = require('./middleware/urlHandler');
const routes = require('./routes');

const app = express();

app.use(express.static(config.publicDir));
app.use(cleanUrlMiddleware);

app.use('/', routes);

// 404 handler (must be last)
app.use(notFoundHandler);

// Start the server
app.listen(config.port, () => {
    console.log(`🚀 Server is running on http://localhost:${config.port}`);
    console.log(`📁 Serving static files from: ${config.publicDir}`);
    console.log(`🌍 Environment: ${config.environment}`);
    console.log(`\n📋 Available routes:`);
    console.log(`   • http://localhost:${config.port}/ (index.html)`);
    console.log(`   • http://localhost:${config.port}/about (pages/about.html)`);
    console.log(`   • http://localhost:${config.port}/contact (pages/contact.html)`);
    console.log(`   • http://localhost:${config.port}/pages/about (pages/about.html)`);
    console.log(`   • http://localhost:${config.port}/pages/contact (pages/contact.html)`);
});