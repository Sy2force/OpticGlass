import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, MessageCircle, Clock, Check, CheckCheck } from 'lucide-react';
import { useAuth } from '@/app/providers/AuthContext';

const MessageBox = () => {
  const { isAuthenticated, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      loadMessages();
      // Listen for new chat messages
      window.addEventListener('newChatMessage', handleNewMessage);
      return () => window.removeEventListener('newChatMessage', handleNewMessage);
    }
  }, [isAuthenticated]);

  const loadMessages = () => {
    // Load messages from localStorage
    try {
      const savedMessages = JSON.parse(localStorage.getItem(`messages_${user?.email}`) || '[]');
      setMessages(savedMessages);
      setUnreadCount(savedMessages.filter(m => !m.read).length);
    } catch (e) {
      console.error('Error loading messages:', e);
      setMessages([]);
      setUnreadCount(0);
    }
  };

  const handleNewMessage = (event) => {
    const newMessage = {
      id: Date.now(),
      type: 'chat',
      subject: 'New message from support',
      content: event.detail.message || 'You received a response to your request',
      timestamp: new Date().toISOString(),
      read: false,
      from: 'Support Optic Glass',
    };

    const updatedMessages = [newMessage, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem(`messages_${user?.email}`, JSON.stringify(updatedMessages));
    setUnreadCount(prev => prev + 1);
  };

  const markAsRead = (messageId) => {
    const updatedMessages = messages.map(msg =>
      msg.id === messageId ? { ...msg, read: true } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem(`messages_${user?.email}`, JSON.stringify(updatedMessages));
    setUnreadCount(updatedMessages.filter(m => !m.read).length);
  };

  const deleteMessage = (messageId) => {
    const updatedMessages = messages.filter(msg => msg.id !== messageId);
    setMessages(updatedMessages);
    localStorage.setItem(`messages_${user?.email}`, JSON.stringify(updatedMessages));
    setUnreadCount(updatedMessages.filter(m => !m.read).length);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  if (!isAuthenticated) return null;

  return (
    <>
      {/* Bouton de notification */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white/60 hover:text-[#c9a227] transition-colors duration-300"
      >
        <Mail size={18} />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </button>

      {/* Message box */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Panel de messages */}
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-black p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail size={24} />
                  <div>
                    <h3 className="font-bold text-lg">Messages</h3>
                    <p className="text-xs opacity-80">
                      {unreadCount} unread
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-black/10 rounded-lg transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Liste des messages */}
              <div className="flex-1 overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
                    <Mail size={48} className="mb-4 opacity-50" />
                    <p className="text-center">No messages yet</p>
                    <p className="text-sm text-center mt-2">
                      Support responses will appear here
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 hover:bg-gray-50 transition cursor-pointer ${
                          !message.read ? 'bg-blue-50/50' : ''
                        }`}
                        onClick={() => markAsRead(message.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            message.type === 'chat' ? 'bg-red-100' : 'bg-blue-100'
                          }`}>
                            <MessageCircle size={16} className={
                              message.type === 'chat' ? 'text-red-600' : 'text-blue-600'
                            } />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-semibold text-sm text-gray-900 truncate">
                                {message.from}
                              </p>
                              {message.read ? (
                                <CheckCheck size={14} className="text-blue-500 flex-shrink-0" />
                              ) : (
                                <Check size={14} className="text-gray-400 flex-shrink-0" />
                              )}
                            </div>

                            <p className="font-medium text-sm text-gray-700 mb-1">
                              {message.subject}
                            </p>

                            <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                              {message.content}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-xs text-gray-400">
                                <Clock size={12} />
                                {formatTime(message.timestamp)}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteMessage(message.id);
                                }}
                                className="text-xs text-red-500 hover:text-red-700 transition"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <button
                  onClick={() => {
                    const allRead = messages.map(msg => ({ ...msg, read: true }));
                    setMessages(allRead);
                    localStorage.setItem(`messages_${user?.email}`, JSON.stringify(allRead));
                    setUnreadCount(0);
                  }}
                  className="w-full py-2 text-sm text-[#c9a227] hover:text-[#d4af37] font-medium transition"
                  disabled={unreadCount === 0}
                >
                  Mark all as read
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MessageBox;
