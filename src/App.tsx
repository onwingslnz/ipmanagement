/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlusCircle } from 'lucide-react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './components/Dashboard';
import Clients from './components/Clients';
import Patents from './components/Patents';
import Trademarks from './components/Trademarks';
import Contracts from './components/Contracts';
import ContractModal from './components/ContractModal';

type View = 'login' | 'dashboard' | 'clients' | 'contracts' | 'patents' | 'trademarks' | 'copyrights' | 'reminders' | 'settings';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('login');
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);

  const handleLogin = () => {
    setCurrentView('dashboard');
  };

  if (currentView === 'login') {
    return (
      <div className="min-h-screen flex flex-col bg-surface">
        <main className="flex-grow">
          <Login onLogin={handleLogin} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-surface text-on-surface">
      <Sidebar activeTab={currentView} onTabChange={(tab) => setCurrentView(tab as View)} />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen relative">
        <TopBar />
        
        <main className="flex-grow pt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentView === 'dashboard' && <Dashboard />}
              {currentView === 'clients' && <Clients />}
              {currentView === 'contracts' && <Contracts />}
              {currentView === 'patents' && <Patents />}
              {currentView === 'trademarks' && <Trademarks />}
              {['copyrights', 'reminders', 'settings'].includes(currentView) && (
                <div className="p-12 flex flex-col items-center justify-center h-[60vh] text-on-surface-variant">
                  <h2 className="text-2xl font-headline font-bold mb-2 capitalize">{currentView}</h2>
                  <p>This view is currently under development.</p>
                  <button 
                    onClick={() => setCurrentView('dashboard')}
                    className="mt-6 text-primary font-bold hover:underline"
                  >
                    Return to Dashboard
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
      </div>

      <ContractModal 
        isOpen={isContractModalOpen} 
        onClose={() => setIsContractModalOpen(false)} 
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full py-8 border-t border-outline-variant/10 bg-surface-container-low/50">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 w-full max-w-7xl mx-auto gap-4">
        <div className="font-body text-[10px] tracking-widest uppercase font-bold text-on-surface-variant/60">
          © 2024 Lex Guardian IP Management. All rights reserved.
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {['Privacy Policy', 'Terms of Service', 'Security Architecture', 'Contact Support'].map((link) => (
            <a 
              key={link}
              className="font-body text-[10px] tracking-widest uppercase font-bold text-on-surface-variant/50 hover:text-primary transition-colors cursor-pointer" 
              href="#"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
