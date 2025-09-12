const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A job must have a title'],
  },
  type: {
    type: String,
    required: [true, 'A job must have a type'],
  },
  description: {
    type: String,
  },
  location: {
    type: String,
    required: [true, 'A job must have a location'],
  },
  salary: {
    type: String, // <-- Use String to match your JSON range
    default: '',
  },
  company: {
    name: {
      type: String,
      required: [true, 'A job must have a company name'],
    },
    description: String,
    contactEmail: String,
    contactPhone: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
