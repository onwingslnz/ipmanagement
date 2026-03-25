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
  Tag,
  Globe,
  MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { countries } from '@/constants/countries';

interface Trademark {
  id: string;
  contractDate: string;
  consultantName: string;
  applicantName: string;
  trademarkDescription: string;
  category: string;
  applicationDate: string;
  applicationNumber: string;
  status: string;
  statusType: string;
  registrationDate?: string;
  registrationNumber?: string;
  referenceNumber?: string;
  agentReferenceNumber?: string;
  remarks?: string;
  history?: {
    date: string;
    event: string;
    summary: string;
    details: string;
    completed?: boolean;
  }[];
}

export default function Trademarks() {
  const [trademarks, setTrademarks] = useState<Trademark[]>([
    {
      id: 'TM-2024-001',
      contractDate: '2024-01-10',
      consultantName: 'Sarah Jenkins',
      applicantName: 'Novatech Ventures Inc.',
      trademarkDescription: 'Logistics platform logo and wordmark',
      category: 'Class 9, 35, 42',
      applicationDate: '2024-02-01',
      applicationNumber: '98/765,432',
      status: 'PUBLISHED',
      statusType: 'tertiary',
      registrationDate: 'Pending',
      registrationNumber: 'Pending',
      remarks: 'Primary brand identity for the new logistics engine.',
      history: [
        {
          date: '2024-02-01',
          event: 'Application Filed',
          summary: 'Application submitted to USPTO.',
          details: 'Standard character mark application for "NOVATECH LOGISTICS".',
          completed: true
        },
        {
          date: '2024-05-20',
          event: 'Publication for Opposition',
          summary: 'Mark published in Official Gazette.',
          details: '30-day opposition period started.',
          completed: false
        }
      ]
    },
    {
      id: 'TM-2024-002',
      contractDate: '2024-02-15',
      consultantName: 'Dr. Marcus Thorne',
      applicantName: 'Aether Labs',
      trademarkDescription: 'Quantum encryption software brand',
      category: 'Class 42',
      applicationDate: '2024-03-01',
      applicationNumber: '019283746',
      status: 'PENDING',
      statusType: 'secondary',
      registrationDate: 'Pending',
      registrationNumber: 'Pending',
      remarks: 'Strategic trademark for the quantum-safe product line.',
      history: [
        {
          date: '2024-03-01',
          event: 'Application Filed',
          summary: 'Application submitted to EUIPO.',
          details: 'European Union Trade Mark application.',
          completed: true
        }
      ]
    },
    {
      id: 'TM-2023-095',
      contractDate: '2023-11-05',
      consultantName: 'Yuki Tanaka',
      applicantName: 'Solari Motors',
      trademarkDescription: 'EV Battery series name "SOLARIPOWER"',
      category: 'Class 12',
      applicationDate: '2023-11-20',
      applicationNumber: '2023-112233',
      status: 'REGISTERED',
      statusType: 'success',
      registrationDate: '2024-03-10',
      registrationNumber: '6789012',
      remarks: 'Core brand for the solid-state battery line.',
      history: [
        {
          date: '2023-11-20',
          event: 'Application Filed',
          summary: 'Application submitted to JPO.',
          details: 'Japanese trademark application.',
          completed: true
        },
        {
          date: '2024-03-10',
          event: 'Registration Issued',
          summary: 'Trademark registered by JPO.',
          details: 'Certificate of registration issued. Valid for 10 years.',
          completed: true
        }
      ]
    }
  ]);

  const [selectedTrademark, setSelectedTrademark] = useState<Trademark | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTrademark, setEditedTrademark] = useState<Trademark | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isNewApplicationModalOpen, setIsNewApplicationModalOpen] = useState(false);
  const [newApplicationForm, setNewApplicationForm] = useState({
    contractSearch: '',
    applicant: '',
    description: '',
    category: '',
    applicationDate: '',
    applicationNumber: '',
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
    if (selectedTrademark) {
      setEditedTrademark({ ...selectedTrademark });
      setIsEditing(true);
    }
  };

  const handleSaveEdit = () => {
    if (editedTrademark) {
      setTrademarks(prev => prev.map(t => t.id === editedTrademark.id ? editedTrademark : t));
      setSelectedTrademark(editedTrademark);
      setIsEditing(false);
      setEditedTrademark(null);
    }
  };

  const handleInputChange = (field: keyof Trademark, value: string) => {
    if (editedTrademark) {
      setEditedTrademark({ ...editedTrademark, [field]: value });
    }
  };

  const handleSaveTransaction = () => {
    if (selectedRowId && transactionForm.date && transactionForm.opinion) {
      setTrademarks(prev => prev.map(t => {
        if (t.id === selectedRowId) {
          const newHistory = [
            ...(t.history || []),
            {
              date: transactionForm.date,
              event: 'Official Opinion Received',
              summary: transactionForm.opinion,
              details: `Deadline: ${transactionForm.deadline || 'N/A'}. Remarks: ${transactionForm.remarks || 'N/A'}`,
              completed: false
            }
          ];
          return { ...t, history: newHistory };
        }
        return t;
      }));
      setIsTransactionModalOpen(false);
      setTransactionForm({ date: '', opinion: '', deadline: '', remarks: '' });
    }
  };

  const handleSaveNewApplication = () => {
    if (newApplicationForm.applicant && newApplicationForm.applicationDate) {
      const newTrademark: Trademark = {
        id: `TM-${new Date().getFullYear()}-${String(trademarks.length + 1).padStart(3, '0')}`,
        contractDate: new Date().toISOString().split('T')[0],
        consultantName: 'System Generated',
        applicantName: newApplicationForm.applicant,
        trademarkDescription: newApplicationForm.description,
        category: newApplicationForm.category,
        applicationDate: newApplicationForm.applicationDate,
        applicationNumber: newApplicationForm.applicationNumber || 'Pending',
        status: 'PENDING',
        statusType: 'secondary',
        registrationDate: 'Pending',
        registrationNumber: 'Pending',
        referenceNumber: newApplicationForm.referenceNumber,
        agentReferenceNumber: newApplicationForm.agentReferenceNumber,
        remarks: newApplicationForm.remarks || `New application for ${newApplicationForm.country || 'Global'}.`,
        history: [
          {
            date: newApplicationForm.applicationDate,
            event: 'Application Filed',
            summary: 'New trademark application submitted.',
            details: `Application for "${newApplicationForm.description}" in ${newApplicationForm.country || 'Global'}.`,
            completed: true
          }
        ]
      };

      setTrademarks(prev => [newTrademark, ...prev]);
      setIsNewApplicationModalOpen(false);
      setNewApplicationForm({
        contractSearch: '',
        applicant: '',
        description: '',
        category: '',
        applicationDate: '',
        applicationNumber: '',
        referenceNumber: '',
        agentReferenceNumber: '',
        remarks: '',
        country: ''
      });
    }
  };

  const toggleHistoryCompletion = (trademarkId: string, historyIndex: number) => {
    setTrademarks(prev => prev.map(t => {
      if (t.id === trademarkId && t.history) {
        const newHistory = [...t.history];
        newHistory[historyIndex] = {
          ...newHistory[historyIndex],
          completed: !newHistory[historyIndex].completed
        };
        
        // Update selectedTrademark if it's the one being modified
        if (selectedTrademark?.id === trademarkId) {
          setSelectedTrademark({ ...t, history: newHistory });
        }
        
        return { ...t, history: newHistory };
      }
      return t;
    }));
  };

  return (
    <div className="p-12 max-w-[1600px] mx-auto space-y-12 text-on-surface">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight mb-2">Trademarks</h2>
          <p className="text-on-surface-variant text-lg max-w-2xl font-body leading-relaxed">Manage and track your global trademark portfolio, including applications, registrations, and brand documentation.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            disabled={!!selectedRowId}
            onClick={() => setIsNewApplicationModalOpen(true)}
            className={cn(
              "px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-sm border border-outline-variant/10",
              !selectedRowId 
                ? "bg-surface-container-high text-on-surface hover:bg-surface-container-highest" 
                : "bg-surface-container-high text-on-surface-variant/30 cursor-not-allowed shadow-none"
            )}
          >
            <Plus className="w-4 h-4" />
            <span>New Trademark Application</span>
          </button>
          <button 
            onClick={() => setIsTransactionModalOpen(true)}
            disabled={!selectedRowId}
            className={cn(
              "px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg",
              selectedRowId 
                ? "bg-primary text-on-primary shadow-primary/20 hover:scale-[0.98]" 
                : "bg-surface-container-high text-on-surface-variant/30 cursor-not-allowed shadow-none"
            )}
          >
            <Plus className="w-4 h-4" />
            <span>Trademark Transaction Input</span>
          </button>
        </div>
      </section>

      {/* Table Controls */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-8 flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-primary text-on-primary rounded-full text-sm font-semibold flex items-center gap-2 shadow-md">
            <span>All Trademarks</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">42</span>
          </button>
          <button className="px-4 py-2 hover:bg-surface-container-low text-on-surface-variant rounded-full text-sm font-medium transition-colors">Pending</button>
          <button className="px-4 py-2 hover:bg-surface-container-low text-on-surface-variant rounded-full text-sm font-medium transition-colors">Registered</button>
          <button className="px-4 py-2 hover:bg-surface-container-low text-on-surface-variant rounded-full text-sm font-medium transition-colors">Published</button>
        </div>
        <div className="md:col-span-4 flex justify-end gap-2">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
            <input 
              type="text" 
              placeholder="Search trademarks..." 
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant/10 rounded-xl text-sm outline-none focus:border-primary/30 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Trademark Table */}
      <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="bg-surface-container-low/50">
              <tr>
                <th className="px-4 py-4 font-headline text-[10px] font-bold text-on-secondary-container uppercase tracking-widest">Contract Date</th>
                <th className="px-4 py-4 font-headline text-[10px] font-bold text-on-secondary-container uppercase tracking-widest">Consultant & Description</th>
                <th className="px-4 py-4 font-headline text-[10px] font-bold text-on-secondary-container uppercase tracking-widest">Applicant</th>
                <th className="px-4 py-4 font-headline text-[10px] font-bold text-on-secondary-container uppercase tracking-widest">Category</th>
                <th className="px-4 py-4 font-headline text-[10px] font-bold text-on-secondary-container uppercase tracking-widest">App Date</th>
                <th className="px-4 py-4 font-headline text-[10px] font-bold text-on-secondary-container uppercase tracking-widest">App Number</th>
                <th className="px-4 py-4 font-headline text-[10px] font-bold text-on-secondary-container uppercase tracking-widest text-center">Status</th>
                <th className="px-4 py-4 font-headline text-[10px] font-bold text-on-secondary-container uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {trademarks.map((tm) => (
                <tr 
                  key={tm.id} 
                  onClick={() => setSelectedRowId(tm.id === selectedRowId ? null : tm.id)}
                  className={cn(
                    "group cursor-pointer transition-colors",
                    selectedRowId === tm.id ? "bg-primary/5 shadow-inner" : "hover:bg-surface-container-low/50"
                  )}
                >
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center",
                        selectedRowId === tm.id ? "border-primary bg-primary" : "border-outline-variant"
                      )}>
                        {selectedRowId === tm.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <p className="text-xs font-bold text-on-surface">{tm.contractDate}</p>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="space-y-1 max-w-[250px]">
                      <p className="text-xs font-bold text-on-surface">{tm.consultantName}</p>
                      <p className="text-[11px] text-on-surface-variant leading-tight">{tm.trademarkDescription}</p>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-xs font-bold text-on-surface">{tm.applicantName}</p>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-xs font-bold text-on-surface">{tm.category}</p>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-xs font-bold text-on-surface">{tm.applicationDate}</p>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-on-surface">{tm.applicationNumber}</span>
                      <ExternalLink className="w-3 h-3 text-primary/50" />
                    </div>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider",
                      tm.statusType === 'tertiary' && "bg-tertiary-container text-on-tertiary-container",
                      tm.statusType === 'secondary' && "bg-secondary-container text-on-secondary-container",
                      tm.statusType === 'success' && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    )}>
                      {tm.status}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTrademark(tm);
                        }}
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
          <p className="text-xs font-medium text-on-surface-variant">Showing <span className="text-on-surface font-bold">{(currentPage - 1) * 20 + 1}-{Math.min(currentPage * 20, 42)}</span> of <span className="text-on-surface font-bold">42</span> trademarks</p>
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
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, 3))}
              disabled={currentPage === 3}
              className="p-1.5 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:bg-white transition-colors border border-outline-variant/10 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedTrademark && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTrademark(null)}
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
                    {showHistory ? 'Official Transaction History' : 'Trademark Details'}
                  </h3>
                  <p className="text-sm text-on-surface-variant mt-1">
                    {showHistory ? `Chronological history for ${selectedTrademark.id}` : `Detailed case information for ${selectedTrademark.id}`}
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
                      setSelectedTrademark(null);
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
                        value={isEditing ? editedTrademark?.applicantName || '' : selectedTrademark.applicantName} 
                        isEditing={isEditing}
                        onChange={(val) => handleInputChange('applicantName', val)}
                      />
                      <DetailItem 
                        icon={<FileText className="w-4 h-4" />} 
                        label="Description" 
                        value={isEditing ? editedTrademark?.trademarkDescription || '' : selectedTrademark.trademarkDescription} 
                        isEditing={isEditing}
                        onChange={(val) => handleInputChange('trademarkDescription', val)}
                      />
                      <DetailItem 
                        icon={<Tag className="w-4 h-4" />} 
                        label="Category" 
                        value={isEditing ? editedTrademark?.category || '' : selectedTrademark.category} 
                        isEditing={isEditing}
                        onChange={(val) => handleInputChange('category', val)}
                      />
                      <DetailItem 
                        icon={<Calendar className="w-4 h-4" />} 
                        label="Contract Date" 
                        value={isEditing ? editedTrademark?.contractDate || '' : selectedTrademark.contractDate} 
                        isEditing={isEditing}
                        onChange={(val) => handleInputChange('contractDate', val)}
                      />
                    </div>
                    <div className="space-y-6">
                      <DetailItem 
                        icon={<Activity className="w-4 h-4" />} 
                        label="Status" 
                        value={isEditing ? editedTrademark?.status || '' : selectedTrademark.status} 
                        isBadge
                        statusType={selectedTrademark.statusType}
                      />
                      <DetailItem 
                        icon={<Hash className="w-4 h-4" />} 
                        label="Application Number" 
                        value={isEditing ? editedTrademark?.applicationNumber || '' : selectedTrademark.applicationNumber} 
                        isEditing={isEditing}
                        onChange={(val) => handleInputChange('applicationNumber', val)}
                      />
                      <DetailItem 
                        icon={<Calendar className="w-4 h-4" />} 
                        label="Application Date" 
                        value={isEditing ? editedTrademark?.applicationDate || '' : selectedTrademark.applicationDate} 
                        isEditing={isEditing}
                        onChange={(val) => handleInputChange('applicationDate', val)}
                      />
                      <DetailItem 
                        icon={<Hash className="w-4 h-4" />} 
                        label="Registration Number" 
                        value={isEditing ? editedTrademark?.registrationNumber || '' : selectedTrademark.registrationNumber || 'N/A'} 
                        isEditing={isEditing}
                        onChange={(val) => handleInputChange('registrationNumber', val)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {selectedTrademark.history?.map((item, idx) => (
                      <div key={idx} className="relative pl-8 border-l-2 border-primary/20 last:border-0 pb-8 last:pb-0">
                        <button 
                          onClick={() => toggleHistoryCompletion(selectedTrademark.id, idx)}
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
                        setEditedTrademark(null);
                      } else {
                        setSelectedTrademark(null);
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
              <div className="p-8 border-b border-outline-variant/10 flex items-center justify-between bg-surface-container-low/30">
                <div>
                  <h3 className="font-headline text-2xl font-bold text-on-surface">New Trademark Application</h3>
                  <p className="text-sm text-on-surface-variant mt-1">Register a new trademark in the system</p>
                </div>
                <button 
                  onClick={() => setIsNewApplicationModalOpen(false)}
                  className="p-2 rounded-full hover:bg-surface-container-high transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Contract Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
                    <input 
                      type="text" 
                      placeholder="Search existing contracts..." 
                      value={newApplicationForm.contractSearch}
                      onChange={(e) => setNewApplicationForm({ ...newApplicationForm, contractSearch: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Applicant</label>
                    <input 
                      type="text" 
                      value={newApplicationForm.applicant}
                      onChange={(e) => setNewApplicationForm({ ...newApplicationForm, applicant: e.target.value })}
                      placeholder="Enter applicant name"
                      className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2 relative">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Country/Region</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={newApplicationForm.country}
                        onChange={(e) => setNewApplicationForm({ ...newApplicationForm, country: e.target.value.toUpperCase() })}
                        placeholder="e.g. US, CN, JP"
                        className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl outline-none focus:border-primary/50 transition-all"
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

                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Trademark Description</label>
                  <textarea 
                    value={newApplicationForm.description}
                    onChange={(e) => setNewApplicationForm({ ...newApplicationForm, description: e.target.value })}
                    placeholder="Describe the trademark (e.g. Logo, Wordmark, Slogan)"
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl outline-none focus:border-primary/50 transition-all min-h-[80px] resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Application Date</label>
                    <input 
                      type="date" 
                      value={newApplicationForm.applicationDate}
                      onChange={(e) => setNewApplicationForm({ ...newApplicationForm, applicationDate: e.target.value })}
                      className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Application Number</label>
                    <input 
                      type="text" 
                      value={newApplicationForm.applicationNumber}
                      onChange={(e) => setNewApplicationForm({ ...newApplicationForm, applicationNumber: e.target.value })}
                      placeholder="Enter application number"
                      className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Category (Classes)</label>
                    <input 
                      type="text" 
                      value={newApplicationForm.category}
                      onChange={(e) => setNewApplicationForm({ ...newApplicationForm, category: e.target.value })}
                      placeholder="e.g. Class 9, 35, 42"
                      className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Reference Number</label>
                    <input 
                      type="text" 
                      value={newApplicationForm.referenceNumber}
                      onChange={(e) => setNewApplicationForm({ ...newApplicationForm, referenceNumber: e.target.value })}
                      placeholder="Enter reference number"
                      className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Agent Reference Number</label>
                    <input 
                      type="text" 
                      value={newApplicationForm.agentReferenceNumber}
                      onChange={(e) => setNewApplicationForm({ ...newApplicationForm, agentReferenceNumber: e.target.value })}
                      placeholder="Enter agent reference number"
                      className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Remarks</label>
                  <textarea 
                    value={newApplicationForm.remarks}
                    onChange={(e) => setNewApplicationForm({ ...newApplicationForm, remarks: e.target.value })}
                    placeholder="Enter remarks..."
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl outline-none focus:border-primary/50 transition-all min-h-[80px] resize-none"
                  />
                </div>
              </div>

              <div className="p-8 bg-surface-container-low/30 border-t border-outline-variant/10 flex items-center justify-end gap-3">
                <button 
                  onClick={() => setIsNewApplicationModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm text-on-surface-variant hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveNewApplication}
                  disabled={!newApplicationForm.applicant || !newApplicationForm.applicationDate}
                  className={cn(
                    "px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all",
                    newApplicationForm.applicant && newApplicationForm.applicationDate
                      ? "bg-primary text-on-primary shadow-primary/20 hover:scale-[0.98]"
                      : "bg-surface-container-high text-on-surface-variant/30 cursor-not-allowed shadow-none"
                  )}
                >
                  Save Application
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
              <div className="p-8 border-b border-outline-variant/10 flex items-center justify-between bg-surface-container-low/30">
                <div>
                  <h3 className="font-headline text-2xl font-bold text-on-surface">Trademark Transaction Input</h3>
                  <p className="text-sm text-on-surface-variant mt-1">Add a new official opinion or event</p>
                </div>
                <button 
                  onClick={() => setIsTransactionModalOpen(false)}
                  className="p-2 rounded-full hover:bg-surface-container-high transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Date</label>
                  <input 
                    type="date" 
                    value={transactionForm.date}
                    onChange={(e) => setTransactionForm({ ...transactionForm, date: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl outline-none focus:border-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Official Opinion</label>
                  <textarea 
                    value={transactionForm.opinion}
                    onChange={(e) => setTransactionForm({ ...transactionForm, opinion: e.target.value })}
                    placeholder="Enter the official opinion or event summary..."
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl outline-none focus:border-primary/50 transition-all min-h-[100px] resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Deadline</label>
                    <input 
                      type="date" 
                      value={transactionForm.deadline}
                      onChange={(e) => setTransactionForm({ ...transactionForm, deadline: e.target.value })}
                      className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Remarks</label>
                    <input 
                      type="text" 
                      value={transactionForm.remarks}
                      onChange={(e) => setTransactionForm({ ...transactionForm, remarks: e.target.value })}
                      placeholder="Optional remarks"
                      className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="p-8 bg-surface-container-low/30 border-t border-outline-variant/10 flex items-center justify-end gap-3">
                <button 
                  onClick={() => setIsTransactionModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm text-on-surface-variant hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveTransaction}
                  className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[0.98] transition-all"
                >
                  Save Transaction
                </button>
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
