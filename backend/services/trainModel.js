// backend/services/trainModel.js
//const tf = require('@tensorflow/tfjs-node');
const messagesData = require('../data/messages.json'); // Load the message data

// Preprocessing helper functions
function tokenizeAndPadSequences(messages, maxLen = 20) {
  const tokenizer = new tf.layers.text.Tokenizer();
  tokenizer.fitOnTexts(messages);
  
  const sequences = tokenizer.textsToSequences(messages);
  const paddedSequences = tf.keras.preprocessing.sequence.pad_sequences(sequences, { maxlen: maxLen });
  
  return { sequences: paddedSequences, tokenizer };
}

// Train the model
async function trainModel() {
  const messages = messagesData.map(msg => msg.text);
  const labels = messagesData.map(msg => {
    switch (msg.classification) {
      case 'Achiever':
        return 0;
      case 'Explorer':
        return 1;
      case 'Socializer':
        return 2;
      case 'Killer':
        return 3;
      default:
        return -1;
    }
  });

  const { sequences, tokenizer } = tokenizeAndPadSequences(messages);
  const labelTensor = tf.tensor1d(labels, 'int32');

  const model = tf.sequential();
  model.add(tf.layers.embedding({ inputDim: tokenizer.wordIndex.length + 1, outputDim: 50, inputLength: sequences.shape[1] }));
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({ units: 4, activation: 'softmax' }));

  model.compile({
    optimizer: 'adam',
    loss: 'sparseCategoricalCrossentropy',
    metrics: ['accuracy'],
  });

  await model.fit(sequences, labelTensor, {
    epochs: 10,
    validationSplit: 0.2,
  });

  // Save the model for future use
  await model.save('file://./model');
  console.log('Model training complete and saved.');
}

trainModel();
