import Contact from '../models/Contact.js';
import { getIsConnected } from '../config/db.js';
import { inMemoryDB } from '../config/store.js';

// @desc    Submit contact message
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all fields (Name, Email, Phone, Message)',
      });
    }

    if (getIsConnected()) {
      const contact = await Contact.create({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
      });

      return res.status(201).json({
        success: true,
        message: 'Thank you for reaching out! The Brindha Cloud Kitchen team will contact you shortly.',
        data: contact,
      });
    } else {
      const newContact = {
        _id: 'contact_' + Date.now(),
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
        createdAt: new Date(),
      };

      inMemoryDB.contacts.push(newContact);

      return res.status(201).json({
        success: true,
        message: 'Thank you for reaching out! The Brindha Cloud Kitchen team will contact you shortly.',
        data: newContact,
      });
    }
  } catch (error) {
    console.error('Contact submit error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit contact message',
    });
  }
};
