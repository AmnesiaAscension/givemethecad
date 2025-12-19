
import React, { useState, useEffect } from 'react';
import { LeadData, Condition, Goal, PropertyType, CADData } from '../types';
import { fetchCADData, submitLead } from '../services/api';
import { CADConfirmationStep, ConditionStep, SituationStep, ContactStep } from './FormSteps';
import { Card, Button } from './UI';
import { CheckCircle, Clock, MapPin, ArrowRight, Banknote, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = ['CAD Lookup', 'Condition', 'Situation', 'Contact', 'Results'];

interface MultiStepFormProps {
  initialAddress: string;
  onReset: () => void;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({ initialAddress, onReset }) => {
  const [currentStep, setCurrentStep] = useState(0);
  // Start loading true to prevent rendering empty data before fetch completes
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<LeadData>({
    address: initialAddress,
    propertyType: PropertyType.HOUSE,
    condition: Condition.GOOD,
    upgrades: '',
    isPrimaryResidence: true,
    behindOnTaxes: false,
    goal: Goal.CASH_OFFER,
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  });

  const updateFields = (fields: Partial<LeadData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  // On mount (Step 0), fetch CAD data
  useEffect(() => {
    const loadCAD = async () => {
      setIsLoading(true);
      try {
        const cadData = await fetchCADData(initialAddress);
        updateFields({ cadData });
      } catch (error) {
        console.error("Failed to fetch CAD");
      } finally {
        setIsLoading(false);
      }
    };

    if (currentStep === 0) {
      loadCAD();
    }
  }, [initialAddress, currentStep]);

  const handleNext = () => {
    if (currentStep === STEPS.length - 2) {
      // Last step before results is Contact (index 3)
      handleSubmit();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
        onReset();
    } else {
        setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await submitLead(formData);
    setIsSubmitting(false);
    setCurrentStep(prev => prev + 1);
  };

  const calculateOfferRange = () => {
    const cadValue = formData.cadData?.marketValue || 0;
    let factor = 0.85; // Default for Good/Great base (investors usually buy below market)
    
    if (formData.condition === Condition.NEEDS_WORK) factor = 0.70;
    if (formData.condition === Condition.MAJOR_ISSUES) factor = 0.50; // Heavy discount for major issues
    
    // Add some variance for the range
    const min = Math.floor((cadValue * factor * 0.9) / 1000) * 1000;
    const max = Math.floor((cadValue * factor * 1.05) / 1000) * 1000;
    
    return { min, max };
  };

  // Render Result View specifically
  if (currentStep === 4) {
    const { min, max } = calculateOfferRange();

    return (
      <div className="w-full max-w-xl mx-auto py-12 px-4">
        <Card className="bg-white p-8 text-center border-t-8 border-t-emerald-500 shadow-2xl">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Banknote className="w-10 h-10 text-emerald-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Preliminary Match!</h2>
          <p className="text-lg text-slate-600 mb-6">
            Based on your CAD value of <strong>${formData.cadData?.marketValue?.toLocaleString()}</strong> and condition ("{formData.condition}"), here is your estimated As-Is cash range:
          </p>

          <div className="bg-emerald-50 rounded-2xl p-6 border-2 border-emerald-100 mb-8 transform scale-105">
            <p className="text-sm font-bold text-emerald-800 uppercase tracking-widest mb-2">Estimated Net Cash Offer</p>
            <div className="text-4xl sm:text-5xl font-extrabold text-emerald-700 tracking-tight">
              ${min.toLocaleString()} - ${max.toLocaleString()}
            </div>
            <p className="text-xs text-emerald-600 mt-2 font-medium">
                *Includes deductions for repairs. No commissions or fees.
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-6 text-left mb-8 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-3 uppercase tracking-wide text-xs">Next Steps</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Clock className="w-5 h-5 text-brand-500 mr-3 mt-0.5" />
                <span className="text-slate-600">A local partner specialized in <strong>{formData.condition === Condition.MAJOR_ISSUES ? 'heavy renovations' : 'investment properties'}</strong> will call you at <strong>{formData.contactPhone}</strong> within 24 hours to confirm this price.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-brand-500 mr-3 mt-0.5" />
                <span className="text-slate-600">Your file #{formData.cadData?.accountNumber} has been prioritized.</span>
              </li>
            </ul>
          </div>

          <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
            Start New Search
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-medium uppercase text-slate-400 mb-2">
           <span>Start</span>
           <span>Get Offer</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-brand-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / 4) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-white p-6 sm:p-8">
             {/* Dynamic Form Content */}
            {currentStep === 0 && (
                <CADConfirmationStep 
                    data={formData} 
                    updateData={updateFields} 
                    onNext={handleNext} 
                    onBack={handleBack}
                    isLoading={isLoading} 
                />
            )}
            {currentStep === 1 && (
                <ConditionStep 
                    data={formData} 
                    updateData={updateFields} 
                    onNext={handleNext} 
                    onBack={handleBack} 
                />
            )}
            {currentStep === 2 && (
                <SituationStep 
                    data={formData} 
                    updateData={updateFields} 
                    onNext={handleNext} 
                    onBack={handleBack} 
                />
            )}
            {currentStep === 3 && (
                <>
                {isSubmitting ? (
                     <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
                        <p className="text-slate-600 font-medium">Matching with Aggressive Buyers...</p>
                    </div>
                ) : (
                    <ContactStep 
                        data={formData} 
                        updateData={updateFields} 
                        onNext={handleNext} 
                        onBack={handleBack} 
                    />
                )}
                </>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
