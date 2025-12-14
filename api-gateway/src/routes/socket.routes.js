const express = require('express');
const { getIO } = require('../socket/socket');

const router = express.Router();

router.post('/emit', (req, res) => {
    const io = getIO();
    const { event, data } = req.body;

    io.to('admins').emit(event, data);
    io.to('users').emit(event, data);

    res.json({ok:true})
});

module.exports = router;