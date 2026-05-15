const User = require('../models/User');

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn('ADMIN_EMAIL or ADMIN_PASSWORD missing; admin seed skipped');
    return;
  }

  const existingAdmin = await User.findOne({ email: email.toLowerCase() });

  if (existingAdmin) {
    return;
  }

  await User.create({ email, password, role: 'admin' });
  console.log('Admin user seeded');
}

module.exports = seedAdmin;
