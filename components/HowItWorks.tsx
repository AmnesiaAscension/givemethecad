
import React from 'react';
import { Button, Card, Badge } from './UI';
import { Search, FileText, Calculator, Users, Check, X, ArrowRight, Hammer, Clock } from 'lucide-react';

interface HowItWorksProps {
  onStart: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStart }) => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-brand-50 py-20 border-b border-brand-100">
        <div className="container mx-auto px-4 text-center">
          <Badge color="blue">Simple & Transparent</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-6 mb-6">
            From "CAD Value" to <span className="text-brand-600">Cash in Hand</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            We stripped away the complexity of selling a house. No showings, no repairs, no banks. Just a straightforward process anchored on real data.
          </p>
          <Button onClick={onStart} className="px-8 py-4 text-lg rounded-xl shadow-xl shadow-brand-500/20">
            Start Your Free Check
          </Button>
        </div>
      </section>

      {/* The 4 Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-8 mb-16 relative">
              <div className="hidden md:block absolute left-[29px] top-16 bottom-[-64px] w-0.5 bg-slate-200"></div>
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white border-2 border-brand-500 rounded-full flex items-center justify-center text-2xl font-bold text-brand-600 shadow-lg z-10 relative">
                  1
                </div>
              </div>
              <div className="pt-2">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 flex items-center">
                  <Search className="w-6 h-6 mr-2 text-brand-500" />
                  We Pull the County Record
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-4">
                  Most buyers play games with numbers. We start with the <strong>County Appraisal District (CAD)</strong> value. It's public, it's official, and it gives us a neutral starting point for the conversation.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 inline-block text-sm text-slate-500">
                  <span className="font-mono">Output:</span> Account #, Assessed Value, SqFt, Year Built.
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row gap-8 mb-16 relative">
              <div className="hidden md:block absolute left-[29px] top-16 bottom-[-64px] w-0.5 bg-slate-200"></div>
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white border-2 border-brand-500 rounded-full flex items-center justify-center text-2xl font-bold text-brand-600 shadow-lg z-10 relative">
                  2
                </div>
              </div>
              <div className="pt-2">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 flex items-center">
                  <Hammer className="w-6 h-6 mr-2 text-brand-500" />
                  You Tell Us the "Ugly" Truth
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-4">
                  Does the roof leak? Is the foundation cracking? <strong>We want to know.</strong> Unlike traditional buyers who run away from repairs, our partners specifically look for "Needs Work" properties.
                </p>
                <div className="flex gap-2">
                   <Badge color="yellow">Needs Work</Badge>
                   <Badge color="yellow">Major Issues</Badge>
                   <Badge color="green">Good Condition</Badge>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row gap-8 mb-16 relative">
              <div className="hidden md:block absolute left-[29px] top-16 bottom-[-64px] w-0.5 bg-slate-200"></div>
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white border-2 border-brand-500 rounded-full flex items-center justify-center text-2xl font-bold text-brand-600 shadow-lg z-10 relative">
                  3
                </div>
              </div>
              <div className="pt-2">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-brand-500" />
                  Instant Logic & Offer Range
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Our algorithm takes the CAD value and adjusts it based on the condition you reported. We show you an estimated <strong>Net Cash Offer</strong> range immediately on the screen. No waiting for a phone call just to get a ballpark.
                </p>
              </div>
            </div>

             {/* Step 4 */}
             <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg z-10 relative">
                  4
                </div>
              </div>
              <div className="pt-2">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 flex items-center">
                  <Users className="w-6 h-6 mr-2 text-brand-500" />
                  Route to the Perfect Buyer
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-4">
                  We don't just blast your info to everyone. 
                </p>
                <ul className="space-y-2 text-slate-600 bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <li className="flex items-start">
                        <Check className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>If it's a <strong>Fixer-Upper</strong>, it goes to our renovation team.</span>
                    </li>
                    <li className="flex items-start">
                        <Check className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>If it's <strong>Move-in Ready</strong>, we connect you with a listing agent for max value.</span>
                    </li>
                    <li className="flex items-start">
                        <Check className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>If it's a <strong>Tax Issue</strong>, we route to tax protest specialists.</span>
                    </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Listing vs. Sold to Us</h2>
                <p className="text-slate-400">Why thousands of homeowners choose the "CAD" way.</p>
            </div>

            <div className="max-w-4xl mx-auto bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                <div className="grid grid-cols-3 text-center border-b border-slate-700 bg-slate-950/50">
                    <div className="p-4 sm:p-6 text-sm sm:text-lg font-bold text-slate-400">Feature</div>
                    <div className="p-4 sm:p-6 text-sm sm:text-lg font-bold text-white border-l border-slate-700 bg-brand-900/20">GiveMeTheCAD</div>
                    <div className="p-4 sm:p-6 text-sm sm:text-lg font-bold text-slate-400 border-l border-slate-700">Traditional Listing</div>
                </div>
                
                {[
                    { label: "Repairs Required", us: "None (Sold As-Is)", them: "Paint, Flooring, Roof..." },
                    { label: "Days to Close", us: "7-14 Days", them: "60-90 Days" },
                    { label: "Commissions", us: "Zero (0%)", them: "6%" },
                    { label: "Showings", us: "One (Internal only)", them: "Dozens of Strangers" },
                    { label: "Closing Costs", us: "We Pay Them", them: "You Pay (~2%)" },
                ].map((row, i) => (
                    <div key={i} className="grid grid-cols-3 border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                        <div className="p-4 sm:p-6 text-slate-300 font-medium text-sm sm:text-base">{row.label}</div>
                        <div className="p-4 sm:p-6 text-white font-bold text-sm sm:text-base border-l border-slate-700 bg-brand-900/10 flex items-center justify-center">
                            {row.us.includes("None") || row.us.includes("Zero") || row.us.includes("We Pay") ? <Check className="w-4 h-4 mr-2 text-emerald-400" /> : <Clock className="w-4 h-4 mr-2 text-brand-400" />}
                            {row.us}
                        </div>
                        <div className="p-4 sm:p-6 text-slate-400 text-sm sm:text-base border-l border-slate-700 flex items-center justify-center">
                             {row.them}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-brand-600 text-center text-white">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Ready to see your numbers?</h2>
            <Button onClick={onStart} variant="secondary" className="px-10 py-5 text-xl rounded-xl shadow-2xl">
                Get My CAD Options <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
            <p className="mt-6 text-brand-100 text-sm">No obligation. No credit check. 100% Free.</p>
        </div>
      </section>
    </div>
  );
};
