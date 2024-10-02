// backend/services/profileGenerator.js

const User = require('../models/user'); // Assuming you have a user model

// Function to update user profile based on classified messages
const updateUserProfile = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Aggregate message classifications for the user
    const messages = await Message.find({ userId });
    const classifications = messages.map(msg => msg.classification);

    // Logic to determine dominant Bartle type for the user
    const bartleCounts = classifications.reduce((acc, classification) => {
      acc[classification] = (acc[classification] || 0) + 1;
      return acc;
    }, {});

    const dominantType = Object.keys(bartleCounts).reduce((a, b) => 
      bartleCounts[a] > bartleCounts[b] ? a : b
    );

    // Update user profile with dominant Bartle type
    user.dominantBartleType = dominantType;
    await user.save();

    return dominantType;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

module.exports = updateUserProfile;
