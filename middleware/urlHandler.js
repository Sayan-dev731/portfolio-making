const path = require('path');
const fs = require('fs');

// Middleware to handle clean URLs (without .html extension)
const cleanUrlMiddleware = (req, res, next) => {
    // Skip if the request is for static assets (CSS, JS, images, etc.)
    if (req.path.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
        return next();
    }

    // Check if the requested path ends with .html
    if (req.path.endsWith('.html')) {
        return next();
    }

    // Try to find the corresponding HTML file
    let filePath;

    // Check if it's a root level page
    if (req.path === '/' || req.path === '') {
        filePath = path.join(__dirname, '../public', 'index.html');
    } else {
        // First check if it's in the pages directory
        const pagesPath = path.join(__dirname, '../public', 'pages', req.path + '.html');
        const rootPath = path.join(__dirname, '../public', req.path + '.html');

        if (fs.existsSync(pagesPath)) {
            filePath = pagesPath;
        } else if (fs.existsSync(rootPath)) {
            filePath = rootPath;
        }
    }

    // If we found a matching HTML file, serve it
    if (filePath && fs.existsSync(filePath)) {
        return res.sendFile(filePath);
    }

    // Continue to next middleware if no HTML file found
    next();
};

// 404 error handler
const notFoundHandler = (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public', 'pages', '404.html'));
};

module.exports = {
    cleanUrlMiddleware,
    notFoundHandler
};
