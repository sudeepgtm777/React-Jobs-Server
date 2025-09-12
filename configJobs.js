const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/jobModel');

// Load environment variables
dotenv.config({ path: './config.env' });

// Connect to MongoDB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Successfully connected to MongoDB'))
  .catch((err) => {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  });

// Read jobs.json file
const jobs = JSON.parse(fs.readFileSync(`${__dirname}/jobs.json`, 'utf-8'));

// Import data into DB
const importData = async () => {
  try {
    await Job.create(jobs);
    console.log('✅ Jobs successfully loaded into DB');
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

// Delete all jobs from DB
const deleteData = async () => {
  try {
    await Job.deleteMany();
    console.log('✅ Jobs successfully deleted from DB');
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

// CLI commands: --import or --delete
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Use "--import" to load data or "--delete" to remove data');
  process.exit();
}
