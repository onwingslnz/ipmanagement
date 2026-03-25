import React, { useState } from 'react';
import { ShieldAlert, User, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Abstract Decoration */}
      <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-secondary-container/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[35rem] h-[35rem] bg-tertiary-container/10 rounded-full blur-[100px] -z-10"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] z-10"
      >
        <div className="bg-surface-container-lowest rounded-2xl shadow-[0_24px_48px_-12px_rgba(25,28,30,0.08)] overflow-hidden border border-outline-variant/10">
          {/* Card Header */}
          <div className="pt-12 pb-8 px-10 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-2xl mb-6 shadow-lg shadow-primary/20">
              <ShieldAlert className="text-on-primary w-8 h-8" />
            </div>
            <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface mb-2">Lex Guardian</h1>
            <p className="font-body text-on-surface-variant text-sm tracking-wide">Secure IP Ledger Access</p>
          </div>

          {/* Form Section */}
          <form 
            className="px-10 pb-12 space-y-6"
            onSubmit={(e) => { e.preventDefault(); onLogin(); }}
          >
            <div className="space-y-2">
              <label className="font-label text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />
                </div>
                <input 
                  className="block w-full pl-11 pr-4 py-3.5 bg-surface-container-low border-transparent outline outline-1 outline-outline-variant/15 rounded-xl focus:ring-0 focus:outline-primary focus:bg-surface-container-lowest transition-all duration-200 text-on-surface font-medium" 
                  placeholder="Enter your credentials" 
                  type="text"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="font-label text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Password</label>
                <a className="text-xs font-bold text-primary hover:text-primary/80 transition-colors" href="#">Forgot Password?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />
                </div>
                <input 
                  className="block w-full pl-11 pr-12 py-3.5 bg-surface-container-low border-transparent outline outline-1 outline-outline-variant/15 rounded-xl focus:ring-0 focus:outline-primary focus:bg-surface-container-lowest transition-all duration-200 text-on-surface font-medium" 
                  placeholder="••••••••" 
                  type={showPassword ? "text" : "password"}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-on-surface-variant transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-3 ml-1">
              <input 
                className="w-5 h-5 rounded border-outline-variant/30 text-primary focus:ring-primary focus:ring-offset-surface-container-lowest transition-all cursor-pointer" 
                id="remember" 
                type="checkbox"
              />
              <label className="text-sm font-medium text-on-surface-variant cursor-pointer select-none" htmlFor="remember">Keep me logged in</label>
            </div>

            <div className="pt-4">
              <button 
                className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold text-base rounded-xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3" 
                type="submit"
              >
                Sign In
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Status Footer */}
          <div className="bg-surface-container-low px-10 py-5 flex items-center justify-center gap-2 border-t border-outline-variant/10">
            <div className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></div>
            <span className="text-[10px] font-label font-bold uppercase tracking-widest text-on-tertiary-container">System Status: All Services Operational</span>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-on-surface-variant">
          Don't have an authorized account? 
          <a className="font-bold text-primary hover:underline underline-offset-4 decoration-2 ml-1" href="#">Contact Admin</a>
        </p>
      </motion.div>
    </div>
  );
}
