import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { Button, Input, Card } from './UI';
import { User } from '../types';
import { Building2, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (user: User) => void;
  onCancel: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const user = await loginUser(email, password);
      onLoginSuccess(user);
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-100 mb-4">
          <Building2 className="w-6 h-6 text-brand-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Partner Portal</h2>
        <p className="text-slate-500 mt-1">Access your leads and assignments</p>
      </div>

      <Card className="w-full max-w-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm flex items-start">
              <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@partner.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-3">
            <Button 
              type="submit" 
              className="w-full" 
              isLoading={isLoading}
            >
              Sign In
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              className="w-full" 
              onClick={onCancel}
            >
              Return Home
            </Button>
          </div>
        </form>
        
        <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
          <p>Demo Login: <span className="font-mono text-slate-600">demo@partner.com</span> / Any password</p>
        </div>
      </Card>
    </div>
  );
};