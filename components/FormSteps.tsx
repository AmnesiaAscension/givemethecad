
import React, { useState, useEffect } from 'react';
import { StepProps, Condition, Goal, PropertyType, CADData } from '../types';
import { Button, Input, Card, Badge } from './UI';
import { CheckCircle, Home, AlertCircle, TrendingUp, DollarSign, ShieldAlert, Gavel, FileText, Hammer, Edit2, Save, Database, AlertTriangle } from 'lucide-react';

// --- Step 1: CAD Confirmation ---
export const CADConfirmationStep: React.FC<StepProps> = ({ data, updateData, onNext, isLoading }) => {
  // Local state for editing mode
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState<Partial<CADData>>({});

  useEffect(() => {
    // If no CAD data found (null), automatically enter edit mode
    if (!isLoading && !data.cadData && !isEditing) {
       setIsEditing(true);
       setEditValues({
         marketValue: 0,
         sqFt: 0,
         yearBuilt: 0,
         county: '',
         source: 'User Provided'
       });
    }
  }, [isLoading, data.cadData]);

  const handleSaveEdit = () => {
    // Merge existing CAD data with edits
    const newData = {
        ...data.cadData,
        ...editValues,
        source: 'User Provided' as const
    } as CADData;
    
    updateData({ cadData: newData });
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="relative">
            <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
        </div>
        <p className="text-slate-600 font-medium animate-pulse">Searching County Appraisal Records...</p>
        <p className="text-xs text-slate-400">Connecting to Tax Assessor Database...</p>
      </div>
    );
  }

  // Helper to render source badge
  const renderSourceBadge = () => {
     const source = data.cadData?.source || 'Estimate';
     
     if (source === 'Official CAD') {
         return (
            <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200">
                <Database className="w-3 h-3" />
                <span>Verified: {data.cadData?.county} CAD ({data.cadData?.taxYear})</span>
            </div>
         );
     }
     if (source === 'Data Partner') {
        return (
           <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200">
               <Database className="w-3 h-3" />
               <span>Source: National Property Data</span>
           </div>
        );
    }
    return (
        <div className="flex items-center space-x-2 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold border border-amber-200">
            <AlertTriangle className="w-3 h-3" />
            <span>{source === 'User Provided' ? 'User Provided' : 'Estimated Value'}</span>
        </div>
     );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">
            {isEditing ? "Enter Property Details" : "We Found Your Record"}
        </h2>
        <p className="text-slate-500">
            {isEditing ? "Please provide the info from your latest tax statement." : "Based on public county data"}
        </p>
      </div>

      <Card className={`border-brand-200 transition-all ${isEditing ? 'bg-white' : 'bg-slate-50'}`}>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-4">
            <div className="w-full">
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Assessed Market Value</p>
              {isEditing ? (
                  <div className="relative max-w-xs">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                      <input 
                        type="number" 
                        className="pl-8 w-full px-4 py-2 text-2xl font-bold rounded border border-slate-300 focus:ring-2 focus:ring-brand-500"
                        defaultValue={data.cadData?.marketValue}
                        onChange={(e) => setEditValues(prev => ({ ...prev, marketValue: Number(e.target.value) }))}
                        placeholder="250000"
                      />
                  </div>
              ) : (
                <h3 className="text-4xl font-extrabold text-brand-900">
                    ${data.cadData?.marketValue?.toLocaleString() || '---'}
                </h3>
              )}
            </div>
            
            {!isEditing && renderSourceBadge()}
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 border-t border-slate-200 pt-4">
            <div>
              <span className="block text-slate-400 text-xs">Year Built</span>
              {isEditing ? (
                  <input 
                    type="number"
                    className="w-full mt-1 px-2 py-1 rounded border border-slate-300 text-sm"
                    defaultValue={data.cadData?.yearBuilt}
                    onChange={(e) => setEditValues(prev => ({ ...prev, yearBuilt: Number(e.target.value) }))}
                  />
              ) : (
                  <span className="font-medium">{data.cadData?.yearBuilt || 'N/A'}</span>
              )}
            </div>
            <div>
              <span className="block text-slate-400 text-xs">Sq Ft</span>
              {isEditing ? (
                  <input 
                    type="number"
                    className="w-full mt-1 px-2 py-1 rounded border border-slate-300 text-sm"
                    defaultValue={data.cadData?.sqFt}
                    onChange={(e) => setEditValues(prev => ({ ...prev, sqFt: Number(e.target.value) }))}
                  />
              ) : (
                  <span className="font-medium">{data.cadData?.sqFt?.toLocaleString() || 'N/A'}</span>
              )}
            </div>
            <div>
              <span className="block text-slate-400 text-xs">Lot Size</span>
              <span className="font-medium">{data.cadData?.lotSize || 'N/A'}</span>
            </div>
             <div>
              <span className="block text-slate-400 text-xs">County</span>
              <span className="font-medium">{data.cadData?.county || 'Unknown'}</span>
            </div>
          </div>
        </div>
      </Card>
      
      {!isEditing && (
          <div className="flex justify-center">
            <button 
                onClick={() => {
                    setIsEditing(true);
                    setEditValues(data.cadData || {});
                }}
                className="text-xs text-brand-600 hover:text-brand-800 flex items-center underline"
            >
                <Edit2 className="w-3 h-3 mr-1" />
                Data incorrect? Edit manually
            </button>
          </div>
      )}

      {isEditing ? (
          <div className="space-y-3 pt-4">
             <Button onClick={handleSaveEdit} className="w-full flex items-center justify-center">
                 <Save className="w-4 h-4 mr-2" /> Save & Continue
             </Button>
          </div>
      ) : (
        <div className="space-y-3 pt-4">
            <label className="block text-sm font-medium text-slate-700">Property Type</label>
            <div className="grid grid-cols-3 gap-3">
            {Object.values(PropertyType).map((type) => (
                <button
                key={type}
                onClick={() => updateData({ propertyType: type })} 
                className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                    data.propertyType === type 
                    ? 'bg-brand-50 border-brand-500 text-brand-700 font-medium ring-1 ring-brand-500' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
                >
                {type}
                </button>
            ))}
            </div>

            <div className="flex justify-between items-center pt-4">
                <p className="text-xs text-slate-400 italic">Values used for offer baseline.</p>
                <Button onClick={onNext}>
                    This looks right <TrendingUp className="w-4 h-4 ml-2"/>
                </Button>
            </div>
        </div>
      )}
    </div>
  );
};


// --- Step 2: Condition & Upgrades ---
export const ConditionStep: React.FC<StepProps> = ({ data, updateData, onNext, onBack }) => {
  const isDistressed = data.condition === Condition.NEEDS_WORK || data.condition === Condition.MAJOR_ISSUES;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Be Honest. We Can Handle It.</h2>
        <p className="text-slate-500">We love renovation projects. The condition affects the offer, but not our interest.</p>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-slate-700">How's the condition?</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { val: Condition.GREAT, label: "Great", desc: "Renovated, move-in ready." },
            { val: Condition.GOOD, label: "Good", desc: "Well kept, outdated finishes." },
            { val: Condition.NEEDS_WORK, label: "Needs Work", desc: "Repairs, paint, flooring needed." },
            { val: Condition.MAJOR_ISSUES, label: "Major Issues", desc: "Foundation, roof, or total gut job." }
          ].map((opt) => (
            <button
              key={opt.val}
              onClick={() => updateData({ condition: opt.val })}
              className={`p-4 rounded-lg border text-left transition-all ${
                data.condition === opt.val
                  ? 'bg-brand-50 border-brand-500 ring-1 ring-brand-500'
                  : 'bg-white border-slate-200 hover:border-brand-300'
              }`}
            >
              <div className="font-semibold text-slate-900">{opt.label}</div>
              <div className="text-xs text-slate-500 mt-1">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {isDistressed && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg flex items-start animate-fade-in">
            <div className="p-2 bg-emerald-100 rounded-full mr-3 flex-shrink-0">
                <Hammer className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
                <h4 className="text-sm font-bold text-emerald-900">Great News!</h4>
                <p className="text-sm text-emerald-700 mt-1">
                    This is exactly what we're looking for. Our partners specialize in {data.condition === Condition.MAJOR_ISSUES ? 'heavy renovation' : 'fixer-upper'} projects.
                </p>
            </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Updates since last appraisal?</label>
        <textarea
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
          placeholder="e.g. New roof in 2023... or 'No updates in 20 years'"
          value={data.upgrades}
          onChange={(e) => updateData({ upgrades: e.target.value })}
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <Button onClick={onNext} disabled={!data.condition}>Next Step</Button>
      </div>
    </div>
  );
};

// --- Step 3: Situation ---
export const SituationStep: React.FC<StepProps> = ({ data, updateData, onNext, onBack }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Your Goal</h2>
        <p className="text-slate-500">Help us route you to the right partner.</p>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-700">I want to...</label>
        {[
          { val: Goal.CASH_OFFER, icon: DollarSign, text: "Get a Cash Offer (Speed & As-Is)" },
          { val: Goal.LIST_HOME, icon: Home, text: "List with an Agent (Max Value)" },
          { val: Goal.LOWER_TAXES, icon: Gavel, text: "Protest My Taxes (Lower CAD Value)" },
          { val: Goal.VALUE_CHECK, icon: FileText, text: "Just Checking My Equity" },
        ].map((opt) => (
          <button
            key={opt.val}
            onClick={() => updateData({ goal: opt.val })}
            className={`flex items-center w-full p-4 rounded-lg border transition-all ${
              data.goal === opt.val
                ? 'bg-brand-50 border-brand-500 ring-1 ring-brand-500 text-brand-900'
                : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
            }`}
          >
            <opt.icon className={`w-5 h-5 mr-3 ${data.goal === opt.val ? 'text-brand-600' : 'text-slate-400'}`} />
            <span className="font-medium">{opt.text}</span>
          </button>
        ))}
      </div>

      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input 
            type="checkbox" 
            checked={data.isPrimaryResidence} 
            onChange={(e) => updateData({ isPrimaryResidence: e.target.checked })}
            className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500 border-gray-300"
          />
          <span className="text-slate-700">This is my primary residence</span>
        </label>
        
        <label className="flex items-center space-x-3 cursor-pointer">
          <input 
            type="checkbox" 
            checked={data.behindOnTaxes} 
            onChange={(e) => updateData({ behindOnTaxes: e.target.checked })}
            className="w-5 h-5 text-red-600 rounded focus:ring-red-500 border-gray-300"
          />
          <span className="text-slate-700">I am behind on taxes or payments</span>
        </label>
      </div>

      {data.behindOnTaxes && (
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start">
          <ShieldAlert className="w-5 h-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0"/>
          <p className="text-sm text-amber-800">
            We prioritize urgent cases. We can often close before tax foreclosure.
          </p>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <Button onClick={onNext} disabled={!data.goal}>Next Step</Button>
      </div>
    </div>
  );
};

// --- Step 4: Contact ---
export const ContactStep: React.FC<StepProps> = ({ data, updateData, onNext, onBack }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Where should we send the offer?</h2>
        <p className="text-slate-500">We'll text you a link to your full options report.</p>
      </div>

      <div className="space-y-4">
        <Input 
          label="Full Name" 
          placeholder="Jane Doe"
          value={data.contactName}
          onChange={(e) => updateData({ contactName: e.target.value })}
        />
        <Input 
          label="Email Address" 
          type="email" 
          placeholder="jane@example.com"
          value={data.contactEmail}
          onChange={(e) => updateData({ contactEmail: e.target.value })}
        />
        <Input 
          label="Mobile Phone" 
          type="tel" 
          placeholder="(555) 123-4567"
          value={data.contactPhone}
          onChange={(e) => updateData({ contactPhone: e.target.value })}
        />
      </div>

      <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded border border-slate-100">
        By clicking "See My Options", you agree to our Terms and Privacy Policy. You consent to receive phone calls and SMS messages from GiveMeTheCAD and its partners to provide updates on your request. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out.
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <Button 
          variant="secondary" 
          onClick={onNext} 
          disabled={!data.contactName || !data.contactPhone || !data.contactEmail}
          className="w-full ml-4"
        >
          See Cash Offer
        </Button>
      </div>
    </div>
  );
};
