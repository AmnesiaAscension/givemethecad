import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  isLoading, 
  disabled,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-600/20 focus:ring-brand-500",
    secondary: "bg-accent-500 hover:bg-accent-600 text-white shadow-lg shadow-accent-500/20 focus:ring-accent-500",
    outline: "border-2 border-slate-200 hover:border-brand-600 hover:text-brand-600 text-slate-600 bg-white",
    ghost: "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
  };

  const sizes = "px-6 py-3 text-base";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>}
      <input 
        className={`w-full px-4 py-3 rounded-lg border bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors ${error ? 'border-red-500' : 'border-slate-300'} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; color?: 'green' | 'blue' | 'yellow' }> = ({ children, color = 'blue' }) => {
  const colors = {
    green: 'bg-emerald-100 text-emerald-800',
    blue: 'bg-blue-100 text-blue-800',
    yellow: 'bg-amber-100 text-amber-800',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
};