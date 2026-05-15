const ContactMessage = require('../models/ContactMessage');

async function createMessage(req, res, next) {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400);
      throw new Error('All contact fields are required');
    }

    await ContactMessage.create({ name, email, subject, message });
    res.status(201).json({ message: 'Thanks for reaching out. I will reply soon.' });
  } catch (error) {
    next(error);
  }
}

async function getMessages(_req, res, next) {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    next(error);
  }
}

module.exports = { createMessage, getMessages };
