const TrainingMessage = require('../models/trainingMessageModel');

const resolvers = {
  Query: {
    trainingMessages: async () => {  // Changed from 'trainingmessages' to 'trainingMessages'
      try {
        console.log("Fetching all training messages...");
        const messages = await TrainingMessage.find();
        console.log("Successfully fetched training messages:", messages);
        return messages;
      } catch (error) {
        console.error("Error fetching training messages:", error);
        throw new Error("Failed to fetch training messages.");
      }
    }
  },
  Mutation: {
    addTrainingMessage: async (_, { text, classification }) => {
      try {
        console.log("Adding new training message:", { text, classification });
        const newMessage = new TrainingMessage({
          text,
          classification,
          createdAt: new Date()
        });
        const savedMessage = await newMessage.save();
        console.log("Successfully saved new message:", savedMessage);
        return savedMessage;
      } catch (error) {
        console.error("Error adding training message:", error);
        throw new Error("Failed to add training message.");
      }
    }
  }
};

module.exports = resolvers;