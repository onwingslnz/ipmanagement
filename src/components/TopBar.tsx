import React, { useState } from 'react';
import { Search, Bell, HelpCircle, Globe, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TopBar() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');

  const languages = [
    { name: 'English', code: 'en' },
    { name: '简体中文', code: 'zh-CN' },
    { name: '繁體中文', code: 'zh-TW' },
  ];

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center w-full px-12 h-20 bg-surface/80 backdrop-blur-xl shadow-sm border-b border-outline-variant/10">
      <div className="flex items-center gap-12 flex-1">
        <h1 className="font-headline text-xl font-bold tracking-tight text-primary shrink-0">Sovereign Ledger</h1>
      </div>

      <div className="flex items-center gap-4 ml-8">
        <div className="relative">
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-surface-container-high transition-colors text-on-surface-variant font-medium text-sm"
          >
            <Globe className="w-5 h-5" />
            <span>{currentLang}</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform", isLangOpen && "rotate-180")} />
          </button>

          {isLangOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsLangOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-40 bg-surface-container-lowest border border-outline-variant/10 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in duration-200">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.name);
                      setIsLangOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm text-on-surface hover:bg-surface-container-low transition-colors"
                  >
                    <span>{lang.name}</span>
                    {currentLang === lang.name && <Check className="w-4 h-4 text-primary" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        
        <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant">
          <Bell className="w-5 h-5" />
        </button>
        
        <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant">
          <HelpCircle className="w-5 h-5" />
        </button>
        
        <div className="h-8 w-[1px] bg-outline-variant/20 mx-2"></div>
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-on-surface">Alex Mercer</p>
            <p className="text-[10px] text-on-surface-variant font-medium">Senior IP Counsel</p>
          </div>
          <img 
            alt="User profile" 
            className="w-10 h-10 rounded-full object-cover border-2 border-surface-container-highest" 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}
