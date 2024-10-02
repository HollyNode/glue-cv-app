const Message = require('../models/trainingMessageModel.js'); // Assuming you have a Message model for MongoDB
const bartleTypes = ['Achiever', 'Explorer', 'Socializer', 'Killer'];

// Placeholder logic for classifying a message
const classifyMessage = async (messageText) => {
  try {
    console.log("Classifying message:", messageText);
    const randomIndex = Math.floor(Math.random() * bartleTypes.length);
    const classification = bartleTypes[randomIndex];
    console.log("Classification result:", classification);
    return classification; // Return random classification for now
  } catch (error) {
    console.error("Error classifying message:", error);
    throw new Error("Failed to classify message.");
  }
};

// Function to classify a message and update it in MongoDB
const classifyAndUpdateMessage = async (messageId) => {
  try {
    console.log(`Fetching message by ID: ${messageId}`);
    const message = await Message.findById(messageId);
    
    if (!message) {
      throw new Error('Message not found');
    }

    console.log(`Classifying message: ${message.text}`);
    const classification = await classifyMessage(message.text);

    message.classification = classification;
    await message.save();

    console.log("Message updated with new classification:", message);
    return message;
  } catch (error) {
    console.error("Error classifying and updating message:", error);
    throw error;
  }
};

module.exports = {
  classifyMessage,
  classifyAndUpdateMessage,
};
