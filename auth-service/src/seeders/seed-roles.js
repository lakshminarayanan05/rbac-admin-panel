const Role = require('../models/role');

async function seedRoles() {
    await Role.findOrCreate({ where: { name: 'USER' } });
    await Role.findOrCreate({ where: { name: 'ADMIN' } });

}

module.exports = seedRoles;