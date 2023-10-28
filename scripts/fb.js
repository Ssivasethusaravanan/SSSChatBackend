const express = require('express');
const admin = require('firebase-admin');
const path = require('path');
const bodyParser = require('body-parser'); // Add body-parser middleware
const { transferTokens } = require('./tokentr');
const serviceAccount = require(path.join(__dirname, 'fb.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sss-005-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());
// Middleware to verify the API key
app.use((req, res, next) => {
  const apiKey = req.headers['API_KEY'];
  const validApiKey = process.env.YOUR_API_KEY; // Replace with the actual environment variable name you've used in your .env file

  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({ error: 'Unauthorized. Invalid API key.' });
  } else {
    // If the API key is valid, you can optionally log that it's valid or perform other actions.
    // For example, you can log it:
    console.log('API key is valid');
    next(); // Continue to the next middleware or route if the API key is valid
  }
});

app.get('/updateTimestamp', (req, res) => {
  const databaseRef = admin.database().ref('Master/Timestamp');

  // Update the timestamp to a new value (e.g., the current time).
  databaseRef.set(new Date().toISOString(), (error) => {
    if (error) {
      res.status(500).send('Error updating timestamp.');
    } else {
      res.status(200).send('Timestamp updated successfully.');
    }
  });
});

app.post('/transferToken', async (req, res) => {
  const { toaddress } = req.body; // Extract the recipient address from the request body
const {amountToSend} = req.body;
  try {
    const response = await transferTokens(toaddress,amountToSend, res);
    res.status(200).send(response);
  } catch (error) {
    console.error("Error transferring tokens:", error);
    res.status(500).send(`Error transferring tokens: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
