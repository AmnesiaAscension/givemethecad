
import React from 'react';
import { Search, ChevronRight, ShieldCheck, Banknote, Users, Building2, LogOut, LayoutDashboard, Hammer, Clock, EyeOff } from 'lucide-react';
import { Button } from './UI';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onDashboardClick: () => void;
  onLogoClick: () => void;
  onPartnerApplyClick: () => void;
  onHowItWorksClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  user, 
  onLoginClick, 
  onLogoutClick, 
  onDashboardClick,
  onLogoClick,
  onPartnerApplyClick,
  onHowItWorksClick
}) => (
  <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <div 
        className="flex items-center space-x-2 cursor-pointer" 
        onClick={onLogoClick}
      >
        <Building2 className="w-6 h-6 text-brand-600" />
        <span className="text-xl font-extrabold text-slate-900 tracking-tight">
          GiveMeThe<span className="text-brand-600">CAD</span>
        </span>
      </div>
      
      <div className="flex items-center space-x-4">
        <nav className="hidden md:flex space-x-6 mr-2">
          {!user && (
            <>
              <button onClick={onHowItWorksClick} className="text-sm font-medium text-slate-600 hover:text-brand-600">How it Works</button>
              <button onClick={onPartnerApplyClick} className="text-sm font-medium text-slate-600 hover:text-brand-600">For Partners</button>
            </>
          )}
        </nav>
        
        {user ? (
          <div className="flex items-center gap-3">
             <span className="text-sm text-slate-500 hidden sm:inline-block">Hi, {user.name.split(' ')[0]}</span>
             <Button 
                variant="outline" 
                className="px-3 py-2 text-sm h-9 flex items-center gap-2"
                onClick={onDashboardClick}
             >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
             </Button>
             <Button 
                variant="ghost" 
                className="px-3 py-2 text-sm h-9 text-slate-500"
                onClick={onLogoutClick}
             >
                <LogOut className="w-4 h-4" />
             </Button>
          </div>
        ) : (
          <Button 
            variant="outline" 
            className="hidden sm:inline-flex px-4 py-2 text-sm h-9"
            onClick={onLoginClick}
          >
            Log In
          </Button>
        )}
      </div>
    </div>
  </header>
);

interface HeroProps {
  onAddressSubmit: (addr: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onAddressSubmit }) => {
  const [input, setInput] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.length > 3) onAddressSubmit(input);
  };

  return (
    <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Background blobs */}
       <div className="absolute -top-24 -left-20 w-96 h-96 bg-brand-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
       <div className="absolute top-0 -right-20 w-96 h-96 bg-accent-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
          Sell Your House As-Is. <br />
          <span className="text-brand-600 underline decoration-4 decoration-accent-500/30">We Love Fixer-Uppers.</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          Ugly house? Major repairs needed? No problem. 
          Enter your address to see your CAD value and get a cash offer for your property in <strong>any condition</strong>.
        </p>

        <div className="max-w-xl mx-auto bg-white p-2 rounded-2xl shadow-2xl border border-slate-100 transform hover:scale-[1.01] transition-transform">
          <form onSubmit={handleSubmit} className="flex items-center">
            <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Enter property address..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-lg outline-none text-slate-900 placeholder:text-slate-400"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    required
                />
            </div>
            <Button type="submit" variant="secondary" className="rounded-xl px-8 h-14 text-lg font-bold">
              Get Offer
            </Button>
          </form>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-500">
            <span className="flex items-center"><Hammer className="w-4 h-4 mr-1 text-accent-500" /> No Repairs Needed</span>
            <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-brand-500" /> Close in 7 Days</span>
            <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-1 text-green-500" /> 100% Independent</span>
        </div>
      </div>
    </section>
  );
};

export const Features: React.FC = () => (
  <section className="py-20 bg-white" id="how-it-works">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">The Worse The Condition, The Better</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
            Your County Appraisal District (CAD) value is just a starting point. We specialize in buying properties that need love, repairs, or a complete overhaul.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: Hammer,
            title: "We Buy 'Ugly' Houses",
            desc: "Foundation issues? Hoarder house? Water damage? We are looking for projects. No cleaning or repairs required."
          },
          {
            icon: EyeOff,
            title: "Skip the Showings",
            desc: "Don't worry about staging or endless open houses. Sell privately without neighbors tramping through your home."
          },
          {
            icon: Banknote,
            title: "Fair Cash Offers",
            desc: "We look at the potential of your property, not just the current state. Get a fair cash offer based on your CAD value + potential."
          }
        ].map((feature, i) => (
          <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
              <feature.icon className="w-6 h-6 text-brand-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
            <p className="text-slate-600 leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

interface FooterProps {
    onPartnerApplyClick: () => void;
    onLoginClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onPartnerApplyClick, onLoginClick }) => (
  <footer className="bg-slate-900 text-slate-400 py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2">
            <span className="text-xl font-extrabold text-white tracking-tight">
            GiveMeThe<span className="text-brand-500">CAD</span>
            </span>
            <p className="mt-4 max-w-xs text-sm">
                The easiest way to turn a problem property into cash. We connect homeowners with investors who love fixer-uppers.
            </p>
        </div>
        <div>
            <h4 className="text-white font-semibold mb-4">Homeowners</h4>
            <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Get Cash Offer</a></li>
                <li><a href="#" className="hover:text-white">Protest Taxes</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
            </ul>
        </div>
        <div>
            <h4 className="text-white font-semibold mb-4">Partners</h4>
            <ul className="space-y-2 text-sm">
                <li><button onClick={onLoginClick} className="hover:text-white text-left">Investor Login</button></li>
                <li><button onClick={onPartnerApplyClick} className="hover:text-white text-left">Join Partner Network</button></li>
            </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-slate-800 text-xs text-center">
        <p>&copy; {new Date().getFullYear()} GiveMeTheCAD. Not affiliated with any County Appraisal District.</p>
        <p className="mt-2">Values shown are estimates and not official appraisals. We specialize in distressed asset acquisition.</p>
      </div>
    </div>
  </footer>
);
