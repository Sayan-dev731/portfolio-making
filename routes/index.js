const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Root route - serve index.html
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Clean URL routes for pages
router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'pages', 'about.html'));
});

router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'pages', 'contact.html'));
});

// Dynamic route for pages directory
router.get('/pages/:page', (req, res) => {
    const pageName = req.params.page;
    const filePath = path.join(__dirname, '../public', 'pages', `${pageName}.html`);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).sendFile(path.join(__dirname, '../public', 'pages', '404.html'));
    }
});

module.exports = router;
