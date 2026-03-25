import React from 'react';
import { 
  Filter, 
  FileDown, 
  TrendingUp, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const stats = [
    { label: 'Total Active', value: '142', change: '+12%', type: 'primary', icon: TrendingUp },
    { label: 'Overdue', value: '03', change: 'Critical Priority', type: 'error', icon: AlertCircle },
    { label: 'Pending (7 days)', value: '08', change: 'Immediate Action', type: 'secondary', icon: Clock },
    { label: 'Completed', value: '29', change: 'This Month', type: 'tertiary', icon: CheckCircle2 },
  ];

  const notifications = [
    { id: 'PAT-2023-0091', subject: 'Neural Interface Processing Unit', date: 'Nov 12, 2023', deadline: 'Apr 15, 2024', status: 'Overdue', statusType: 'error' },
    { id: 'TM-US-2024-884', subject: 'Sovereign Core Branding', date: 'Jan 22, 2024', deadline: 'Apr 22, 2024', status: 'Pending', statusType: 'secondary' },
    { id: 'CPY-GLO-2024-11', subject: 'Distributed Ledger Protocol v4', date: 'Mar 01, 2024', deadline: 'May 30, 2024', status: 'Pending', statusType: 'secondary' },
    { id: 'PAT-2023-0044', subject: 'Biometric Security Enclave', date: 'Dec 05, 2023', deadline: 'Mar 05, 2024', status: 'Completed', statusType: 'tertiary' },
  ];

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-10">
      {/* Hero Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">Deadlines Tracker</h2>
          <p className="text-on-surface-variant font-body font-medium">Monitoring 24 upcoming official notifications and regulatory milestones.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-surface-container-highest text-on-primary-fixed-variant rounded-xl font-semibold text-sm flex items-center gap-2 transition-all active:scale-95 hover:bg-surface-container-high shadow-sm">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="px-5 py-2.5 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95 hover:opacity-90">
            <FileDown className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              "p-6 rounded-2xl shadow-sm border flex flex-col justify-between h-32",
              stat.type === 'primary' && "bg-surface-container-lowest border-outline-variant/15",
              stat.type === 'error' && "bg-error-container border-error/10",
              stat.type === 'secondary' && "bg-secondary-container border-secondary/10",
              stat.type === 'tertiary' && "bg-tertiary-container border-tertiary/10"
            )}
          >
            <span className={cn(
              "text-xs font-bold uppercase tracking-wider",
              stat.type === 'primary' ? "text-on-surface-variant" : `text-on-${stat.type}-container`
            )}>{stat.label}</span>
            <div className="flex items-baseline gap-2">
              <span className={cn(
                "text-4xl font-headline font-bold",
                stat.type === 'primary' ? "text-primary" : `text-on-${stat.type}-container`
              )}>{stat.value}</span>
              <span className={cn(
                "text-xs font-bold flex items-center gap-0.5",
                stat.type === 'primary' ? "text-on-tertiary-container" : `text-on-${stat.type}-container/60`
              )}>
                {stat.type === 'primary' && <TrendingUp className="w-3 h-3" />} {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Urgent Timeline Banner */}
      <section className="bg-surface-container-low rounded-2xl p-1 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-6 p-8 bg-surface-container-lowest rounded-xl border border-outline-variant/15 shadow-sm">
          <div className="lg:w-1/3 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error-container text-on-error-container text-[10px] font-bold uppercase tracking-widest">
              <AlertTriangle className="w-3 h-3" />
              Critical Focus
            </div>
            <h3 className="text-2xl font-headline font-bold text-primary leading-tight">USPTO Office Action: Serial #90-142,884</h3>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed">
              Final response deadline approaching for the 'Sovereign Core' trademark application. Lack of response will result in automatic abandonment.
            </p>
            <div className="pt-4 flex items-center gap-4">
              <div className="text-center">
                <p className="text-[10px] uppercase text-on-surface-variant font-bold">Days Left</p>
                <p className="text-2xl font-headline font-extrabold text-error">02</p>
              </div>
              <div className="h-10 w-px bg-outline-variant/30"></div>
              <button className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-container transition-all shadow-lg active:scale-95">Take Action Now</button>
            </div>
          </div>
          <div className="lg:w-2/3 bg-surface-container-low rounded-xl p-6 relative flex items-center">
            {/* Timeline Representation */}
            <div className="relative w-full h-24">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-outline-variant/40 -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-0 w-4/5 h-0.5 bg-primary -translate-y-1/2"></div>
              
              {[
                { label: 'JAN 15', pos: '0%', active: true },
                { label: 'FEB 20', pos: '25%', active: true },
                { label: 'MAR 10', pos: '50%', active: true },
                { label: 'APR 22', pos: '80%', active: true, critical: true },
                { label: 'JULY 01', pos: '100%', active: false },
              ].map((point) => (
                <div 
                  key={point.label}
                  className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
                  style={{ left: point.pos }}
                >
                  <div className={cn(
                    "rounded-full mb-2 transition-all",
                    point.critical ? "w-5 h-5 bg-error border-4 border-surface shadow-md" : "w-3 h-3",
                    point.active && !point.critical ? "bg-primary" : (!point.active ? "bg-outline-variant" : "")
                  )}></div>
                  <span className={cn(
                    "text-[10px] font-bold",
                    point.critical ? "text-error font-extrabold" : "text-on-surface-variant"
                  )}>{point.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deadlines Table */}
      <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/15 overflow-hidden">
        <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
          <h3 className="font-headline font-bold text-lg text-primary">All Notifications</h3>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {['JS', 'RB', '+3'].map((u, i) => (
                <div key={i} className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-surface shadow-sm",
                  i === 0 && "bg-tertiary-fixed text-on-tertiary-fixed",
                  i === 1 && "bg-secondary-fixed text-on-secondary-fixed",
                  i === 2 && "bg-primary-fixed text-on-primary-fixed"
                )}>{u}</div>
              ))}
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label text-[11px] font-bold uppercase tracking-widest">
                <th className="px-8 py-4">Case Number</th>
                <th className="px-8 py-4">Subject / Entity</th>
                <th className="px-8 py-4">Notification Date</th>
                <th className="px-8 py-4">Official Deadline</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {notifications.map((item) => (
                <tr key={item.id} className={cn(
                  "hover:bg-surface-container-low transition-colors group",
                  item.status === 'Completed' && "opacity-60"
                )}>
                  <td className="px-8 py-5 font-headline font-bold text-sm text-primary">{item.id}</td>
                  <td className={cn(
                    "px-8 py-5 font-body text-sm text-on-surface",
                    item.status === 'Completed' && "line-through"
                  )}>{item.subject}</td>
                  <td className="px-8 py-5 font-body text-sm text-on-surface-variant">{item.date}</td>
                  <td className={cn(
                    "px-8 py-5 font-headline font-bold text-sm",
                    item.statusType === 'error' ? "text-error" : 
                    item.statusType === 'secondary' && item.id === 'TM-US-2024-884' ? "text-secondary-container bg-primary-container px-2 py-1 rounded w-max" : "text-on-surface"
                  )}>{item.deadline}</td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold",
                      item.statusType === 'error' && "bg-error-container text-on-error-container",
                      item.statusType === 'secondary' && "bg-secondary-container text-on-secondary-container",
                      item.statusType === 'tertiary' && "bg-tertiary-container text-on-tertiary-container"
                    )}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <button className="text-on-surface-variant hover:text-primary transition-colors">
                      {item.status === 'Completed' ? <CheckCircle2 className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-surface-container-low border-t border-outline-variant/10 flex justify-between items-center px-8">
          <span className="text-xs font-medium text-on-surface-variant">Showing 1-10 of 142 results</span>
          <div className="flex gap-2">
            <button className="p-1.5 rounded-lg border border-outline-variant/30 hover:bg-surface-container-lowest transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-lg border border-outline-variant/30 hover:bg-surface-container-lowest transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
