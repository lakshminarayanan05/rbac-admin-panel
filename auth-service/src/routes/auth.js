const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const Role = require('../models/role');
const UserRole = require('../models/user-role');

const router = express.Router();
const JWT_SECRET_KEY = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({error: 'All fields are required'})
    }
    console.log(name);
    
    const exists = await User.findOne({where: {email}});
    if(exists){
        return res.status(409).json({error: 'Email already exists'})
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password_hash });

    const userRole = await Role.findOne({ where: { name: 'USER' } });
    console.log("USER ROLE:", userRole);

    if (userRole) {
        await UserRole.create({ userId: user.id, roleId: userRole.id });
    }

    const roles = await user.getRoles();
    const roleNames = roles.map(r => r.name);
    
    const token = jwt.sign({ userId: user.id, email: user.email, roles: roleNames}, JWT_SECRET_KEY, {expiresIn: '3d' });

    res.json({user: {id: user.id, name: user.name, email: user.email, roles: roleNames}, token });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({error: 'All fields are required'})
    }

    const user = await User.findOne({ where: {email} });
    if(!user){
        return res.status(401).json({error: 'Invalid Credentials'})
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if(!valid){
        return res.status(401).json({error: 'Invalid Credentials'})
    }

    const roles = await user.getRoles(); 
    const roleNames = roles.map(r => r.name);

    const token = jwt.sign({userId: user.id, email: user.email, roles: roleNames}, JWT_SECRET_KEY, {expiresIn: '3d'});

    res.json({ user: {id: user.id, name: user.name, email: user.email, roles: roleNames}, token});
});

module.exports = router;