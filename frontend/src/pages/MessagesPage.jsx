import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  MessageCircle, 
  Clock, 
  Check, 
  CheckCheck, 
  Trash2, 
  Calendar, 
  Package, 
  ShoppingBag,
  Bell,
  Filter,
  Search,
  MailOpen
} from 'lucide-react';
import { useAuth } from '@/app/providers/AuthContext';
import { useTheme } from '@/app/providers/ThemeContext';
import { Link } from 'react-router-dom';

const MessagesPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { isDarkMode } = useTheme();
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    loadMessages();
    
    // Listen for new messages
    const handleNewMessage = () => loadMessages();
    window.addEventListener('newUserMessage', handleNewMessage);
    window.addEventListener('newChatMessage', handleNewMessage);
    
    return () => {
      window.removeEventListener('newUserMessage', handleNewMessage);
      window.removeEventListener('newChatMessage', handleNewMessage);
    };
  }, [user]);

  const loadMessages = () => {
    try {
      const savedMessages = JSON.parse(localStorage.getItem(`user_messages_${user?.email}`) || '[]');
      setMessages(savedMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    } catch (e) {
      console.error('Error loading messages:', e);
      setMessages([]);
    }
  };

  const markAsRead = (messageId) => {
    const updatedMessages = messages.map(msg =>
      msg.id === messageId ? { ...msg, read: true } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem(`user_messages_${user?.email}`, JSON.stringify(updatedMessages));
  };

  const markAllAsRead = () => {
    const updatedMessages = messages.map(msg => ({ ...msg, read: true }));
    setMessages(updatedMessages);
    localStorage.setItem(`user_messages_${user?.email}`, JSON.stringify(updatedMessages));
  };

  const deleteMessage = (messageId) => {
    const updatedMessages = messages.filter(msg => msg.id !== messageId);
    setMessages(updatedMessages);
    localStorage.setItem(`user_messages_${user?.email}`, JSON.stringify(updatedMessages));
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
  };

  const getMessageIcon = (type) => {
    switch (type) {
      case 'appointment': return Calendar;
      case 'order': return Package;
      case 'purchase': return ShoppingBag;
      case 'chat': return MessageCircle;
      default: return Bell;
    }
  };

  const getMessageColor = (type) => {
    switch (type) {
      case 'appointment': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'order': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'purchase': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'chat': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
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
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  const filteredMessages = messages
    .filter(m => filter === 'all' || m.type === filter)
    .filter(m => 
      m.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.content?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const unreadCount = messages.filter(m => !m.read).length;

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50'} pt-24 pb-12`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Mail size={64} className={`mx-auto mb-6 ${isDarkMode ? 'text-white/20' : 'text-gray-300'}`} />
          <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Sign in to view your messages
          </h1>
          <p className={`mb-8 ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
            Your appointment confirmations, order updates, and chat history will appear here.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a227] text-black font-medium rounded-lg hover:bg-[#d4af37] transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50'} pt-24 pb-12`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className={`${isDarkMode ? 'bg-[#111] border-white/10' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#c9a227]/10 rounded-xl">
                <Mail className="text-[#c9a227]" size={28} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  My Messages
                </h1>
                <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>
                  {messages.length} messages • {unreadCount} unread
                </p>
              </div>
            </div>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 bg-[#c9a227]/10 text-[#c9a227] rounded-lg hover:bg-[#c9a227]/20 transition-colors"
              >
                <MailOpen size={18} />
                Mark all as read
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`} size={18} />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10 text-white placeholder-white/40' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                } focus:outline-none focus:border-[#c9a227]`}
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {[
                { id: 'all', label: 'All', icon: Filter },
                { id: 'appointment', label: 'Appointments', icon: Calendar },
                { id: 'order', label: 'Orders', icon: Package },
                { id: 'purchase', label: 'Purchases', icon: ShoppingBag },
                { id: 'chat', label: 'Chat', icon: MessageCircle },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setFilter(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    filter === id
                      ? 'bg-[#c9a227] text-black'
                      : isDarkMode
                        ? 'bg-white/5 text-white/60 hover:bg-white/10'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Messages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-2 space-y-3">
            {filteredMessages.length === 0 ? (
              <div className={`${isDarkMode ? 'bg-[#111] border-white/10' : 'bg-white border-gray-200'} border rounded-xl p-12 text-center`}>
                <Mail size={48} className={`mx-auto mb-4 ${isDarkMode ? 'text-white/20' : 'text-gray-300'}`} />
                <p className={isDarkMode ? 'text-white/40' : 'text-gray-500'}>
                  {searchTerm || filter !== 'all' ? 'No messages found' : 'No messages yet'}
                </p>
                <p className={`text-sm mt-2 ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`}>
                  Your confirmations and notifications will appear here
                </p>
              </div>
            ) : (
              filteredMessages.map((message) => {
                const Icon = getMessageIcon(message.type);
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${isDarkMode ? 'bg-[#111] border-white/10' : 'bg-white border-gray-200'} border rounded-xl overflow-hidden cursor-pointer transition-all hover:border-[#c9a227]/50 ${
                      selectedMessage?.id === message.id ? 'border-[#c9a227]' : ''
                    } ${!message.read ? (isDarkMode ? 'bg-[#c9a227]/5' : 'bg-blue-50/50') : ''}`}
                    onClick={() => {
                      setSelectedMessage(message);
                      markAsRead(message.id);
                    }}
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-2.5 rounded-lg border ${getMessageColor(message.type)}`}>
                          <Icon size={20} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className={`font-semibold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {message.subject}
                            </h3>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {message.read ? (
                                <CheckCheck size={16} className="text-[#c9a227]" />
                              ) : (
                                <span className="w-2 h-2 bg-[#c9a227] rounded-full" />
                              )}
                            </div>
                          </div>
                          
                          <p className={`text-sm line-clamp-2 mb-2 ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                            {message.content}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className={`flex items-center gap-1 text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>
                              <Clock size={12} />
                              {formatTime(message.timestamp)}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteMessage(message.id);
                              }}
                              className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {selectedMessage ? (
                <motion.div
                  key={selectedMessage.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`${isDarkMode ? 'bg-[#111] border-white/10' : 'bg-white border-gray-200'} border rounded-xl p-6 sticky top-24`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2.5 rounded-lg border ${getMessageColor(selectedMessage.type)}`}>
                      {(() => {
                        const Icon = getMessageIcon(selectedMessage.type);
                        return <Icon size={20} />;
                      })()}
                    </div>
                    <div>
                      <span className={`text-xs uppercase tracking-wider ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>
                        {selectedMessage.type}
                      </span>
                      <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        {new Date(selectedMessage.timestamp).toLocaleString('en-US')}
                      </p>
                    </div>
                  </div>

                  <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedMessage.subject}
                  </h2>

                  <div className={`prose prose-sm max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
                    <p className={`whitespace-pre-wrap ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>
                      {selectedMessage.content}
                    </p>
                  </div>

                  {selectedMessage.details && (
                    <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                      <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Details
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(selectedMessage.details).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className={isDarkMode ? 'text-white/60' : 'text-gray-500'}>
                              {key}
                            </span>
                            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="mt-6 w-full flex items-center justify-center gap-2 py-2 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                    Delete message
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`${isDarkMode ? 'bg-[#111] border-white/10' : 'bg-white border-gray-200'} border rounded-xl p-12 text-center sticky top-24`}
                >
                  <MailOpen size={48} className={`mx-auto mb-4 ${isDarkMode ? 'text-white/20' : 'text-gray-300'}`} />
                  <p className={isDarkMode ? 'text-white/40' : 'text-gray-500'}>
                    Select a message to view details
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
