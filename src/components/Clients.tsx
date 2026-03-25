import React, { useState } from 'react';
import { 
  UserPlus, 
  FileText, 
  Download, 
  Filter, 
  Mail, 
  Phone, 
  Smartphone, 
  Edit3, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Zap,
  BarChart3,
  ArrowRight,
  Eye,
  X,
  User,
  Globe,
  MapPin,
  Activity,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface Client {
  id: string;
  name: string;
  website: string;
  initials: string;
  contact: {
    name: string;
    role: string;
    email: string;
    phone: string;
    mobile?: string;
    fax?: string;
    note?: string;
    avatar: string;
  };
  address: string;
  status: string;
  statusType: string;
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: 'IP-2024-001',
      name: 'Novatech Ventures Inc.',
      website: 'novatech.io',
      initials: 'NV',
      contact: {
        name: 'Sarah Jenkins',
        role: 'General Counsel',
        email: 's.jenkins@novatech.io',
        phone: '+1 (555) 012-9844',
        mobile: '+1 (555) 012-7700',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop'
      },
      address: 'One Infinite Loop, Cupertino, CA 95014',
      status: 'ACTIVE',
      statusType: 'tertiary'
    },
    {
      id: 'IP-2024-042',
      name: 'Aether Labs',
      website: 'aetherlabs.com',
      initials: 'AL',
      contact: {
        name: 'Dr. Marcus Thorne',
        role: 'Chief Scientist',
        email: 'm.thorne@aetherlabs.com',
        phone: '+44 20 7946 0112',
        fax: '+44 20 7946 0999',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop'
      },
      address: '24 King William St, London EC4R 9AT, UK',
      status: 'PENDING',
      statusType: 'secondary'
    },
    {
      id: 'IP-2023-899',
      name: 'Solari Motors',
      website: 'solari.jp',
      initials: 'SM',
      contact: {
        name: 'Yuki Tanaka',
        role: 'Operations Director',
        email: 'tanaka@solari.jp',
        phone: '+81 3-5550-0199',
        note: 'Secondary contact active',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop'
      },
      address: 'Minato City, Shiodome Tokyo 105-7303, Japan',
      status: 'EXPIRED',
      statusType: 'error'
    }
  ]);

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Client | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newClientForm, setNewClientForm] = useState({
    name: '',
    website: '',
    contact: {
      name: '',
      role: '',
      email: '',
      phone: '',
      mobile: '',
      fax: '',
      note: '',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop'
    },
    address: '',
    status: 'ACTIVE' as const
  });

  const handleUpdate = () => {
    if (!editForm) return;
    setClients(clients.map(c => c.id === editForm.id ? editForm : c));
    setSelectedClient(editForm);
    setIsEditing(false);
  };

  const handleSaveNewClient = () => {
    const newId = `IP-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    const initials = newClientForm.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    
    const newClient: Client = {
      id: newId,
      name: newClientForm.name,
      website: newClientForm.website,
      initials,
      contact: { ...newClientForm.contact },
      address: newClientForm.address,
      status: newClientForm.status,
      statusType: newClientForm.status === 'ACTIVE' ? 'tertiary' : newClientForm.status === 'PENDING' ? 'secondary' : 'error'
    };

    setClients([newClient, ...clients]);
    setIsNewModalOpen(false);
    setNewClientForm({
      name: '',
      website: '',
      contact: {
        name: '',
        role: '',
        email: '',
        phone: '',
        mobile: '',
        fax: '',
        note: '',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop'
      },
      address: '',
      status: 'ACTIVE'
    });
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-12 max-w-[1400px] mx-auto space-y-12">
      {/* Table Controls */}
      <section className="flex justify-end items-center gap-4">
        <div className="flex-1 max-w-xs relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/60" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clients..."
            className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-primary/30 focus:bg-surface-container-lowest transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button className="p-2 border border-outline-variant/20 rounded-xl hover:bg-surface-container-low text-on-surface-variant transition-colors">
            <Filter className="w-5 h-5" />
          </button>
          <button className="p-2 border border-outline-variant/20 rounded-xl hover:bg-surface-container-low text-on-surface-variant transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Client Table */}
      <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="bg-surface-container-low/50">
              <tr>
                <th className="px-6 py-4 font-headline text-xs font-bold text-on-secondary-container uppercase tracking-widest">Client ID</th>
                <th className="px-6 py-4 font-headline text-xs font-bold text-on-secondary-container uppercase tracking-widest">Customer & Website</th>
                <th className="px-6 py-4 font-headline text-xs font-bold text-on-secondary-container uppercase tracking-widest">Primary Contact</th>
                <th className="px-6 py-4 font-headline text-xs font-bold text-on-secondary-container uppercase tracking-widest">Communication</th>
                <th className="px-6 py-4 font-headline text-xs font-bold text-on-secondary-container uppercase tracking-widest">Address</th>
                <th className="px-6 py-4 font-headline text-xs font-bold text-on-secondary-container uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredClients.map((client) => (
                <tr key={client.id} className="group hover:bg-surface-container-low/50 transition-colors cursor-pointer" onClick={() => setSelectedClient(client)}>
                  <td className="px-6 py-6">
                    <span className="font-mono text-xs font-bold text-primary/80 bg-primary/5 px-2 py-1 rounded-md border border-primary/10">
                      {client.id}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-primary font-bold shadow-sm">
                        {client.initials}
                      </div>
                      <div>
                        <p className="font-bold text-on-surface text-base">{client.name}</p>
                        <div className="flex items-center gap-1 font-label text-[11px] text-primary/70 hover:underline cursor-pointer">
                          {client.website}
                          <ExternalLink className="w-2.5 h-2.5" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <img 
                        className="w-8 h-8 rounded-full object-cover border border-outline-variant/20" 
                        src={client.contact.avatar}
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="text-sm font-semibold text-on-surface">{client.contact.name}</p>
                        <p className="text-[11px] text-on-surface-variant">{client.contact.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[11px] text-on-surface-variant">
                        <Mail className="w-3 h-3" />
                        <span>{client.contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-on-surface-variant">
                        <Phone className="w-3 h-3" />
                        <span className="font-mono">{client.contact.phone}</span>
                      </div>
                      {client.contact.mobile && (
                        <div className="flex items-center gap-2 text-[11px] text-on-surface-variant">
                          <Smartphone className="w-3 h-3" />
                          <span className="font-mono">{client.contact.mobile}</span>
                        </div>
                      )}
                      {client.contact.note && (
                        <div className="flex items-center gap-2 text-[11px] text-on-surface-variant italic opacity-70">
                          <Zap className="w-3 h-3" />
                          <span>{client.contact.note}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-xs text-on-surface-variant leading-relaxed max-w-[180px]">
                      {client.address}
                    </p>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <button className="p-2 rounded-xl hover:bg-primary/10 text-primary transition-all group-hover:scale-110">
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-surface-container-low/30 flex items-center justify-between border-t border-outline-variant/10">
          <p className="text-xs font-medium text-on-surface-variant">Showing <span className="text-on-surface font-bold">1-{Math.min(10, filteredClients.length)}</span> of <span className="text-on-surface font-bold">{filteredClients.length}</span> clients</p>
          <div className="flex gap-1">
            <button className="p-1.5 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:bg-white transition-colors border border-outline-variant/10 shadow-sm">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1 rounded-lg bg-primary text-on-primary text-xs font-bold shadow-sm">1</button>
            <button className="px-3 py-1 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:bg-white text-xs font-medium transition-colors border border-outline-variant/10 shadow-sm">2</button>
            <button className="px-3 py-1 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:bg-white text-xs font-medium transition-colors border border-outline-variant/10 shadow-sm">3</button>
            <button className="p-1.5 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:bg-white transition-colors border border-outline-variant/10 shadow-sm">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Insights Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-primary-container text-on-primary rounded-2xl shadow-lg flex flex-col justify-between group cursor-pointer hover:translate-y-[-4px] transition-transform">
          <div>
            <BarChart3 className="w-8 h-8 mb-4 text-on-primary-container" />
            <h3 className="font-headline font-bold text-xl mb-2">Portfolio Insights</h3>
            <p className="text-on-primary-container text-sm">Generate comprehensive reports on asset distribution across your client list.</p>
          </div>
          <div className="mt-8 flex items-center gap-2 text-xs font-bold tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">
            <span>Run Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
        <div className="p-6 bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col justify-between group cursor-pointer hover:translate-y-[-4px] transition-transform border border-outline-variant/10">
          <div>
            <Zap className="w-8 h-8 text-tertiary mb-4" />
            <h3 className="font-headline font-bold text-xl mb-2 text-on-surface">Auto-Filing System</h3>
            <p className="text-on-surface-variant text-sm">Bulk update client compliance documents using AI-driven verification nodes.</p>
          </div>
          <div className="mt-8 flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-tertiary group-hover:text-primary transition-colors">
            <span>Launch Wizard</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
        <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/20 flex flex-col justify-between group cursor-pointer hover:translate-y-[-4px] transition-transform">
          <div>
            <ShieldCheck className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-headline font-bold text-xl mb-2 text-on-surface">Legal Verification</h3>
            <p className="text-on-surface-variant text-sm">Verify corporate identities through the Sovereign Ledger authority protocol.</p>
          </div>
          <div className="mt-8 flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary">
            <span>Start Verification</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedClient && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedClient(null);
                setIsEditing(false);
              }}
              className="absolute inset-0 bg-primary/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-surface-container-lowest w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 border border-outline-variant/10 overflow-hidden"
            >
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2">
                          <select 
                            value={editForm?.status}
                            onChange={(e) => setEditForm(prev => prev ? {...prev, status: e.target.value, statusType: e.target.value === 'ACTIVE' ? 'tertiary' : e.target.value === 'PENDING' ? 'secondary' : 'error'} : null)}
                            className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider outline-none border border-primary/20 focus:border-primary transition-all"
                          >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="PENDING">PENDING</option>
                            <option value="EXPIRED">EXPIRED</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <input 
                            type="text" 
                            value={editForm?.name}
                            onChange={(e) => setEditForm(prev => prev ? {...prev, name: e.target.value} : null)}
                            className="text-3xl font-headline font-extrabold text-primary bg-transparent border-b border-primary/30 focus:border-primary outline-none w-full"
                            placeholder="Client Name"
                          />
                          <div className="flex items-center gap-2 text-on-surface-variant font-medium">
                            <Globe className="w-4 h-4" />
                            <input 
                              type="text" 
                              value={editForm?.website}
                              onChange={(e) => setEditForm(prev => prev ? {...prev, website: e.target.value} : null)}
                              className="bg-transparent border-b border-outline-variant/30 focus:border-primary outline-none flex-1"
                              placeholder="Website"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 inline-block",
                          selectedClient.statusType === 'tertiary' && "bg-tertiary-container text-on-tertiary-container",
                          selectedClient.statusType === 'secondary' && "bg-secondary-container text-on-secondary-container",
                          selectedClient.statusType === 'error' && "bg-error-container text-on-error-container"
                        )}>
                          {selectedClient.status}
                        </span>
                        <h3 className="text-3xl font-headline font-extrabold text-primary">{selectedClient.name}</h3>
                        <div className="flex items-center gap-2 text-on-surface-variant font-medium">
                          <Globe className="w-4 h-4" />
                          <p>{selectedClient.website}</p>
                        </div>
                      </>
                    )}
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedClient(null);
                      setIsEditing(false);
                    }} 
                    className="p-2 hover:bg-surface-container-low rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
                        <User className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Primary Contact</p>
                        {isEditing ? (
                          <div className="space-y-1">
                            <input 
                              type="text" 
                              value={editForm?.contact.name}
                              onChange={(e) => setEditForm(prev => prev ? {...prev, contact: {...prev.contact, name: e.target.value}} : null)}
                              className="w-full bg-transparent border-b border-primary/30 focus:border-primary outline-none py-0.5 font-bold text-sm"
                              placeholder="Name"
                            />
                            <input 
                              type="text" 
                              value={editForm?.contact.role}
                              onChange={(e) => setEditForm(prev => prev ? {...prev, contact: {...prev.contact, role: e.target.value}} : null)}
                              className="w-full bg-transparent border-b border-primary/30 focus:border-primary outline-none py-0.5 text-xs"
                              placeholder="Role"
                            />
                          </div>
                        ) : (
                          <div>
                            <p className="font-bold">{selectedClient.contact.name}</p>
                            <p className="text-xs text-on-surface-variant">{selectedClient.contact.role}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Email</p>
                        {isEditing ? (
                          <input 
                            type="email" 
                            value={editForm?.contact.email}
                            onChange={(e) => setEditForm(prev => prev ? {...prev, contact: {...prev.contact, email: e.target.value}} : null)}
                            className="w-full bg-transparent border-b border-primary/30 focus:border-primary outline-none py-0.5 text-sm"
                          />
                        ) : (
                          <p className="text-sm font-medium">{selectedClient.contact.email}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Phone</p>
                        {isEditing ? (
                          <input 
                            type="text" 
                            value={editForm?.contact.phone}
                            onChange={(e) => setEditForm(prev => prev ? {...prev, contact: {...prev.contact, phone: e.target.value}} : null)}
                            className="w-full bg-transparent border-b border-primary/30 focus:border-primary outline-none py-0.5 text-sm font-mono"
                          />
                        ) : (
                          <p className="text-sm font-mono">{selectedClient.contact.phone}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Mobile</p>
                        {isEditing ? (
                          <input 
                            type="text" 
                            value={editForm?.contact.mobile || ''}
                            onChange={(e) => setEditForm(prev => prev ? {...prev, contact: {...prev.contact, mobile: e.target.value}} : null)}
                            className="w-full bg-transparent border-b border-primary/30 focus:border-primary outline-none py-0.5 text-sm font-mono"
                          />
                        ) : (
                          <p className="text-sm font-mono">{selectedClient.contact.mobile || 'N/A'}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Fax</p>
                        {isEditing ? (
                          <input 
                            type="text" 
                            value={editForm?.contact.fax || ''}
                            onChange={(e) => setEditForm(prev => prev ? {...prev, contact: {...prev.contact, fax: e.target.value}} : null)}
                            className="w-full bg-transparent border-b border-primary/30 focus:border-primary outline-none py-0.5 text-sm font-mono"
                          />
                        ) : (
                          <p className="text-sm font-mono">{selectedClient.contact.fax || 'N/A'}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Address</p>
                        {isEditing ? (
                          <textarea 
                            value={editForm?.address}
                            onChange={(e) => setEditForm(prev => prev ? {...prev, address: e.target.value} : null)}
                            rows={2}
                            className="w-full bg-transparent border-b border-primary/30 focus:border-primary outline-none py-0.5 text-xs resize-none"
                          />
                        ) : (
                          <p className="text-xs leading-relaxed">{selectedClient.address}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-outline-variant/10">
                  <div>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Internal Notes</p>
                    {isEditing ? (
                      <textarea 
                        value={editForm?.contact.note || ''}
                        onChange={(e) => setEditForm(prev => prev ? {...prev, contact: {...prev.contact, note: e.target.value}} : null)}
                        rows={3}
                        className="w-full bg-surface-container-low p-4 rounded-2xl text-sm leading-relaxed font-medium outline-none border border-primary/30 focus:border-primary resize-none"
                        placeholder="Add internal notes..."
                      />
                    ) : (
                      <div className="bg-surface-container-low p-4 rounded-2xl text-sm leading-relaxed font-medium italic text-on-surface-variant">
                        {selectedClient.contact.note || 'No internal notes available.'}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  {isEditing ? (
                    <>
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-3 border border-outline-variant/20 rounded-xl font-headline font-bold text-on-surface-variant hover:bg-surface-container-low transition-all"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleUpdate}
                        className="px-8 py-3 bg-primary text-on-primary rounded-xl font-headline font-bold shadow-lg transition-all active:scale-95"
                      >
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => {
                          setEditForm(selectedClient);
                          setIsEditing(true);
                        }}
                        className="px-6 py-3 border border-primary/20 text-primary rounded-xl font-headline font-bold hover:bg-primary/5 transition-all"
                      >
                        Edit Client
                      </button>
                      <button 
                        onClick={() => setSelectedClient(null)}
                        className="px-8 py-3 bg-primary text-on-primary rounded-xl font-headline font-bold shadow-lg transition-all active:scale-95"
                      >
                        Close
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add New Client Modal */}
      <AnimatePresence>
        {isNewModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewModalOpen(false)}
              className="absolute inset-0 bg-primary/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-surface-container-lowest w-full max-w-3xl rounded-3xl shadow-2xl relative z-10 border border-outline-variant/10 overflow-hidden"
            >
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-headline font-extrabold text-primary">Add New Client</h3>
                  <button 
                    onClick={() => setIsNewModalOpen(false)} 
                    className="p-2 hover:bg-surface-container-low rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 block">Client Name</label>
                      <input 
                        type="text" 
                        value={newClientForm.name}
                        onChange={(e) => setNewClientForm({...newClientForm, name: e.target.value})}
                        className="w-full bg-surface-container-low px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary transition-all"
                        placeholder="e.g. Novatech Ventures Inc."
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 block">Website</label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                        <input 
                          type="text" 
                          value={newClientForm.website}
                          onChange={(e) => setNewClientForm({...newClientForm, website: e.target.value})}
                          className="w-full bg-surface-container-low pl-11 pr-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary transition-all"
                          placeholder="novatech.io"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 block">Address</label>
                      <textarea 
                        value={newClientForm.address}
                        onChange={(e) => setNewClientForm({...newClientForm, address: e.target.value})}
                        rows={3}
                        className="w-full bg-surface-container-low px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary transition-all resize-none"
                        placeholder="Street, City, State, ZIP"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 block">Primary Contact</label>
                        <input 
                          type="text" 
                          value={newClientForm.contact.name}
                          onChange={(e) => setNewClientForm({...newClientForm, contact: {...newClientForm.contact, name: e.target.value}})}
                          className="w-full bg-surface-container-low px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary transition-all"
                          placeholder="Name"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 block">Role</label>
                        <input 
                          type="text" 
                          value={newClientForm.contact.role}
                          onChange={(e) => setNewClientForm({...newClientForm, contact: {...newClientForm.contact, role: e.target.value}})}
                          className="w-full bg-surface-container-low px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary transition-all"
                          placeholder="e.g. General Counsel"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 block">Email</label>
                      <input 
                        type="email" 
                        value={newClientForm.contact.email}
                        onChange={(e) => setNewClientForm({...newClientForm, contact: {...newClientForm.contact, email: e.target.value}})}
                        className="w-full bg-surface-container-low px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary transition-all"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 block">Phone</label>
                        <input 
                          type="text" 
                          value={newClientForm.contact.phone}
                          onChange={(e) => setNewClientForm({...newClientForm, contact: {...newClientForm.contact, phone: e.target.value}})}
                          className="w-full bg-surface-container-low px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary transition-all font-mono"
                          placeholder="+1..."
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 block">Mobile</label>
                        <input 
                          type="text" 
                          value={newClientForm.contact.mobile}
                          onChange={(e) => setNewClientForm({...newClientForm, contact: {...newClientForm.contact, mobile: e.target.value}})}
                          className="w-full bg-surface-container-low px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary transition-all font-mono"
                          placeholder="+1..."
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 block">Fax</label>
                      <input 
                        type="text" 
                        value={newClientForm.contact.fax}
                        onChange={(e) => setNewClientForm({...newClientForm, contact: {...newClientForm.contact, fax: e.target.value}})}
                        className="w-full bg-surface-container-low px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary transition-all font-mono"
                        placeholder="+1..."
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 block">Other Contact Info / Notes</label>
                  <textarea 
                    value={newClientForm.contact.note}
                    onChange={(e) => setNewClientForm({...newClientForm, contact: {...newClientForm.contact, note: e.target.value}})}
                    rows={2}
                    className="w-full bg-surface-container-low px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary transition-all resize-none"
                    placeholder="Additional details..."
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button 
                    onClick={() => setIsNewModalOpen(false)}
                    className="px-6 py-3 border border-outline-variant/20 rounded-xl font-headline font-bold text-on-surface-variant hover:bg-surface-container-low transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveNewClient}
                    className="px-8 py-3 bg-primary text-on-primary rounded-xl font-headline font-bold shadow-lg transition-all active:scale-95"
                  >
                    Save Client
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
