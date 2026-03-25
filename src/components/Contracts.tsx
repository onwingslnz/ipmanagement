import React, { useState } from 'react';
import { 
  FileText, 
  Search,
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  Plus,
  Eye,
  X,
  Calendar,
  User,
  Hash,
  Activity,
  CreditCard,
  Globe,
  MapPin,
  DollarSign,
  ClipboardList,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface Contract {
  id: string;
  contractNo: string;
  contractDate: string;
  clientName: string;
  consultantName: string;
  fee: string;
  paymentDate: string;
  signingDate: string;
  content: string;
  remarks: string;
  status: 'ACTIVE' | 'PENDING' | 'COMPLETED' | 'EXPIRED';
}

export default function Contracts() {
  const clients = [
    { name: 'Novatech Ventures Inc.', consultant: 'Sarah Jenkins' },
    { name: 'Aether Labs', consultant: 'Dr. Marcus Thorne' },
    { name: 'Solari Motors', consultant: 'Yuki Tanaka' },
    { name: 'Quantum Dynamics', consultant: 'Elena Rodriguez' },
    { name: 'Nebula Systems', consultant: 'James Chen' }
  ];

  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: '1',
      contractNo: 'LG-2023-8842',
      contractDate: '2023-10-24',
      clientName: 'Novatech Ventures Inc.',
      consultantName: 'Alistair Montgomery',
      fee: '$12,500.00',
      paymentDate: '2023-11-15',
      signingDate: '2023-10-26',
      content: 'Master IP Assignment for Sovereign Ledger project.',
      remarks: 'Standard assignment clauses applied. Legal review completed.',
      status: 'ACTIVE'
    },
    {
      id: '2',
      contractNo: 'LG-2024-1021',
      contractDate: '2024-01-05',
      clientName: 'Aether Labs',
      consultantName: 'Sarah Jenkins',
      fee: '$8,200.00',
      paymentDate: '2024-01-20',
      signingDate: '2024-01-07',
      content: 'Quantum Encryption Licensing Agreement.',
      remarks: 'Exclusive license for EU region.',
      status: 'PENDING'
    },
    {
      id: '3',
      contractNo: 'LG-2023-7712',
      contractDate: '2023-08-15',
      clientName: 'Solari Motors',
      consultantName: 'Marcus Thorne',
      fee: '$15,000.00',
      paymentDate: '2023-09-01',
      signingDate: '2023-08-18',
      content: 'Battery Management System R&D Contract.',
      remarks: 'Phase 1 completed. Awaiting Phase 2 approval.',
      status: 'COMPLETED'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Contract | null>(null);

  const [newForm, setNewForm] = useState({
    contractNo: '',
    contractDate: '',
    clientName: '',
    consultantName: '',
    fee: '',
    paymentDate: '',
    signingDate: '',
    content: '',
    remarks: ''
  });

  const [clientSearch, setClientSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(clientSearch.toLowerCase())
  );

  const handleSelectClient = (client: { name: string, consultant: string }) => {
    setNewForm({
      ...newForm,
      clientName: client.name,
      consultantName: client.consultant
    });
    setClientSearch(client.name);
    setShowSuggestions(false);
  };

  const handleSave = () => {
    const newContract: Contract = {
      id: Math.random().toString(36).substr(2, 9),
      ...newForm,
      status: 'PENDING'
    };
    setContracts([newContract, ...contracts]);
    setIsNewModalOpen(false);
    setClientSearch('');
    setNewForm({
      contractNo: '',
      contractDate: '',
      clientName: '',
      consultantName: '',
      fee: '',
      paymentDate: '',
      signingDate: '',
      content: '',
      remarks: ''
    });
  };

  const handleUpdate = () => {
    if (!editForm) return;
    setContracts(contracts.map(c => c.id === editForm.id ? editForm : c));
    setSelectedContract(editForm);
    setIsEditing(false);
  };

  const filteredContracts = contracts.filter(c => 
    c.contractNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.consultantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);
  const paginatedContracts = filteredContracts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-headline font-extrabold text-primary tracking-tight">Contracts</h1>
          <p className="text-on-surface-variant font-medium mt-1">Manage and track your intellectual property agreements and legal documents.</p>
        </div>
        <button 
          onClick={() => setIsNewModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-2xl font-headline font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          New Contract
        </button>
      </div>

      {/* Stats/Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Total Contracts</p>
            <p className="text-2xl font-headline font-bold">{contracts.length}</p>
          </div>
        </div>
        <div className="md:col-span-3 bg-surface-container-low p-2 rounded-2xl border border-outline-variant/10 flex items-center px-4">
          <Search className="w-5 h-5 text-on-surface-variant/50 mr-3" />
          <input 
            type="text" 
            placeholder="Search by contract number, client, or consultant..."
            className="bg-transparent border-none outline-none w-full text-sm font-medium py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/10 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Contract No.</th>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Contract Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Client</th>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Consultant</th>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Fee</th>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {paginatedContracts.map((contract) => (
                <tr 
                  key={contract.id}
                  className="hover:bg-surface-container-low/30 transition-colors group cursor-pointer"
                  onClick={() => setSelectedContract(contract)}
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                        <Hash className="w-4 h-4" />
                      </div>
                      <span className="font-mono font-bold text-sm">{contract.contractNo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-on-surface-variant/60" />
                      <span className="text-sm font-medium">{contract.contractDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-bold text-sm">{contract.clientName}</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-on-surface-variant/60" />
                      <span className="text-sm font-medium">{contract.consultantName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-mono font-bold text-sm text-primary">{contract.fee}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      contract.status === 'ACTIVE' ? "bg-success-container/20 text-success" :
                      contract.status === 'PENDING' ? "bg-warning-container/20 text-warning" :
                      contract.status === 'COMPLETED' ? "bg-tertiary-container/20 text-tertiary" :
                      "bg-error-container/20 text-error"
                    )}>
                      {contract.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 hover:bg-surface-container-high rounded-xl transition-all text-on-surface-variant group-hover:text-primary">
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-surface-container-low/30 border-t border-outline-variant/10 flex items-center justify-between">
          <p className="text-xs font-medium text-on-surface-variant">
            Showing <span className="font-bold text-on-surface">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-on-surface">{Math.min(currentPage * itemsPerPage, filteredContracts.length)}</span> of <span className="font-bold text-on-surface">{filteredContracts.length}</span> contracts
          </p>
          <div className="flex items-center gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-2 rounded-lg hover:bg-surface-container-high disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={cn(
                    "w-8 h-8 rounded-lg text-xs font-bold transition-all",
                    currentPage === i + 1 ? "bg-primary text-on-primary" : "hover:bg-surface-container-high"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 rounded-lg hover:bg-surface-container-high disabled:opacity-30 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* New Contract Modal */}
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
              className="bg-surface-container-lowest w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative z-10 border border-outline-variant/10"
            >
              <div className="sticky top-0 bg-surface-container-lowest/95 backdrop-blur px-8 py-6 border-b border-outline-variant/10 flex justify-between items-center z-10">
                <div>
                  <h3 className="font-headline font-extrabold text-2xl text-primary">New Contract</h3>
                  <p className="text-on-surface-variant text-sm font-medium">Create a new legal agreement record.</p>
                </div>
                <button 
                  onClick={() => {
                    setIsNewModalOpen(false);
                    setClientSearch('');
                  }} 
                  className="p-2 hover:bg-surface-container-low rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 relative">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Client Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
                      <input 
                        type="text" 
                        value={clientSearch}
                        onChange={(e) => {
                          setClientSearch(e.target.value);
                          setNewForm({...newForm, clientName: e.target.value});
                          setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="Search or enter client name"
                        className="w-full px-4 py-3 pl-10 bg-surface-container-low border border-outline-variant/20 rounded-xl outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                    
                    <AnimatePresence>
                      {showSuggestions && clientSearch && filteredClients.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-20 w-full mt-1 bg-surface-container-lowest border border-outline-variant/20 rounded-xl shadow-xl overflow-hidden"
                        >
                          {filteredClients.map((client, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSelectClient(client)}
                              className="w-full px-4 py-3 text-left hover:bg-surface-container-low transition-colors flex items-center justify-between group"
                            >
                              <div>
                                <p className="text-sm font-bold text-on-surface">{client.name}</p>
                                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">{client.consultant}</p>
                              </div>
                              <Plus className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Contract No.</label>
                    <input 
                      type="text" 
                      value={newForm.contractNo}
                      onChange={(e) => setNewForm({...newForm, contractNo: e.target.value})}
                      placeholder="e.g. LG-2024-XXXX"
                      className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Consultant Name</label>
                    <input 
                      type="text" 
                      value={newForm.consultantName}
                      onChange={(e) => setNewForm({...newForm, consultantName: e.target.value})}
                      placeholder="Enter consultant name"
                      className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Fee</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
                      <input 
                        type="text" 
                        value={newForm.fee}
                        onChange={(e) => setNewForm({...newForm, fee: e.target.value})}
                        placeholder="0.00"
                        className="w-full px-4 py-3 pl-10 bg-surface-container-low border border-outline-variant/20 rounded-xl outline-none focus:border-primary/50 transition-all font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Contract Date</label>
                    <input 
                      type="date" 
                      value={newForm.contractDate}
                      onChange={(e) => setNewForm({...newForm, contractDate: e.target.value})}
                      className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Signing Date</label>
                    <input 
                      type="date" 
                      value={newForm.signingDate}
                      onChange={(e) => setNewForm({...newForm, signingDate: e.target.value})}
                      className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Payment Date</label>
                    <input 
                      type="date" 
                      value={newForm.paymentDate}
                      onChange={(e) => setNewForm({...newForm, paymentDate: e.target.value})}
                      className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Contract Content</label>
                    <textarea 
                      value={newForm.content}
                      onChange={(e) => setNewForm({...newForm, content: e.target.value})}
                      placeholder="Describe the scope and content of the contract..."
                      rows={4}
                      className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl outline-none focus:border-primary/50 transition-all resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Remarks</label>
                    <textarea 
                      value={newForm.remarks}
                      onChange={(e) => setNewForm({...newForm, remarks: e.target.value})}
                      placeholder="Any additional notes or remarks..."
                      rows={3}
                      className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl outline-none focus:border-primary/50 transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button 
                    onClick={() => {
                      setIsNewModalOpen(false);
                      setClientSearch('');
                    }}
                    className="px-6 py-3 border border-outline-variant/20 rounded-xl font-headline font-bold text-on-surface-variant hover:bg-surface-container-low transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="px-8 py-3 bg-primary text-on-primary rounded-xl font-headline font-bold shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
                  >
                    Save Contract
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedContract && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedContract(null);
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
                            onChange={(e) => setEditForm(prev => prev ? {...prev, status: e.target.value as any} : null)}
                            className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider outline-none border border-primary/20 focus:border-primary transition-all"
                          >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="PENDING">PENDING</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="EXPIRED">EXPIRED</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <input 
                            type="text" 
                            value={editForm?.contractNo}
                            onChange={(e) => setEditForm(prev => prev ? {...prev, contractNo: e.target.value} : null)}
                            className="text-3xl font-headline font-extrabold text-primary bg-transparent border-b border-primary/30 focus:border-primary outline-none w-full"
                            placeholder="Contract No."
                          />
                          <input 
                            type="text" 
                            value={editForm?.clientName}
                            onChange={(e) => setEditForm(prev => prev ? {...prev, clientName: e.target.value} : null)}
                            className="text-on-surface-variant font-medium bg-transparent border-b border-outline-variant/30 focus:border-primary outline-none w-full"
                            placeholder="Client Name"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">
                          {selectedContract.status}
                        </span>
                        <h3 className="text-3xl font-headline font-extrabold text-primary">{selectedContract.contractNo}</h3>
                        <p className="text-on-surface-variant font-medium">{selectedContract.clientName}</p>
                      </>
                    )}
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedContract(null);
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
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Consultant</p>
                        {isEditing ? (
                          <input 
                            type="text" 
                            value={editForm?.consultantName}
                            onChange={(e) => setEditForm(prev => prev ? {...prev, consultantName: e.target.value} : null)}
                            className="w-full bg-transparent border-b border-primary/30 focus:border-primary outline-none py-0.5 font-bold text-sm"
                          />
                        ) : (
                          <p className="font-bold">{selectedContract.consultantName}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Fee</p>
                        {isEditing ? (
                          <input 
                            type="text" 
                            value={editForm?.fee}
                            onChange={(e) => setEditForm(prev => prev ? {...prev, fee: e.target.value} : null)}
                            className="w-full bg-transparent border-b border-primary/30 focus:border-primary outline-none py-0.5 font-mono font-bold text-sm"
                          />
                        ) : (
                          <p className="font-mono font-bold">{selectedContract.fee}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Signing Date</p>
                        {isEditing ? (
                          <input 
                            type="date" 
                            value={editForm?.signingDate}
                            onChange={(e) => setEditForm(prev => prev ? {...prev, signingDate: e.target.value} : null)}
                            className="w-full bg-transparent border-b border-primary/30 focus:border-primary outline-none py-0.5 font-bold text-sm"
                          />
                        ) : (
                          <p className="font-bold">{selectedContract.signingDate}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Payment Date</p>
                        {isEditing ? (
                          <input 
                            type="date" 
                            value={editForm?.paymentDate}
                            onChange={(e) => setEditForm(prev => prev ? {...prev, paymentDate: e.target.value} : null)}
                            className="w-full bg-transparent border-b border-primary/30 focus:border-primary outline-none py-0.5 font-bold text-sm"
                          />
                        ) : (
                          <p className="font-bold">{selectedContract.paymentDate}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-outline-variant/10">
                  <div>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Contract Content</p>
                    {isEditing ? (
                      <textarea 
                        value={editForm?.content}
                        onChange={(e) => setEditForm(prev => prev ? {...prev, content: e.target.value} : null)}
                        rows={3}
                        className="w-full bg-surface-container-low p-4 rounded-2xl text-sm leading-relaxed font-medium outline-none border border-primary/30 focus:border-primary resize-none"
                      />
                    ) : (
                      <div className="bg-surface-container-low p-4 rounded-2xl text-sm leading-relaxed font-medium">
                        {selectedContract.content}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Remarks</p>
                    {isEditing ? (
                      <textarea 
                        value={editForm?.remarks}
                        onChange={(e) => setEditForm(prev => prev ? {...prev, remarks: e.target.value} : null)}
                        rows={2}
                        className="w-full bg-surface-container-low p-4 rounded-2xl text-sm italic text-on-surface-variant font-medium outline-none border border-primary/30 focus:border-primary resize-none"
                      />
                    ) : (
                      <div className="bg-surface-container-low p-4 rounded-2xl text-sm italic text-on-surface-variant font-medium">
                        {selectedContract.remarks}
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
                          setEditForm(selectedContract);
                          setIsEditing(true);
                        }}
                        className="px-6 py-3 border border-primary/20 text-primary rounded-xl font-headline font-bold hover:bg-primary/5 transition-all"
                      >
                        Edit Contract
                      </button>
                      <button 
                        onClick={() => setSelectedContract(null)}
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
    </div>
  );
}
