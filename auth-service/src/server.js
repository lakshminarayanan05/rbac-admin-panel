require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const authRoutes = require('./routes/auth');
const seedAdmin = require('./seeders/seed-admin');
const seedRoles = require('./seeders/seed-roles');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes)

app.get('/health', (req,res) => res.json({ ok: true, service: 'auth' }));

const PORT = process.env.PORT;

(async () => {
    try{
        await sequelize.authenticate();
        console.log("Database Connected - Auth");

        await sequelize.sync({ alter: true })
        console.log("Models Synced -Auth");

        await seedAdmin();
        await seedRoles();
        console.log('Seeding completed');
        
        app.listen(PORT, () => console.log(`Auth service running on ${PORT}`));
    } catch (err) {
            console.error("Failed to start Auth service: ", err)
    }
})();