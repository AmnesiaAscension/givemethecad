
import React, { useState } from 'react';
import { Button, Input, Card } from './UI';
import { PartnerApplicationData } from '../types';
import { submitPartnerApplication } from '../services/api';
import { CheckCircle, Briefcase, Map, Building2, ChevronLeft } from 'lucide-react';

interface PartnerApplicationProps {
  onCancel: () => void;
}

export const PartnerApplication: React.FC<PartnerApplicationProps> = ({ onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState<PartnerApplicationData>({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    role: 'Investor',
    serviceAreas: '',
    leadTypes: [],
    notes: ''
  });

  const handleChange = (field: keyof PartnerApplicationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleLeadType = (type: string) => {
    setFormData(prev => {
      const types = prev.leadTypes.includes(type)
        ? prev.leadTypes.filter(t => t !== type)
        : [...prev.leadTypes, type];
      return { ...prev, leadTypes: types };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitPartnerApplication(formData);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 animate-fade-in">
        <Card className="w-full max-w-lg p-10 text-center border-t-8 border-t-brand-600">
          <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-brand-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Received</h2>
          <p className="text-slate-600 mb-8 text-lg">
            Thanks for your interest in joining the GiveMeTheCAD network. Our team will review your service area and criteria and reach out shortly.
          </p>
          <Button onClick={onCancel} variant="outline" className="w-full">
            Return Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Button variant="ghost" onClick={onCancel} className="mb-6 pl-0 hover:bg-transparent hover:text-brand-600">
        <ChevronLeft className="w-4 h-4 mr-2" /> Back to Home
      </Button>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Join the Partner Network</h1>
        <p className="mt-4 text-lg text-slate-600">
          Receive pre-qualified leads with anchored CAD data directly to your inbox or CRM.
        </p>
      </div>

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-slate-900 font-semibold border-b pb-2">
              <Building2 className="w-5 h-5 text-brand-500" />
              <h3>Business Profile</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Full Name" 
                placeholder="John Doe" 
                required 
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
              />
              <Input 
                label="Company Name" 
                placeholder="Acme Realty / Investments" 
                required 
                value={formData.companyName}
                onChange={e => handleChange('companyName', e.target.value)}
              />
              <Input 
                label="Email Address" 
                type="email" 
                placeholder="john@example.com" 
                required 
                value={formData.email}
                onChange={e => handleChange('email', e.target.value)}
              />
              <Input 
                label="Phone Number" 
                type="tel" 
                placeholder="(555) 123-4567" 
                required 
                value={formData.phone}
                onChange={e => handleChange('phone', e.target.value)}
              />
            </div>
          </div>

          {/* Section 2: Role & Criteria */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-slate-900 font-semibold border-b pb-2">
              <Briefcase className="w-5 h-5 text-brand-500" />
              <h3>Role & Preferences</h3>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Primary Role</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Investor', 'Agent', 'Tax Protest Firm'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleChange('role', role)}
                    className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                      formData.role === role 
                        ? 'bg-brand-50 border-brand-500 text-brand-700 ring-1 ring-brand-500' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                    label="Service Areas (Counties or ZIPs)"
                    placeholder="Harris County, 77002, 77494..."
                    required
                    value={formData.serviceAreas}
                    onChange={e => handleChange('serviceAreas', e.target.value)}
                />
                
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Lead Types Wanted</label>
                    <div className="space-y-2">
                        {['Cash Offer / Distress', 'Listing / Retail', 'Tax Protest Only'].map((type) => (
                            <label key={type} className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-slate-50 border border-transparent hover:border-slate-100">
                                <input 
                                    type="checkbox"
                                    checked={formData.leadTypes.includes(type)}
                                    onChange={() => toggleLeadType(type)}
                                    className="w-4 h-4 text-brand-600 rounded border-gray-300 focus:ring-brand-500"
                                />
                                <span className="text-sm text-slate-700">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Buy Box / Notes</label>
                <textarea 
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    rows={3}
                    placeholder="Tell us about your criteria (price range, condition, etc.) or any specific needs..."
                    value={formData.notes}
                    onChange={e => handleChange('notes', e.target.value)}
                />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button type="submit" isLoading={isSubmitting} className="w-full sm:w-auto">
              Submit Application
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
