import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Trash2, Shield, ShieldOff, Search, Mail, User as UserIcon } from 'lucide-react';
import api from '@/shared/api/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!window.confirm(`Are you sure you want to change role to ${newRole}?`)) return;

    setActionLoading(userId);
    try {
      await api.put(`/admin/users/${userId}/role`, { role: newRole });
      setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
    } catch (error) {
      alert('Error updating role');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

    setActionLoading(userId);
    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers(users.filter(u => u._id !== userId));
    } catch (error) {
      alert('Error deleting user');
    } finally {
      setActionLoading(null);
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a227]"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Users Management</h1>
            <p className="text-white/60">Manage access and user roles</p>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#c9a227] transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#111] border border-white/10 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#c9a227]/30 transition-all"
            >
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                  user.role === 'admin' 
                    ? 'bg-gradient-to-br from-[#c9a227] to-amber-700 text-black'
                    : 'bg-white/10 text-white'
                }`}>
                  {user.firstName[0]}{user.lastName[0]}
                </div>
                <div>
                  <h3 className="text-white font-bold flex items-center gap-2">
                    {user.firstName} {user.lastName}
                    {user.role === 'admin' && (
                      <span className="px-2 py-0.5 bg-[#c9a227]/20 text-[#c9a227] text-[10px] uppercase tracking-wider rounded-full border border-[#c9a227]/30">
                        Admin
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center gap-2 text-white/40 text-sm">
                    <Mail size={14} />
                    {user.email}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => handleRoleChange(user._id, user.role)}
                  disabled={actionLoading === user._id}
                  className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    user.role === 'admin'
                      ? 'bg-white/5 text-white hover:bg-white/10'
                      : 'bg-[#c9a227]/10 text-[#c9a227] hover:bg-[#c9a227]/20'
                  }`}
                >
                  {user.role === 'admin' ? <ShieldOff size={16} /> : <Shield size={16} />}
                  {user.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                </button>

                <button
                  onClick={() => handleDeleteUser(user._id)}
                  disabled={actionLoading === user._id}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center py-12 text-white/40">
              No users found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
