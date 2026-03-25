import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  ShieldCheck, 
  Copyright, 
  CalendarClock, 
  Settings,
  Plus,
  Gavel
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'contracts', label: 'Contracts', icon: FileText },
    { id: 'reminders', label: 'Reminders', icon: CalendarClock },
    { id: 'patents', label: 'Patents', icon: Gavel },
    { id: 'trademarks', label: 'Trademarks', icon: ShieldCheck },
    { id: 'copyrights', label: 'Copyrights', icon: Copyright },
  ];

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col p-4 gap-4 bg-surface-container-low dark:bg-slate-900 w-64 z-40 border-r border-outline-variant/10">
      <div className="flex items-center gap-3 px-2 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-on-primary shadow-lg shadow-primary/20">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-headline font-bold text-primary dark:text-blue-50 text-base leading-tight">IP Portfolio</h2>
          <p className="text-[10px] uppercase tracking-widest text-on-secondary-container font-semibold">Legal Authority</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ease-in-out",
              activeTab === item.id 
                ? "bg-surface-container-lowest text-primary shadow-sm font-semibold" 
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container-high"
            )}
          >
            <item.icon className={cn("w-5 h-5", activeTab === item.id && "fill-primary/10")} />
            <span className="font-body text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-1 pt-4 border-t border-outline-variant/10">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ease-in-out",
              activeTab === item.id 
                ? "bg-surface-container-lowest text-primary shadow-sm font-semibold" 
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container-high"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-body text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
