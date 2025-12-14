require('dotenv').config();
const express = require('express');
const axios = require('axios');
const verifyJWT = require('../middleware/jwtMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(verifyJWT);

const isAdmin = authorizeRoles(["ADMIN"]);

router.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${process.env.USER_SERVICE_URL}/users`);
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response?.status || 500).json(err.response?.data || { error: err.message });
    }
});
router.post("/", isAdmin, async (req, res) => {
    try {
        const response = await axios.post(`${process.env.USER_SERVICE_URL}/users`, req.body);
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response?.status || 500).json(err.response?.data || { error: err.message });
    }
});
router.put("/:id", isAdmin, async (req, res) => {
    const {id} = req.params;
    try {
        const response = await axios.put(`${process.env.USER_SERVICE_URL}/users/${id}`, req.body);
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response?.status || 500).json(err.response?.data || { error: err.message });
    }
});
router.delete("/:id", isAdmin, async (req, res) => {
    const {id} = req.params;
    try {
        const response = await axios.delete(`${process.env.USER_SERVICE_URL}/users/${id}`);
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response?.status || 500).json(err.response?.data || { error: err.message });
    }
});
router.post("/assign-role", isAdmin, async (req, res) => {
    try {
        const response = await axios.post(`${process.env.USER_SERVICE_URL}/users/assign-role`, req.body);
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response?.status || 500).json(err.response?.data || { error: err.message });
    }
});
router.post("/remove-role", isAdmin, async (req, res) => {
    try {
        const response = await axios.post(`${process.env.USER_SERVICE_URL}/users/remove-role`, req.body);
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response?.status || 500).json(err.response?.data || { error: err.message });
    }
});

module.exports = router;