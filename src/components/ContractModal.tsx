import React from 'react';
import { X, ShieldCheck, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContractModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContractModal({ isOpen, onClose }: ContractModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/40 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-surface-container-lowest w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative z-10 border border-outline-variant/10"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-surface-container-lowest/95 backdrop-blur px-8 py-6 border-b border-outline-variant/10 flex justify-between items-center z-10">
              <div>
                <h3 className="font-headline font-extrabold text-2xl text-primary">Contract Details</h3>
                <p className="text-on-surface-variant text-sm font-medium">Editing: Master IP Assignment LG-2023-8842</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Contract No.</label>
                      <input 
                        className="bg-surface-container-low border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary w-full font-medium" 
                        readOnly 
                        type="text" 
                        value="LG-2023-8842" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Reference No.</label>
                      <input 
                        className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary w-full" 
                        placeholder="REF-XYZ-001" 
                        type="text" 
                        defaultValue="REF-XYZ-001"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Consultant Name</label>
                      <input 
                        className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary w-full" 
                        type="text" 
                        defaultValue="Alistair Montgomery" 
                      />
                    </div>
                  </div>

                  {/* Middle Column */}
                  <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Contract Date</label>
                      <input 
                        className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary w-full" 
                        type="date" 
                        defaultValue="2023-10-24" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Signed Date</label>
                      <input 
                        className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary w-full" 
                        type="date" 
                        defaultValue="2023-10-26" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Payment Date</label>
                      <input 
                        className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary w-full" 
                        type="date" 
                        defaultValue="2023-11-15" 
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Fees (USD)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">$</span>
                        <input 
                          className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-3 pl-8 text-sm focus:ring-2 focus:ring-primary w-full font-mono font-bold" 
                          type="text" 
                          defaultValue="12,500.00" 
                        />
                      </div>
                    </div>
                    <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10">
                      <p className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant mb-2">Ledger Verification</p>
                      <div className="flex items-center gap-2 text-on-tertiary-container">
                        <ShieldCheck className="w-5 h-5 fill-on-tertiary-container/10" />
                        <span className="text-xs font-bold">SHA-256 Validated</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Full Width */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Contract Content</label>
                    <textarea 
                      className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary w-full resize-none font-body leading-relaxed" 
                      rows={6}
                      defaultValue="This agreement outlines the transfer of intellectual property rights for the project 'Sovereign Ledger' from Alistair Montgomery to Lex Guardian. All designs, codebases, and patent-pending methodologies developed during the fiscal period Q3-2023 are included."
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Contract Remarks</label>
                    <textarea 
                      className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary w-full resize-none font-body leading-relaxed" 
                      rows={6}
                      defaultValue="Standard assignment clauses applied. Legal review completed by J. Vance. No immediate royalty obligations until product launch."
                    />
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="pt-6 flex justify-between items-center border-t border-outline-variant/10">
                  <button 
                    className="text-error font-headline font-bold flex items-center gap-2 hover:bg-error-container/20 px-4 py-2 rounded-xl transition-all active:scale-95" 
                    type="button"
                  >
                    <Trash2 className="w-5 h-5" />
                    Revoke Agreement
                  </button>
                  <div className="flex gap-4">
                    <button 
                      onClick={onClose}
                      className="px-6 py-3 border border-outline-variant/20 rounded-xl font-headline font-bold text-on-surface-variant hover:bg-surface-container-low transition-all active:scale-95" 
                      type="button"
                    >
                      Cancel
                    </button>
                    <button 
                      className="px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl font-headline font-bold shadow-lg hover:shadow-primary/30 transition-all active:scale-95" 
                      type="button"
                    >
                      Update Ledger
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
