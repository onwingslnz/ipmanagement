import React, { useState } from 'react';
import { 
  FileText, 
  Search,
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
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
  MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { countries } from '@/constants/countries';

interface Patent {
  id: string;
  signingDate: string;
  contractNo: string;
  consultantName: string;
  contractContent: string;
  applicant: string;
  inventor: string;
  applicationDate: string;
  patentType: string;
  applicationNumber: string;
  status: string;
  statusType: string;
  priorityDate?: string;
  priorityNumber?: string;
  referenceNumber?: string;
  agentReferenceNumber?: string;
  annualFee?: string;
  country?: string;
  registrationNumber?: string;
  remarks?: string;
  history?: {
    date: string;
    event: string;
    summary: string;
    details: string;
    completed?: boolean;
  }[];
}

export default function Patents() {
  const [patents, setPatents] = useState<Patent[]>([
    {
      id: 'PAT-2024-001',
      signingDate: '2024-01-15',
      contractNo: 'CN-8829-X',
      consultantName: 'Sarah Jenkins',
      contractContent: 'Utility Patent for AI-Driven Logistics Optimization',
      applicant: 'Novatech Ventures Inc.',
      inventor: 'Dr. Robert Chen, Elena Rodriguez',
      applicationDate: '2024-02-10',
      patentType: 'Invention',
      applicationNumber: 'US 18/293,441',
      status: 'PUBLISHED',
      statusType: 'tertiary',
      priorityDate: '2023-11-05',
      priorityNumber: 'US 63/591,202',
      annualFee: '$1,250.00',
      country: 'United States',
      registrationNumber: 'US 11,892,441',
      remarks: 'Key patent for the logistics platform optimization engine.',
      history: [
        {
          date: '2024-02-10',
          event: 'Application Filed',
          summary: 'Application submitted to USPTO.',
          details: 'Full utility patent application including 20 claims and detailed specifications.',
          completed: true
        },
        {
          date: '2024-05-15',
          event: 'Office Action Issued',
          summary: 'Non-final rejection received.',
          details: 'Examiner cited prior art related to cloud-based routing. Response required by 2024-08-15.',
          completed: false
        },
        {
          date: '2024-08-10',
          event: 'Response Filed',
          summary: 'Response to Office Action submitted.',
          details: 'Amended claims to emphasize the unique AI-driven heuristic approach.',
          completed: false
        }
      ]
    },
    {
      id: 'PAT-2024-002',
      signingDate: '2024-02-20',
      contractNo: 'CN-9012-A',
      consultantName: 'Dr. Marcus Thorne',
      contractContent: 'Quantum Encryption Method for Distributed Ledgers',
      applicant: 'Aether Labs',
      inventor: 'Dr. Marcus Thorne, Sarah Smith',
      applicationDate: '2024-03-05',
      patentType: 'Invention',
      applicationNumber: 'EP 24156789.2',
      status: 'PENDING',
      statusType: 'secondary',
      priorityDate: '2024-01-12',
      priorityNumber: 'EP 23214567.1',
      annualFee: '€850.00',
      country: 'European Union',
      registrationNumber: 'Pending',
      remarks: 'Strategic asset for quantum-safe blockchain infrastructure.',
      history: [
        {
          date: '2024-03-05',
          event: 'Application Filed',
          summary: 'Application submitted to EPO.',
          details: 'Direct EP application with priority claim to earlier UK filing.',
          completed: true
        }
      ]
    },
    {
      id: 'PAT-2023-088',
      signingDate: '2023-11-12',
      contractNo: 'CN-7741-B',
      consultantName: 'Yuki Tanaka',
      contractContent: 'Solid-State Battery Thermal Management System',
      applicant: 'Solari Motors',
      inventor: 'Kenji Sato, Yuki Tanaka',
      applicationDate: '2023-12-01',
      patentType: 'Utility Model',
      applicationNumber: 'JP 2023-199283',
      status: 'GRANTED',
      statusType: 'success',
      priorityDate: '2023-05-20',
      priorityNumber: 'JP 2023-084512',
      annualFee: '¥120,000',
      country: 'Japan',
      registrationNumber: 'JP 7456123',
      remarks: 'Core technology for next-gen EV battery packs.',
      history: [
        {
          date: '2023-12-01',
          event: 'Application Filed',
          summary: 'Application submitted to JPO.',
          details: 'Utility model application for rapid protection in Japan.',
          completed: true
        },
        {
          date: '2024-03-15',
          event: 'Grant Issued',
          summary: 'Patent granted by JPO.',
          details: 'Certificate of registration issued. Valid for 10 years from filing.',
          completed: true
        }
      ]
    }
  ]);

  const [selectedPatent, setSelectedPatent] = useState<Patent | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatent, setEditedPatent] = useState<Patent | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isNewApplicationModalOpen, setIsNewApplicationModalOpen] = useState(false);
  
  const mockContracts = [
    { id: 'CN-8829-X', title: 'AI-Driven Logistics Optimization', applicant: 'Novatech Ventures Inc.', inventor: 'Dr. Robert Chen' },
    { id: 'CN-9012-A', title: 'Quantum Encryption Method', applicant: 'Aether Labs', inventor: 'Dr. Marcus Thorne' },
    { id: 'CN-7741-B', title: 'Solid-State Battery System', applicant: 'Solari Motors', inventor: 'Kenji Sato' },
    { id: 'CN-1234-C', title: 'Next-Gen Solar Panel', applicant: 'Green Energy Corp', inventor: 'Alice Johnson' },
  ];

  const [newApplicationForm, setNewApplicationForm] = useState({
    contractSearch: '',
    selectedContract: null as any,
    applicant: '',
    inventor: '',
    applicationDate: '',
    patentType: 'Invention',
    priorityDate: '',
    applicationNumber: '',
    priorityNumber: '',
    referenceNumber: '',
    agentReferenceNumber: '',
    remarks: '',
    country: ''
  });
  const [transactionForm, setTransactionForm] = useState({
    date: '',
    opinion: '',
    deadline: '',
    remarks: ''
  });

  const handleEditClick = () => {
    if (selectedPatent) {
      setEditedPatent({ ...selectedPatent });
      setIsEditing(true);
    }
  };

  const handleSaveEdit = () => {
    if (editedPatent) {
      setPatents(prev => prev.map(p => p.id === editedPatent.id ? editedPatent : p));
      setSelectedPatent(editedPatent);
      setIsEditing(false);
      setEditedPatent(null);
    }
  };

  const handleInputChange = (field: keyof Patent, value: string) => {
    if (editedPatent) {
      setEditedPatent({ ...editedPatent, [field]: value });
    }
  };

  const handleSaveTransaction = () => {
    if (selectedRowId && transactionForm.date && transactionForm.opinion) {
      setPatents(prev => prev.map(p => {
        if (p.id === selectedRowId) {
          const newHistory = [
            ...(p.history || []),
            {
              date: transactionForm.date,
              event: 'Official Opinion Received',
              summary: transactionForm.opinion,
              details: `Deadline: ${transactionForm.deadline || 'N/A'}. Remarks: ${transactionForm.remarks || 'N/A'}`,
              completed: false
            }
          ];
          return { ...p, history: newHistory };
        }
        return p;
      }));
      setIsTransactionModalOpen(false);
      setTransactionForm({ date: '', opinion: '', deadline: '', remarks: '' });
    }
  };

  const handleSaveNewApplication = () => {
    const newId = `PAT-${new Date().getFullYear()}-${String(patents.length + 1).padStart(3, '0')}`;
    const newPatent: Patent = {
      id: newId,
      signingDate: new Date().toISOString().split('T')[0],
      contractNo: newApplicationForm.selectedContract?.id || newApplicationForm.contractSearch || 'N/A',
      consultantName: 'Current User', // Placeholder
      contractContent: newApplicationForm.selectedContract?.title || 'New Patent Application',
      applicant: newApplicationForm.applicant,
      inventor: newApplicationForm.inventor,
      applicationDate: newApplicationForm.applicationDate,
      patentType: newApplicationForm.patentType,
      applicationNumber: newApplicationForm.applicationNumber,
      status: 'PENDING',
      statusType: 'secondary',
      priorityDate: newApplicationForm.priorityDate,
      priorityNumber: newApplicationForm.priorityNumber,
      referenceNumber: newApplicationForm.referenceNumber,
      agentReferenceNumber: newApplicationForm.agentReferenceNumber,
      remarks: newApplicationForm.remarks,
      country: newApplicationForm.country,
      history: [
        {
          date: newApplicationForm.applicationDate,
          event: 'Application Filed',
          summary: 'New application submitted.',
          details: `Filed in ${newApplicationForm.country}. App No: ${newApplicationForm.applicationNumber}`,
          completed: true
        }
      ]
    };

    setPatents(prev => [newPatent, ...prev]);
    setIsNewApplicationModalOpen(false);
    setNewApplicationForm({
      contractSearch: '',
      selectedContract: null,
      applicant: '',
      inventor: '',
      applicationDate: '',
      patentType: 'Invention',
      priorityDate: '',
      applicationNumber: '',
      priorityNumber: '',
      referenceNumber: '',
      agentReferenceNumber: '',
      remarks: '',
      country: ''
    });
  };

  const toggleHistoryCompletion = (patentId: string, historyIndex: number) => {
    setPatents(prev => prev.map(p => {
      if (p.id === patentId && p.history) {
        const newHistory = [...p.history];
        newHistory[historyIndex] = {
          ...newHistory[historyIndex],
          completed: !newHistory[historyIndex].completed
        };
        
        // Update selectedPatent if it's the one being modified
        if (selectedPatent?.id === patentId) {
          setSelectedPatent({ ...p, history: newHistory });
        }
        
        return { ...p, history: newHistory };
      }
      return p;
    }));
  };

  return (
    <div className="p-12 max-w-[1600px] mx-auto space-y-12 text-on-surface">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight mb-2">Patents</h2>
          <p className="text-on-surface-variant text-lg max-w-2xl font-body leading-relaxed">Manage and track your global patent portfolio, including applications, grants, and legal documentation.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            disabled={!!selectedRowId}
            onClick={() => setIsNewApplicationModalOpen(true)}
            className={cn(
              "px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-md",
              !selectedRowId 
                ? "bg-surface-container-high text-on-surface hover:bg-surface-container-highest" 
                : "bg-surface-container-high text-on-surface-variant/30 cursor-not-allowed shadow-none"
            )}
          >
            <Plus className="w-4 h-4" />
            <span>New Patent Application</span>
          </button>
          <button 
            disabled={!selectedRowId}
            onClick={() => setIsTransactionModalOpen(true)}
            className={cn(
              "px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg",
              selectedRowId 
                ? "bg-primary text-on-primary shadow-primary/20 hover:scale-[0.98]" 
                : "bg-surface-container-high text-on-surface-variant/30 cursor-not-allowed shadow-none"
            )}
          >
            <Plus className="w-4 h-4" />
            <span>Patent Transaction Input</span>
          </button>
        </div>
      </section>

      {/* Table Controls */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-8 flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-primary text-on-primary rounded-full text-sm font-semibold flex items-center gap-2 shadow-md">
            <span>All Patents</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">86</span>
          </button>
          <button className="px-4 py-2 hover:bg-surface-container-low text-on-surface-variant rounded-full text-sm font-medium transition-colors">Pending</button>
          <button className="px-4 py-2 hover:bg-surface-container-low text-on-surface-variant rounded-full text-sm font-medium transition-colors">Granted</button>
          <button className="px-4 py-2 hover:bg-surface-container-low text-on-surface-variant rounded-full text-sm font-medium transition-colors">Published</button>
        </div>
        <div className="md:col-span-4 flex justify-end gap-2">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
            <input 
              type="text" 
              placeholder="Search patents..." 
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm outline-none focus:border-primary/30 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Patent Table */}
      <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="bg-surface-container-low/50">
              <tr>
                <th className="px-4 py-4 font-headline text-[10px] font-bold text-on-secondary-container uppercase tracking-widest">Signing / Contract</th>
                <th className="px-4 py-4 font-headline text-[10px] font-bold text-on-secondary-container uppercase tracking-widest">Consultant & Content</th>
                <th className="px-4 py-4 font-headline text-[10px] font-bold text-on-secondary-container uppercase tracking-widest">Applicant & Inventor</th>
                <th className="px-4 py-4 font-headline text-[10px] font-bold text-on-secondary-container uppercase tracking-widest">App Date / Type</th>
                <th className="px-4 py-4 font-headline text-[10px] font-bold text-on-secondary-container uppercase tracking-widest">App Number</th>
                <th className="px-4 py-4 font-headline text-[10px] font-bold text-on-secondary-container uppercase tracking-widest text-center">Status</th>
                <th className="px-4 py-4 font-headline text-[10px] font-bold text-on-secondary-container uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {patents.map((patent) => (
                <tr 
                  key={patent.id} 
                  onClick={() => setSelectedRowId(patent.id === selectedRowId ? null : patent.id)}
                  className={cn(
                    "group cursor-pointer transition-colors",
                    selectedRowId === patent.id ? "bg-primary/5 shadow-inner" : "hover:bg-surface-container-low/50"
                  )}
                >
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center",
                        selectedRowId === patent.id ? "border-primary bg-primary" : "border-outline-variant"
                      )}>
                        {selectedRowId === patent.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-on-surface">{patent.signingDate}</p>
                        <p className="text-[10px] text-primary font-mono bg-primary/5 px-1.5 py-0.5 rounded inline-block">{patent.contractNo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="space-y-1 max-w-[250px]">
                      <p className="text-xs font-bold text-on-surface">{patent.consultantName}</p>
                      <p className="text-[11px] text-on-surface-variant leading-tight">{patent.contractContent}</p>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="space-y-1 max-w-[200px]">
                      <p className="text-xs font-bold text-on-surface">{patent.applicant}</p>
                      <p className="text-[11px] text-on-surface-variant italic">{patent.inventor}</p>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-on-surface">{patent.applicationDate}</p>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">{patent.patentType}</p>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-on-surface">{patent.applicationNumber}</span>
                      <ExternalLink className="w-3 h-3 text-primary/50" />
                    </div>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider",
                      patent.statusType === 'tertiary' && "bg-tertiary-container text-on-tertiary-container",
                      patent.statusType === 'secondary' && "bg-secondary-container text-on-secondary-container",
                      patent.statusType === 'success' && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    )}>
                      {patent.status}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => setSelectedPatent(patent)}
                        className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-all hover:scale-110"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-surface-container-low/30 flex items-center justify-between border-t border-outline-variant/10">
          <p className="text-xs font-medium text-on-surface-variant">Showing <span className="text-on-surface font-bold">{(currentPage - 1) * 20 + 1}-{Math.min(currentPage * 20, 86)}</span> of <span className="text-on-surface font-bold">86</span> patents</p>
          <div className="flex gap-1">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:bg-white transition-colors border border-outline-variant/10 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setCurrentPage(1)}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-bold shadow-sm transition-all",
                currentPage === 1 ? "bg-primary text-on-primary" : "bg-surface-container-lowest text-on-surface-variant hover:bg-white border border-outline-variant/10"
              )}
            >
              1
            </button>
            <button 
              onClick={() => setCurrentPage(2)}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-bold shadow-sm transition-all",
                currentPage === 2 ? "bg-primary text-on-primary" : "bg-surface-container-lowest text-on-surface-variant hover:bg-white border border-outline-variant/10"
              )}
            >
              2
            </button>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, 5))}
              disabled={currentPage === 5}
              className="p-1.5 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:bg-white transition-colors border border-outline-variant/10 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* New Application Modal */}
      <AnimatePresence>
        {isNewApplicationModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewApplicationModalOpen(false)}
              className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden border border-outline-variant/10"
            >
              <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between bg-surface-container-low/30">
                <div>
                  <h3 className="font-headline text-xl font-bold text-on-surface">New Patent Application</h3>
                  <p className="text-xs text-on-surface-variant mt-1">Create a new patent record from a contract</p>
                </div>
                <button 
                  onClick={() => setIsNewApplicationModalOpen(false)}
                  className="p-2 rounded-full hover:bg-surface-container-high transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Search Contract</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
                    <input 
                      type="text" 
                      placeholder="Search by contract number or title..."
                      value={newApplicationForm.contractSearch}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNewApplicationForm({ ...newApplicationForm, contractSearch: val, selectedContract: null });
                      }}
                      className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm outline-none focus:border-primary/30 transition-all"
                    />
                    
                    {/* Search Results Dropdown */}
                    {newApplicationForm.contractSearch && !newApplicationForm.selectedContract && (
                      <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-surface-container-lowest border border-outline-variant/10 rounded-xl shadow-xl overflow-hidden max-h-48 overflow-y-auto">
                        {mockContracts
                          .filter(c => 
                            c.id.toLowerCase().includes(newApplicationForm.contractSearch.toLowerCase()) || 
                            c.title.toLowerCase().includes(newApplicationForm.contractSearch.toLowerCase())
                          )
                          .map(contract => (
                            <button
                              key={contract.id}
                              onClick={() => setNewApplicationForm({
                                ...newApplicationForm,
                                selectedContract: contract,
                                contractSearch: contract.id,
                                applicant: contract.applicant,
                                inventor: contract.inventor
                              })}
                              className="w-full px-4 py-3 text-left hover:bg-primary/5 transition-colors border-b border-outline-variant/5 last:border-0"
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-on-surface">{contract.id}</span>
                                <span className="text-[10px] text-primary font-medium">Select</span>
                              </div>
                              <p className="text-[11px] text-on-surface-variant truncate">{contract.title}</p>
                            </button>
                          ))
                        }
                        {mockContracts.filter(c => 
                          c.id.toLowerCase().includes(newApplicationForm.contractSearch.toLowerCase()) || 
                          c.title.toLowerCase().includes(newApplicationForm.contractSearch.toLowerCase())
                        ).length === 0 && (
                          <div className="px-4 py-3 text-xs text-on-surface-variant italic">No contracts found</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Selected Contract Info */}
                {newApplicationForm.selectedContract && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-primary/5 border border-primary/10 rounded-xl space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Linked Contract</p>
                        <h4 className="text-sm font-bold text-on-surface">{newApplicationForm.selectedContract.id}</h4>
                      </div>
                      <button 
                        onClick={() => setNewApplicationForm({ ...newApplicationForm, selectedContract: null, contractSearch: '' })}
                        className="text-[10px] text-on-surface-variant hover:text-primary underline"
                      >
                        Change
                      </button>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-tight">{newApplicationForm.selectedContract.title}</p>
                  </motion.div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Applicant</label>
                    <input 
                      type="text" 
                      value={newApplicationForm.applicant}
                      onChange={(e) => setNewApplicationForm({ ...newApplicationForm, applicant: e.target.value })}
                      placeholder="Enter applicant name"
                      className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm outline-none focus:border-primary/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Inventor</label>
                    <input 
                      type="text" 
                      value={newApplicationForm.inventor}
                      onChange={(e) => setNewApplicationForm({ ...newApplicationForm, inventor: e.target.value })}
                      placeholder="Enter inventor(s)"
                      className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm outline-none focus:border-primary/30 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Application Date</label>
                    <input 
                      type="date" 
                      value={newApplicationForm.applicationDate}
                      onChange={(e) => setNewApplicationForm({ ...newApplicationForm, applicationDate: e.target.value })}
                      className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm outline-none focus:border-primary/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Application Number</label>
                    <input 
                      type="text" 
                      value={newApplicationForm.applicationNumber}
                      onChange={(e) => setNewApplicationForm({ ...newApplicationForm, applicationNumber: e.target.value })}
                      placeholder="Enter application number"
                      className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm outline-none focus:border-primary/30 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Priority Date</label>
                    <input 
                      type="date" 
                      value={newApplicationForm.priorityDate}
                      onChange={(e) => setNewApplicationForm({ ...newApplicationForm, priorityDate: e.target.value })}
                      className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm outline-none focus:border-primary/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Priority Number</label>
                    <input 
                      type="text" 
                      value={newApplicationForm.priorityNumber}
                      onChange={(e) => setNewApplicationForm({ ...newApplicationForm, priorityNumber: e.target.value })}
                      placeholder="Enter priority number"
                      className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm outline-none focus:border-primary/30 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Patent Type</label>
                    <div className="relative">
                      <select 
                        value={newApplicationForm.patentType}
                        onChange={(e) => setNewApplicationForm({ ...newApplicationForm, patentType: e.target.value })}
                        className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm outline-none focus:border-primary/30 transition-all appearance-none pr-10"
                      >
                        <option value="Invention">Invention</option>
                        <option value="Utility Model">Utility Model</option>
                        <option value="Design">Design</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-2 relative">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Country</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={newApplicationForm.country}
                        onChange={(e) => setNewApplicationForm({ ...newApplicationForm, country: e.target.value.toUpperCase() })}
                        placeholder="Enter country code (e.g. US, CN)"
                        className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm outline-none focus:border-primary/30 transition-all"
                      />
                      
                      {/* Country Suggestions Dropdown */}
                      {newApplicationForm.country && countries.filter(c => 
                        c.code.toLowerCase().includes(newApplicationForm.country.toLowerCase()) || 
                        c.name.toLowerCase().includes(newApplicationForm.country.toLowerCase())
                      ).length > 0 && !countries.find(c => c.code === newApplicationForm.country) && (
                        <div className="absolute z-50 bottom-full left-0 right-0 mb-1 bg-surface-container-lowest border border-outline-variant/10 rounded-xl shadow-xl overflow-hidden max-h-48 overflow-y-auto">
                          {countries
                            .filter(c => 
                              c.code.toLowerCase().includes(newApplicationForm.country.toLowerCase()) || 
                              c.name.toLowerCase().includes(newApplicationForm.country.toLowerCase())
                            )
                            .map(country => (
                              <button
                                key={country.code}
                                onClick={() => setNewApplicationForm({ ...newApplicationForm, country: country.code })}
                                className="w-full px-4 py-3 text-left hover:bg-primary/5 transition-colors border-b border-outline-variant/5 last:border-0 flex items-center justify-between"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-xs font-bold text-primary">{country.code}</span>
                                  <span className="text-xs text-on-surface">{country.name}</span>
                                </div>
                                <MapPin className="w-3 h-3 text-on-surface-variant/30" />
                              </button>
                            ))
                          }
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Reference Number</label>
                    <input 
                      type="text" 
                      value={newApplicationForm.referenceNumber}
                      onChange={(e) => setNewApplicationForm({ ...newApplicationForm, referenceNumber: e.target.value })}
                      placeholder="Enter reference number"
                      className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm outline-none focus:border-primary/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Agent Reference Number</label>
                    <input 
                      type="text" 
                      value={newApplicationForm.agentReferenceNumber}
                      onChange={(e) => setNewApplicationForm({ ...newApplicationForm, agentReferenceNumber: e.target.value })}
                      placeholder="Enter agent reference number"
                      className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm outline-none focus:border-primary/30 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Remarks</label>
                  <input 
                    type="text" 
                    value={newApplicationForm.remarks}
                    onChange={(e) => setNewApplicationForm({ ...newApplicationForm, remarks: e.target.value })}
                    placeholder="Enter remarks"
                    className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm outline-none focus:border-primary/30 transition-all"
                  />
                </div>
              </div>

              <div className="p-6 bg-surface-container-low/30 border-t border-outline-variant/10 flex items-center justify-end gap-3">
                <button 
                  onClick={() => setIsNewApplicationModalOpen(false)}
                  className="px-6 py-2 rounded-xl font-bold text-sm text-on-surface-variant hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveNewApplication}
                  disabled={!newApplicationForm.applicant || !newApplicationForm.applicationDate}
                  className="px-6 py-2 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Application
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Transaction Input Modal */}
      <AnimatePresence>
        {isTransactionModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTransactionModalOpen(false)}
              className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden border border-outline-variant/10"
            >
              <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between bg-surface-container-low/30">
                <div>
                  <h3 className="font-headline text-xl font-bold text-on-surface">Patent Transaction Input</h3>
                  <p className="text-xs text-on-surface-variant mt-1">Add new official transaction for {selectedRowId}</p>
                </div>
                <button 
                  onClick={() => setIsTransactionModalOpen(false)}
                  className="p-2 rounded-full hover:bg-surface-container-high transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Official Opinion Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
                    <input 
                      type="date" 
                      value={transactionForm.date}
                      onChange={(e) => setTransactionForm({ ...transactionForm, date: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm outline-none focus:border-primary/30 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Official Opinion</label>
                  <textarea 
                    value={transactionForm.opinion}
                    onChange={(e) => setTransactionForm({ ...transactionForm, opinion: e.target.value })}
                    placeholder="Enter official opinion summary..."
                    rows={3}
                    className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm outline-none focus:border-primary/30 transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Processing Deadline</label>
                    <input 
                      type="date" 
                      value={transactionForm.deadline}
                      onChange={(e) => setTransactionForm({ ...transactionForm, deadline: e.target.value })}
                      className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm outline-none focus:border-primary/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Remarks</label>
                    <input 
                      type="text" 
                      value={transactionForm.remarks}
                      onChange={(e) => setTransactionForm({ ...transactionForm, remarks: e.target.value })}
                      placeholder="Optional remarks..."
                      className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm outline-none focus:border-primary/30 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-surface-container-low/30 border-t border-outline-variant/10 flex items-center justify-end gap-3">
                <button 
                  onClick={() => setIsTransactionModalOpen(false)}
                  className="px-6 py-2 rounded-xl font-bold text-sm text-on-surface-variant hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveTransaction}
                  disabled={!transactionForm.date || !transactionForm.opinion}
                  className="px-6 py-2 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Transaction
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedPatent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPatent(null)}
              className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden border border-outline-variant/10"
            >
              <div className="p-8 border-b border-outline-variant/10 flex items-center justify-between bg-surface-container-low/30">
                <div>
                  <h3 className="font-headline text-2xl font-bold text-on-surface">
                    {showHistory ? 'Official Transaction History' : 'Patent Details'}
                  </h3>
                  <p className="text-sm text-on-surface-variant mt-1">
                    {showHistory ? `Chronological history for ${selectedPatent.id}` : `Detailed case information for ${selectedPatent.id}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {showHistory && (
                    <button 
                      onClick={() => setShowHistory(false)}
                      className="px-4 py-2 rounded-xl text-sm font-bold text-primary hover:bg-primary/5 transition-colors"
                    >
                      Back to Details
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      setSelectedPatent(null);
                      setShowHistory(false);
                    }}
                    className="p-2 rounded-full hover:bg-surface-container-high transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-8 max-h-[60vh] overflow-y-auto">
                {!showHistory ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <DetailItem 
                        icon={<User className="w-4 h-4" />} 
                        label="Applicant" 
                        value={isEditing ? editedPatent?.applicant || '' : selectedPatent.applicant} 
                        isEditing={isEditing}
                        onChange={(val) => handleInputChange('applicant', val)}
                      />
                      <DetailItem 
                        icon={<User className="w-4 h-4" />} 
                        label="Inventor" 
                        value={isEditing ? editedPatent?.inventor || '' : selectedPatent.inventor} 
                        isEditing={isEditing}
                        onChange={(val) => handleInputChange('inventor', val)}
                      />
                      <DetailItem 
                        icon={<Calendar className="w-4 h-4" />} 
                        label="Application Date" 
                        value={isEditing ? editedPatent?.applicationDate || '' : selectedPatent.applicationDate} 
                        isEditing={isEditing}
                        onChange={(val) => handleInputChange('applicationDate', val)}
                      />
                      <DetailItem 
                        icon={<FileText className="w-4 h-4" />} 
                        label="Patent Type" 
                        value={isEditing ? editedPatent?.patentType || '' : selectedPatent.patentType} 
                        isEditing={isEditing}
                        onChange={(val) => handleInputChange('patentType', val)}
                      />
                      <DetailItem 
                        icon={<Globe className="w-4 h-4" />} 
                        label="Country" 
                        value={isEditing ? editedPatent?.country || '' : selectedPatent.country || 'N/A'} 
                        isEditing={isEditing}
                        onChange={(val) => handleInputChange('country', val)}
                      />
                      <DetailItem 
                        icon={<Calendar className="w-4 h-4" />} 
                        label="Priority Date" 
                        value={isEditing ? editedPatent?.priorityDate || '' : selectedPatent.priorityDate || 'N/A'} 
                        isEditing={isEditing}
                        onChange={(val) => handleInputChange('priorityDate', val)}
                      />
                    </div>
                    <div className="space-y-6">
                      <DetailItem 
                        icon={<Activity className="w-4 h-4" />} 
                        label="Status" 
                        value={isEditing ? editedPatent?.status || '' : selectedPatent.status} 
                        isBadge
                        statusType={selectedPatent.statusType}
                      />
                      <DetailItem 
                        icon={<Hash className="w-4 h-4" />} 
                        label="Application Number" 
                        value={isEditing ? editedPatent?.applicationNumber || '' : selectedPatent.applicationNumber} 
                        isEditing={isEditing}
                        onChange={(val) => handleInputChange('applicationNumber', val)}
                      />
                      <DetailItem 
                        icon={<Hash className="w-4 h-4" />} 
                        label="Registration Number" 
                        value={isEditing ? editedPatent?.registrationNumber || '' : selectedPatent.registrationNumber || 'N/A'} 
                        isEditing={isEditing}
                        onChange={(val) => handleInputChange('registrationNumber', val)}
                      />
                      <DetailItem 
                        icon={<Hash className="w-4 h-4" />} 
                        label="Priority Number" 
                        value={isEditing ? editedPatent?.priorityNumber || '' : selectedPatent.priorityNumber || 'N/A'} 
                        isEditing={isEditing}
                        onChange={(val) => handleInputChange('priorityNumber', val)}
                      />
                      <DetailItem 
                        icon={<CreditCard className="w-4 h-4" />} 
                        label="Annual Fee" 
                        value={isEditing ? editedPatent?.annualFee || '' : selectedPatent.annualFee || 'N/A'} 
                        isEditing={isEditing}
                        onChange={(val) => handleInputChange('annualFee', val)}
                      />
                      <DetailItem 
                        icon={<FileText className="w-4 h-4" />} 
                        label="Remarks" 
                        value={isEditing ? editedPatent?.remarks || '' : selectedPatent.remarks || 'N/A'} 
                        isEditing={isEditing}
                        onChange={(val) => handleInputChange('remarks', val)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {selectedPatent.history?.map((item, idx) => (
                      <div key={idx} className="relative pl-8 border-l-2 border-primary/20 last:border-0 pb-8 last:pb-0">
                        <button 
                          onClick={() => toggleHistoryCompletion(selectedPatent.id, idx)}
                          className={cn(
                            "absolute left-[-9px] top-0 w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center",
                            item.completed ? "bg-primary border-primary" : "bg-surface-container-lowest border-primary/40"
                          )}
                        >
                          {item.completed && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </button>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className={cn(
                              "font-bold transition-colors",
                              item.completed ? "text-on-surface/50" : "text-on-surface"
                            )}>{item.event}</h4>
                            <span className="text-xs font-mono text-primary bg-primary/5 px-2 py-1 rounded-lg">{item.date}</span>
                          </div>
                          <p className={cn(
                            "text-sm font-semibold transition-colors",
                            item.completed ? "text-on-surface-variant/50" : "text-on-surface-variant"
                          )}>{item.summary}</p>
                          <div className={cn(
                            "p-4 rounded-xl border transition-all",
                            item.completed 
                              ? "bg-surface-container-low/50 border-outline-variant/5 opacity-60" 
                              : "bg-surface-container-low border border-outline-variant/10 shadow-sm"
                          )}>
                            <p className="text-xs text-on-surface-variant leading-relaxed">{item.details}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {(!selectedPatent.history || selectedPatent.history.length === 0) && (
                      <div className="text-center py-12">
                        <p className="text-on-surface-variant">No transaction history available for this case.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="p-8 bg-surface-container-low/30 border-t border-outline-variant/10 flex flex-wrap items-center justify-between gap-4">
                <button 
                  onClick={() => setShowHistory(!showHistory)}
                  disabled={isEditing}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-primary border border-primary/20 hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Activity className="w-4 h-4" />
                  <span>{showHistory ? 'View Details' : 'Official Transaction History'}</span>
                </button>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      if (isEditing) {
                        setIsEditing(false);
                        setEditedPatent(null);
                      } else {
                        setSelectedPatent(null);
                        setShowHistory(false);
                      }
                    }}
                    className="px-6 py-2.5 rounded-xl font-bold text-sm text-on-surface-variant hover:bg-surface-container-high transition-colors"
                  >
                    {isEditing ? 'Cancel' : 'Close'}
                  </button>
                  {isEditing ? (
                    <button 
                      onClick={handleSaveEdit}
                      className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[0.98] transition-all"
                    >
                      Save Changes
                    </button>
                  ) : (
                    <button 
                      onClick={handleEditClick}
                      className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[0.98] transition-all"
                    >
                      Edit Information
                    </button>
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

function DetailItem({ icon, label, value, isBadge, statusType, isEditing, onChange }: { 
  icon: React.ReactNode, 
  label: string, 
  value: string,
  isBadge?: boolean,
  statusType?: string,
  isEditing?: boolean,
  onChange?: (val: string) => void
}) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">{label}</p>
        {isEditing && !isBadge ? (
          <input 
            type="text"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full text-sm font-semibold text-on-surface bg-surface-container-low border border-outline-variant/20 rounded-lg px-2 py-1 outline-none focus:border-primary/50 transition-all"
          />
        ) : isBadge ? (
          <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider",
            statusType === 'tertiary' && "bg-tertiary-container text-on-tertiary-container",
            statusType === 'secondary' && "bg-secondary-container text-on-secondary-container",
            statusType === 'success' && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
          )}>
            {value}
          </span>
        ) : (
          <p className="text-sm font-semibold text-on-surface leading-snug">{value}</p>
        )}
      </div>
    </div>
  );
}
