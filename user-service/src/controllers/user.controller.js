const bcrypt = require('bcrypt');
const User = require('../models/user');
const Role = require('../models/role');
const UserRole = require('../models/user-role');
const { emitEvent } = require('../events/user.events')

const SUPER_ADMIN_EMAIL = 'admin@gmail.com';
const isSuperAdmin = (email) => email === SUPER_ADMIN_EMAIL;

module.exports = {

    getUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                include: [{
                    model: Role,
                    through: { attributes: [] },
                    required: false
                }]
            });
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: "Failed to fetch users" });
        }
    },
    createUser: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({ error: "All fields are required" });
            }

            const exist = await User.findOne({ where: { email } });
            if (exist) {
                return res.status(409).json({ error: "Email already exists" });
            }

            const hashedPwd = await bcrypt.hash(password, 10);

            const user = await User.create({ name, email, password_hash: hashedPwd });
            const userRole = await Role.findOne({ where: { name: 'USER' } });

            if (userRole) {
                await UserRole.create({
                    userId: user.id,
                    roleId: userRole.id
                });
            }
            user.password_hash = undefined;
            await emitEvent('USER_CREATED', {
                userId: user.id,
                message: 'New user created',
            });

            res.status(201).json({ message: "User created successfully", user });

        } catch (err) {
            res.status(500).json({ error: "Failed to create user" });
        }
    },
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email } = req.body;

            const user = await User.findByPk(id);

            if (!user) {
            return res.status(404).json({ error: "User not found" });
            }

            if (isSuperAdmin(user.email)) {
                return res.status(403).json({
                    error: "Super Admin cannot be edited"
                });
            }

            await User.update({ name, email }, { where: { id } });

            await emitEvent('USER_UPDATED', {
                userId: id,
                message: 'User updated successfully',
            });

            const updatedUser = await User.findByPk(id);
            res.json(updatedUser);

        } catch (err) {
            res.status(500).json({ error: "Failed to update user" });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            if(isSuperAdmin(user.email)) {
                return res.status(403).json({
                    error: "Super Admin cannot be deleted"
                });
            }
            await User.destroy({ where: { id } });

            await emitEvent('USER_DELETED', {
                userId: id,
                message: 'User deleted',
            });

            res.json({ message: "User deleted" });
        } catch (err) {
            res.status(500).json({ error: "Failed to delete user" });
        }
    },
    assignRole: async (req, res) => {
        try {
            const { userId, roleId } = req.body;

            const user = await User.findByPk(userId);
            const role = await Role.findByPk(roleId);

            if (!user || !role) {
                return res.status(400).json({ error: "User or Role not found" });
            }
            if (isSuperAdmin(user.email)) {
                return res.status(403).json({
                    error: "Cannot change roles of Super Admin"
                });
            }

            await UserRole.findOrCreate({ where: { userId, roleId } });
            await emitEvent('ROLE_ASSIGNED', {
                userId,
                role: 'ADMIN',
                message: 'User promoted to Admin',
            });

            res.json({ message: "Role assigned successfully" });

        } catch (err) {
            res.status(500).json({ error: "Failed to assign role" });
        }
    },
    removeRole: async (req, res) => {
        try {
            const { userId, roleId } = req.body;

            const user = await User.findByPk(userId);
            const role = await Role.findByPk(roleId);

            if (!user || !role) {
                return res.status(400).json({ error: "User or Role not found" });
            }

            if (isSuperAdmin(user.email)) {
                return res.status(403).json({ error: "Cannot remove Admin role from Super Admin user" });
            }

            await UserRole.destroy({ where: { userId, roleId } });

            await emitEvent('ROLE_REMOVED', {
                userId,
                role: 'ADMIN',
                message: 'Admin role removed',
            });

            res.json({ message: "Role removed successfully" });

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to remove role" });
        }
    }

};
