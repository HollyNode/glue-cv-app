const express = require('express');
const router = express.Router();
const Message = require('../models/trainingMessageModel.js'); // Assuming your Message model is in this path
const classifyMessage = require('../services/messageClassifier');

// Route to classify a message and store classification
router.post('/classify-message/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Fetch the message by ID
    console.log(`Fetching message with ID: ${id}`);
    const message = await Message.findById(id);
    
    if (!message) {
      console.error(`Message with ID: ${id} not found`);
      return res.status(404).json({ error: 'Message not found' });
    }

    // Call the classifier service to get the Bartle type
    const classification = await classifyMessage(message.text);
    console.log(`Classified message as: ${classification}`);
    
    // Update message classification in MongoDB
    message.classification = classification;
    await message.save();

    res.json({ message: 'Message classified successfully', classification });
  } catch (error) {
    console.error("Error classifying message:", error);
    res.status(500).json({ error: 'An error occurred while classifying the message' });
  }
});

module.exports = router;
