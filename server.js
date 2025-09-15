const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

// DB connection
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('✅ Successfully connected to MongoDB'))
//   .catch((err) => {
//     console.error('❌ DB connection error:', err);
//     process.exit(1);
//   });

let isConnected = false;

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('✅ Successfully connected to MongoDB');
  } catch (error) {
    console.error('❌ DB connection error:', err);
  }
}

// Start server
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`🚀 Server running on port ${port}...`);
// });

app.use((req, res, next) => {
  if (!isConnected) {
    connectToMongoDB();
  }
  next();
});
