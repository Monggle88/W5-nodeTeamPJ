const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/post', authMiddleware, (req, res) => {
    res.sendStatus(233);
});

module.exports = router;
