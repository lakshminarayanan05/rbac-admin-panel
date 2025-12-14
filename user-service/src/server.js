require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const UserRoutes = require('./routes/user.routes');

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", UserRoutes)

app.get('/health', (req,res) => res.json({ ok: true, service: 'user' }));

const PORT = process.env.PORT;

(async () => {
    try{
        await sequelize.authenticate();
        console.log("Database Connected - User");

        await sequelize.sync({alter: true});
        console.log("Models Synced - User");
        
        app.listen(PORT, () => console.log(`User service running on ${PORT}`));  
    } catch(err) {
        console.error("Failed to start User service: ", err)
    }
})();