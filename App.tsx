
import React, { useState } from 'react';
import { Header, Hero, Features, Footer } from './components/Landing';
import { MultiStepForm } from './components/MultiStepForm';
import { Login } from './components/Login';
import { PartnerDashboard } from './components/PartnerDashboard';
import { PartnerApplication } from './components/PartnerApplication';
import { HowItWorks } from './components/HowItWorks';
import { User } from './types';

type ViewState = 'home' | 'login' | 'dashboard' | 'partner-apply' | 'how-it-works';

function App() {
  const [funnelAddress, setFunnelAddress] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<ViewState>('home');

  // --- Funnel Logic ---
  const startFunnel = (address: string) => {
    setFunnelAddress(address);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartFromOtherPage = () => {
    setView('home');
    setFunnelAddress(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // In a real app, this might open a modal or focus the hero input.
    // Since our main page IS the hero input, we just route there.
  }

  const resetFunnel = () => {
    setFunnelAddress(null);
  };

  // --- Auth & Navigation Logic ---
  const handleLoginClick = () => {
    setView('login');
    resetFunnel(); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePartnerApplyClick = () => {
    setView('partner-apply');
    resetFunnel();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHowItWorksClick = () => {
    setView('how-it-works');
    resetFunnel();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDashboardClick = () => {
    if (user) {
        setView('dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogoutClick = () => {
    setUser(null);
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    setView('home');
    resetFunnel();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Render Logic ---
  const renderContent = () => {
    // 1. Login View
    if (view === 'login') {
      return (
        <div className="bg-slate-50 py-12">
          <Login 
            onLoginSuccess={handleLoginSuccess}
            onCancel={() => setView('home')}
          />
        </div>
      );
    }

    // 2. Partner Application View
    if (view === 'partner-apply') {
        return (
            <div className="bg-slate-50 min-h-screen">
                <PartnerApplication onCancel={() => setView('home')} />
            </div>
        );
    }

    // 3. How It Works View
    if (view === 'how-it-works') {
        return (
            <HowItWorks onStart={handleStartFromOtherPage} />
        );
    }

    // 4. Dashboard View
    if (view === 'dashboard' && user) {
      return (
        <div className="bg-slate-50 min-h-[80vh]">
          <PartnerDashboard user={user} />
        </div>
      );
    }

    // 5. Funnel Active View
    if (funnelAddress) {
      return (
        <div className="bg-slate-50 min-h-[80vh] py-12 relative">
             <div className="absolute inset-0 overflow-hidden pointer-events-none">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-brand-50 to-transparent"></div>
             </div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-8">
                 <button 
                    onClick={resetFunnel}
                    className="text-sm text-slate-500 hover:text-brand-600 mb-2 inline-flex items-center"
                 >
                    ← Back to Home
                 </button>
                 <h2 className="text-2xl font-bold text-slate-900">
                    One moment, analyzing <span className="text-brand-600">{funnelAddress}</span>
                 </h2>
              </div>
              <MultiStepForm 
                initialAddress={funnelAddress} 
                onReset={resetFunnel}
              />
            </div>
          </div>
      );
    }

    // 6. Default Home Landing
    return (
      <>
        <Hero onAddressSubmit={startFunnel} />
        <Features />
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header 
        user={user}
        onLoginClick={handleLoginClick}
        onLogoutClick={handleLogoutClick}
        onDashboardClick={handleDashboardClick}
        onLogoClick={handleLogoClick}
        onPartnerApplyClick={handlePartnerApplyClick}
        onHowItWorksClick={handleHowItWorksClick}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer 
        onPartnerApplyClick={handlePartnerApplyClick}
        onLoginClick={handleLoginClick}
      />
    </div>
  );
}

export default App;
