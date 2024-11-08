const mongoose = require('mongoose');
const Order = require('./Order');
const mongoose_seq = require('mongoose-sequence')(mongoose);

const userSchema = mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'], // Custom email validation
  },
  role: {
    type: String,
    enum: ['admin', 'courier', 'customer'],
    default: 'customer',
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long.'], // Validation rule here
  },
  phone: {
    type: String,
    required: true,
    required: true,
    match: [/^\d{11}$/, 'Phone number must be exactly 11 digits.'], // Regex for exactly 11 digits
  },
});

userSchema.plugin(mongoose_seq, { inc_field: 'userId', start_seq: 1 });

module.exports = mongoose.model('User', userSchema);