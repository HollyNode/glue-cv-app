// backend/routes/profileRoutes.js

const express = require('express');
const router = express.Router();
const updateUserProfile = require('../services/profileGenerator');

// Route to update user profile based on classified messages
router.post('/update-profile', async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Call the service to update the profile
    const dominantBartleType = await updateUserProfile(userId);
    
    res.json({ message: 'Profile updated successfully', dominantBartleType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the profile' });
  }
});

module.exports = router;
