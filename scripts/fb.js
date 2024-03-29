const express = require('express');
const admin = require('firebase-admin');
const path = require('path');
const punycode = require('punycode');
const bodyParser = require('body-parser');
const{mintNFT} = require('./mint')
const { transferTokens } = require('./tokentr');
const { getNFTs, getNFT } = require('./getnft');

const { getbal, getBalances } = require('./balances');
const {createAccountFromIdToken} = require('./accountcreation')
const serviceAccount = require(path.join(__dirname, 'fb.json'));
const {getHistory} =  require('./txnhist');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sss-005-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  const apiKey = req.headers['api_key_chat'];
  const validApiKey = process.env.API_KEY;
  // console.log('API Key from Header:', apiKey);
  // console.log('Valid API Key from .env:', validApiKey);
  // console.log('Headers:', req.headers);

  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({ error: 'Unauthorized. Invalid API key.' });
  } else {
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
app.post('/getAccount', async (req, res) => {
  const { idtoken } = req.body;
   try {
    const response = await createAccountFromIdToken(idtoken);
    res.status(200).send(response);
  } catch (error) {
    console.error("Error transferring tokens:", error);
    res.status(500).send(`Error transferring tokens: ${error.message}`);
  }
});
app.post('/getNFTs', async (req, res) => {
  const{address} = req.body;
  const{chain} = req.body;
   try {
    const response = await getNFT(address,chain);
    res.status(200).send(response);
  } catch (error) {
    console.error("Error transferring tokens:", error);
    res.status(500).send(`Error transferring tokens: ${error.message}`);
  }
});
app.post('/transferToken', async (req, res) => {
  const { toaddress } = req.body;
  const { amountToSend } = req.body;
  try {
    const response = await transferTokens(toaddress, amountToSend, res);
    res.status(200).send(response);
  } catch (error) {
    console.error("Error transferring tokens:", error);
    res.status(500).send(`Error transferring tokens: ${error.message}`);
  }
});

 

app.post('/getBalances', async(req,res)=>{
  const{ownerAddress} = req.body;
  try{
    const response = await getBalances(ownerAddress);
    console.log("response in ", response);

    return res.status(200).send(response);
  }catch(ex){
    console.error("Error transferring tokens:", ex);

   return res.status(500).send(`Error transferring tokens: ${ex.message}`);
  }
});

app.post('/mintNFT', async(req,res)=>{
  const{toAddress} = req.body;
  const{url} = req.body;
  try{
    const response = await mintNFT(toAddress,url);
    console.log("response in ", response);

    return res.status(200).send(response);
  }catch(ex){
    console.error("Error transferring tokens:", ex);

   return res.status(500).send(`Error transferring tokens: ${ex.message}`);
  }
});
app.post('/getTxnHistory', async(req,res)=>{
  const{toAddress} = req.body;
  try{
    const response = await getHistory(toAddress);
    console.log("response in ", toAddress);

    return res.status(200).send(response);
  }catch(ex){
    console.error("Error transferring tokens:", ex);

   return res.status(500).send(`Error transferring tokens: ${ex.message}`);
  }
}
);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
