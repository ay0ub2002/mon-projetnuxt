const express = require('express');
const router = express.Router();
const Message = require('./messageModel');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// GET /api/messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).limit(50);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(messages));
  } catch (error) {
    console.error('Erreur GET /api/messages:', error);
    res.statusCode = 500;
    res.end(JSON.stringify({ message: 'Erreur interne du serveur' }));
  }
});

// POST /api/messages
router.post('/', async (req, res) => {
  try {
    console.log('Requête POST reçue:', req.body);
    const { username, content } = req.body;

    if (!username || !content) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ message: 'username et content requis' }));
    }

    const newMessage = new Message({
      username,
      content
    });

    await newMessage.save();

    res.statusCode = 201;
    res.end(JSON.stringify({ message: 'Message enregistré' }));
  } catch (error) {
    console.error('Erreur POST /api/messages:', error);
    res.statusCode = 500;
    res.end(JSON.stringify({ message: 'Erreur interne du serveur' }));
  }
});

module.exports = router;
