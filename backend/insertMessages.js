const mongoose = require('mongoose');
const fs = require('fs'); // File system module to read JSON file

// Define the schema for the messages
const messageSchema = new mongoose.Schema({
  text: String,
  classification: String,
  createdAt: { type: Date, default: Date.now }
});

// Create the model
const Message = mongoose.model('trainingMessages', messageSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bartle-analyzer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Read the messages from the JSON file
const messages = JSON.parse(fs.readFileSync('td-messages.json', 'utf-8'));

// Function to insert messages into MongoDB
async function insertMessages() {
  try {
    const inserted = await Message.insertMany(messages);
    console.log('Messages inserted successfully:', inserted);
  } catch (err) {
    console.error('Error inserting messages:', err);
  } finally {
    // Close the connection after insertion
    mongoose.connection.close();
  }
}

// Call the function to insert messages
insertMessages();
