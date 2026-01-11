import Message from '../models/Message.js';

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message non trouvé',
      });
    }
    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Message envoyé avec succès',
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status: 'read' },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message non trouvé',
      });
    }
    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const replyToMessage = async (req, res) => {
  try {
    const { message: replyText } = req.body;
    const messageDoc = await Message.findByIdAndUpdate(
      req.params.id,
      {
        status: 'replied',
        $push: { replies: { text: replyText, date: new Date() } },
      },
      { new: true }
    );
    if (!messageDoc) {
      return res.status(404).json({
        success: false,
        message: 'Message non trouvé',
      });
    }
    res.status(200).json({
      success: true,
      data: messageDoc,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message non trouvé',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Message supprimé avec succès',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
