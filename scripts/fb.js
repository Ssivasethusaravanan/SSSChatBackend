const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./fbAuth/fb.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sss-005-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
