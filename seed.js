require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await User.findOne({ email: 'admin@rskassociates.com' });

    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    await User.create({
      name: 'Admin User',
      email: 'admin@rskassociates.com',
      password: 'Admin123!',
      role: 'admin',
    });

    console.log('Default admin user created successfully');
    console.log('Email: admin@rskassociates.com');
    console.log('Password: Admin123!');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding admin: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
