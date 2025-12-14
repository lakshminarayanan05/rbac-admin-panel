const bcrypt = require('bcrypt');
const User = require('../models/user');
const Role = require('../models/role');
const UserRole = require('../models/user-role');

async function seedAdmin() {
  try {
    const [adminRole] = await Role.findOrCreate({
      where: { name: 'ADMIN' }
    });

    const adminEmail = process.env.ADMIN_EMAIL;

    const [adminUser] = await User.findOrCreate({
      where: { email: adminEmail },
      defaults: {
        name: 'Super Admin',
        email: adminEmail,
        password_hash: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
      }
    });
    await UserRole.findOrCreate({
      where: {
        userId: adminUser.id,
        roleId: adminRole.id
      }
    });

    console.log('Default admin seeded');
  } catch (err) {
    console.error('Admin seeding failed', err);
  }
}

module.exports = seedAdmin;