import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  Search, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle, 
  XCircle,
  User,
  Trash2
} from 'lucide-react';
import api from '@/shared/api/api';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // Sample data for display
  const sampleMessages = [
    {
      _id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 555 123 4567',
      subject: 'Question about Aviator glasses',
      message: 'Hello, I would like to know if the Aviator Classic glasses are available in size L. Thank you for your response.',
      status: 'unread',
      createdAt: new Date(),
      replies: []
    },
    {
      _id: '2',
      name: 'Mary Johnson',
      email: 'mary.johnson@email.com',
      phone: '+1 555 987 6543',
      subject: 'Product return',
      message: 'I would like to return my order OG-2024-002. The glasses do not fit me. How do I proceed?',
      status: 'read',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      replies: [
        { text: 'Hello Mary, you can return your order within 30 days. We are sending you a return label by email.', date: new Date() }
      ]
    },
    {
      _id: '3',
      name: 'Peter Williams',
      email: 'peter.w@email.com',
      phone: '+1 555 111 2233',
      subject: 'Business partnership',
      message: 'Hello, I represent an optical chain and would like to discuss a partnership. Can you contact me?',
      status: 'unread',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      replies: []
    },
    {
      _id: '4',
      name: 'Sophie Brown',
      email: 'sophie.brown@email.com',
      phone: '+1 555 556 7788',
      subject: 'Glasses warranty',
      message: 'My glasses purchased 6 months ago have a defect on the frame. Is this covered by the warranty?',
      status: 'replied',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      replies: [
        { text: 'Hello Sophie, yes your 2-year warranty covers this type of defect. Please send us photos of the defect.', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) }
      ]
    },
  ];

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await api.get('/admin/messages');
      setMessages(response.data.data || []);
    } catch {
      setMessages(sampleMessages);
    } finally {
      setLoading(false);
    }
  };

  const handleSendReply = async () => {
    if (!reply.trim() || !selectedMessage) return;

    const newReply = { text: reply, date: new Date() };
    
    try {
      await api.post(`/admin/messages/${selectedMessage._id}/reply`, { message: reply });
    } catch {
      // Continue with local update
    }

    setMessages(messages.map(m => 
      m._id === selectedMessage._id 
        ? { ...m, status: 'replied', replies: [...(m.replies || []), newReply] }
        : m
    ));
    setSelectedMessage({ 
      ...selectedMessage, 
      status: 'replied',
      replies: [...(selectedMessage.replies || []), newReply] 
    });
    setReply('');
  };

  const markAsRead = async (messageId) => {
    try {
      await api.put(`/admin/messages/${messageId}/read`);
    } catch {
      // Continue with local update
    }
    setMessages(messages.map(m => 
      m._id === messageId ? { ...m, status: 'read' } : m
    ));
  };

  const deleteMessage = async (messageId) => {
    if (!window.confirm('Delete this message?')) return;
    
    try {
      await api.delete(`/admin/messages/${messageId}`);
    } catch {
      // Continue with local update
    }
    setMessages(messages.filter(m => m._id !== messageId));
    if (selectedMessage?._id === messageId) {
      setSelectedMessage(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'unread': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'read': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'replied': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'unread': return <Mail size={14} />;
      case 'read': return <Clock size={14} />;
      case 'replied': return <CheckCircle size={14} />;
      default: return <MessageCircle size={14} />;
    }
  };

  const filteredMessages = messages
    .filter(m => filter === 'all' || m.status === filter)
    .filter(m => 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a227]"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-[#111] border border-white/10 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <MessageCircle className="text-[#c9a227]" />
                Messages
              </h1>
              <p className="text-white/60 mt-1">
                Manage customer contact messages
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                {messages.filter(m => m.status === 'unread').length} unread
              </span>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={20} />
              <input
                type="text"
                placeholder="Search by name, email or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#c9a227]"
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {['all', 'unread', 'read', 'replied'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    filter === status
                      ? 'bg-[#c9a227] text-black'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {status === 'all' ? 'All' : status === 'unread' ? 'Unread' : status === 'read' ? 'Read' : 'Replied'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Messages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredMessages.length === 0 ? (
              <div className="bg-[#111] border border-white/10 rounded-xl p-12 text-center">
                <MessageCircle size={48} className="mx-auto text-white/20 mb-4" />
                <p className="text-white/40">No messages found</p>
              </div>
            ) : (
              filteredMessages.map(message => (
                <motion.div
                  key={message._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-[#111] border rounded-xl overflow-hidden hover:border-[#c9a227]/50 transition-all cursor-pointer ${
                    selectedMessage?._id === message._id ? 'border-[#c9a227]' : 'border-white/10'
                  } ${message.status === 'unread' ? 'bg-[#111]/80' : ''}`}
                  onClick={() => {
                    setSelectedMessage(message);
                    if (message.status === 'unread') {
                      markAsRead(message._id);
                    }
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#c9a227]/10 rounded-full flex items-center justify-center">
                          <User className="text-[#c9a227]" size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{message.name}</h3>
                          <p className="text-sm text-white/40">{message.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(message.status)}`}>
                          {getStatusIcon(message.status)}
                          <span className="capitalize">{message.status}</span>
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMessage(message._id);
                          }}
                          className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-white mb-2">{message.subject}</h4>
                    <p className="text-white/60 text-sm line-clamp-2">{message.message}</p>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                      <span className="text-xs text-white/30">
                        {new Date(message.createdAt).toLocaleDateString('en-US', { 
                          day: 'numeric', 
                          month: 'short', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                      {message.replies?.length > 0 && (
                        <span className="text-xs text-[#c9a227]">
                          {message.replies.length} reply(ies)
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Message Details Sidebar */}
          {selectedMessage ? (
            <div className="lg:col-span-1">
              <div className="bg-[#111] border border-white/10 rounded-xl p-6 sticky top-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Message Details
                </h3>

                <div className="space-y-6">
                  {/* Contact Info */}
                  <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-[#c9a227]/10 rounded-full flex items-center justify-center">
                        <User className="text-[#c9a227]" size={24} />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{selectedMessage.name}</p>
                        <p className="text-sm text-white/40">{selectedMessage.email}</p>
                      </div>
                    </div>
                    {selectedMessage.phone && (
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <Phone size={14} />
                        {selectedMessage.phone}
                      </div>
                    )}
                  </div>

                  {/* Subject & Message */}
                  <div>
                    <h4 className="font-semibold text-[#c9a227] mb-2">{selectedMessage.subject}</h4>
                    <p className="text-white/80 text-sm leading-relaxed">{selectedMessage.message}</p>
                  </div>

                  {/* Replies */}
                  {selectedMessage.replies?.length > 0 && (
                    <div className="border-t border-white/10 pt-4">
                      <h4 className="font-semibold text-white mb-3">Replies</h4>
                      <div className="space-y-3">
                        {selectedMessage.replies.map((r, i) => (
                          <div key={i} className="p-3 bg-[#c9a227]/10 rounded-lg border border-[#c9a227]/20">
                            <p className="text-sm text-white">{r.text}</p>
                            <p className="text-xs text-white/40 mt-2">
                              {new Date(r.date).toLocaleString('en-US')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reply Form */}
                  <div className="border-t border-white/10 pt-4">
                    <h4 className="font-semibold text-white mb-3">Reply</h4>
                    <textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Your reply..."
                      rows="4"
                      className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#c9a227] text-sm resize-none"
                    />
                    <button
                      onClick={handleSendReply}
                      disabled={!reply.trim()}
                      className="w-full mt-3 flex items-center justify-center gap-2 py-3 bg-[#c9a227] text-black rounded-lg font-semibold hover:bg-[#b8912a] transition-colors disabled:opacity-50"
                    >
                      <Send size={18} />
                      Send Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-1">
              <div className="bg-[#111] border border-white/10 rounded-xl p-12 text-center sticky top-6">
                <Mail size={48} className="mx-auto text-white/20 mb-4" />
                <p className="text-white/40">Select a message to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
