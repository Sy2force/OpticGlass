import express from 'express';

const router = express.Router();

// Store contact messages (in production, save to MongoDB and send email)
let contactMessages = [];

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    const newMessage = {
      _id: Date.now().toString(),
      firstName,
      lastName,
      email,
      phone: phone || '',
      subject,
      message,
      createdAt: new Date(),
      status: 'new',
      read: false
    };

    contactMessages.push(newMessage);

    // In production, send email notification here
    console.log('New contact message:', newMessage);

    res.status(201).json({
      success: true,
      message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
      data: { id: newMessage._id }
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue. Veuillez réessayer.'
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contact messages (admin)
// @access  Admin
router.get('/', async (req, res) => {
  res.json({
    success: true,
    count: contactMessages.length,
    data: contactMessages
  });
});

export default router;
