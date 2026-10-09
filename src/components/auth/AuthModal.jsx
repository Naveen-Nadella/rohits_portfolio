import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { soundEngine } from '../../utils/audio';
import { X, Lock, Mail, User, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authMode,
    setAuthMode,
    login,
    signup,
    demoLogin
  } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    if (authMode === 'signup') {
      if (!formData.name.trim()) {
        setErrorMsg('Please enter your full name.');
        setIsSubmitting(false);
        return;
      }
      if (!formData.email.trim()) {
        setErrorMsg('Please enter a valid email.');
        setIsSubmitting(false);
        return;
      }
      if (!formData.password || formData.password.length < 6) {
        setErrorMsg('Password must be at least 6 characters.');
        setIsSubmitting(false);
        return;
      }

      const res = signup(formData.name, formData.email, formData.password);
      if (res.success) {
        soundEngine.playChime(660, 0.8);
      } else {
        setErrorMsg(res.error || 'Failed to sign up.');
      }
    } else {
      if (!formData.email.trim()) {
        setErrorMsg('Please enter your email.');
        setIsSubmitting(false);
        return;
      }
      if (!formData.password) {
        setErrorMsg('Please enter your password.');
        setIsSubmitting(false);
        return;
      }

      const res = login(formData.email, formData.password);
      if (res.success) {
        soundEngine.playChime(660, 0.8);
      } else {
        setErrorMsg(res.error || 'Failed to log in.');
      }
    }

    setIsSubmitting(false);
  };

  const handleDemoAccess = () => {
    soundEngine.playChime(660, 0.8);
    demoLogin();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeAuthModal}
    >
      <div
        className="bg-white border border-zinc-300 w-full max-w-md rounded-sm shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Thread */}
        <div className="h-1 bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900" />

        {/* Header */}
        <div className="p-6 border-b border-zinc-200 bg-[#F8F8F6] relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-1.5 text-zinc-400 hover:text-zinc-900 rounded-sm transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-zinc-900 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
              AUTHENTICATION GATEWAY
            </span>
          </div>

          <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 uppercase">
            {authMode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
          </h2>
          <p className="font-serif text-xs text-zinc-500 mt-1">
            {authMode === 'signup'
              ? 'Sign up to unlock bespoke portfolio templates and generate your unique Portfolio ID.'
              : 'Log in to manage your portfolios or generate a new showcase.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-zinc-200 bg-zinc-100/60 p-1">
          <button
            type="button"
            onClick={() => {
              setAuthMode('signup');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-xs font-serif font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
              authMode === 'signup'
                ? 'bg-white text-zinc-900 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-xs font-serif font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
              authMode === 'login'
                ? 'bg-white text-zinc-900 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono rounded-sm flex items-start gap-2">
            <AlertCircle size={14} className="text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {authMode === 'signup' && (
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-zinc-700 mb-1">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User size={15} className="absolute left-3 text-zinc-400 pointer-events-none" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-300 focus:border-zinc-900 rounded-sm text-sm font-serif text-zinc-900 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-zinc-700 mb-1">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail size={15} className="absolute left-3 text-zinc-400 pointer-events-none" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
                className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-300 focus:border-zinc-900 rounded-sm text-sm font-mono text-zinc-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-zinc-700 mb-1">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock size={15} className="absolute left-3 text-zinc-400 pointer-events-none" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-300 focus:border-zinc-900 rounded-sm text-sm font-mono text-zinc-900 focus:outline-none"
              />
            </div>
            {authMode === 'signup' && (
              <span className="text-[10px] font-mono text-zinc-400 mt-1 block">
                Minimum 6 characters
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 bg-zinc-900 hover:bg-black text-white font-serif text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>{authMode === 'signup' ? 'CONTINUE TO TEMPLATES' : 'LOG IN & CONTINUE'}</span>
            <ArrowRight size={14} />
          </button>

          {/* Quick Demo Bypass */}
          <div className="pt-3 border-t border-zinc-200">
            <button
              type="button"
              onClick={handleDemoAccess}
              className="w-full py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-serif text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer border border-zinc-300"
            >
              <Sparkles size={13} className="text-zinc-900" />
              <span>1-Click Instant Demo Login</span>
            </button>
            <span className="text-[10px] font-mono text-zinc-500 text-center block mt-1.5">
              Bypass form for instant evaluation without credentials
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
