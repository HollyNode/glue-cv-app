const mongoose = require('mongoose');

// Define the schema for a training message
const trainingMessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  classification: {
    type: String,  // e.g. 'Achiever', 'Explorer', 'Socializer', 'Killer'
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware for error handling (optional)
trainingMessageSchema.post('save', function(error, doc, next) {
  if (error) {
    console.error("Error occurred while saving message:", error);
    next(error);
  } else {
    next();
  }
});

// Create and export the model for training messages
const TrainingMessage = mongoose.model('TrainingMessage', trainingMessageSchema);
module.exports = TrainingMessage;
