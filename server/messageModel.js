const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    username: { type: String, required: true }, // pseudo ou ano par dfaut
    content: { type: String, required: true },  // le texte du message
    createdAt: { type: Date, default: Date.now } // date de création
});

module.exports = mongoose.model('Message', messageSchema);
