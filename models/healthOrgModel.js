// models/HealthOrganization.js
const mongoose = require('mongoose');

const HealthOrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  // Add any other relevant fields
}, {
  timestamps: true,
});

const HealthOrganization = mongoose.model('HealthOrganization', HealthOrganizationSchema);
module.exports = HealthOrganization;
