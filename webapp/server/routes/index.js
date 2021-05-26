const { Router, request } = require('express');
const path = require('path');
const { route } = require('./product');
const router = Router()

router.get('/', async (req, res) => {

    console.log(__dirname)

    res.sendFile(path.join(__dirname, '../../index.html'));
})

module.exports = router;