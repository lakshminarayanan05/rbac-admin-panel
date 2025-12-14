require('dotenv').config();
const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post("/register", (req, res) => {
    return axios.post(`${process.env.AUTH_SERVICE_URL}/auth/register`, req.body)
    .then(response => res.json(response.data))
    .catch(err => 
        res.status(err.response?.status || 500).json(err.response?.data || {error: err.message}));
});

router.post("/login", (req, res) => {
    return axios.post(`${process.env.AUTH_SERVICE_URL}/auth/login`, req.body)
    .then(response => res.json(response.data))
    .catch(err =>
        res.status(err.response?.status || 500).json(err.response?.data || {error: err.message}));
});

module.exports = router;