// Run with: npm run seed        (populate)
//           npm run seed:destroy (wipe products/categories/admin user)
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const CompanyProfile = require('../models/CompanyProfile');
const categoriesData = require('./categoriesData');
const productsData = require('./productsData');

const run = async () => {
  await connectDB();

  const destroy = process.argv.includes('--destroy');

  if (destroy) {
    // Intentionally leaves the admin user and enquiries untouched.
    await Promise.all([Product.deleteMany({}), Category.deleteMany({})]);
    console.log('Products and categories removed. Admin user and enquiries were left untouched.');
    await mongoose.connection.close();
    process.exit(0);
  }

  // --- Admin user ---
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@kkglobaltrade.com').toLowerCase();
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: process.env.ADMIN_NAME || 'KK Global Trade Admin',
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD || 'ChangeMe123!',
      role: 'admin',
    });
    console.log(`Admin user created: ${adminEmail}`);
  } else {
    console.log(`Admin user already exists: ${adminEmail}`);
  }

  // --- Company profile ---
  const existingProfile = await CompanyProfile.findOne();
  if (!existingProfile) {
    await CompanyProfile.create({});
    console.log('Default company profile created');
  }

  // --- Categories ---
  for (const cat of categoriesData) {
    await Category.findOneAndUpdate({ name: cat.name }, cat, { upsert: true, new: true });
  }
  console.log(`Seeded ${categoriesData.length} categories`);

  // --- Products ---
  let created = 0;
  let updated = 0;
  for (const product of productsData) {
    const existing = await Product.findOne({ name: product.name });
    if (existing) {
      Object.assign(existing, product);
      await existing.save();
      updated += 1;
    } else {
      await Product.create(product);
      created += 1;
    }
  }
  console.log(`Products seeded: ${created} created, ${updated} updated`);

  console.log('\nSeed complete.');
  console.log(`Admin login -> email: ${adminEmail} / password: ${process.env.ADMIN_PASSWORD || 'ChangeMe123!'}`);
  console.log('Change the admin password after first login in production.\n');

  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
