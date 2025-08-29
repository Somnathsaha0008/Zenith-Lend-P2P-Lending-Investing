import React, { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import { View, User, UserRole, LoanListing, LoanApplication, LoanStatus, VerificationData, VerificationStatus } from './types';
import PlaceholderView from './components/PlaceholderView';
import Profile from './components/Profile';
import { MOCK_USER, MOCK_LOAN_LISTINGS } from './constants';
import LenderDashboard from './components/LenderDashboard';
import BorrowerDashboard from './components/BorrowerDashboard';
import LoanApplicationModal from './components/LoanApplicationModal';
import PledgeModal from './components/PledgeModal';
import { initializeFirebase, getPerf } from './firebase';
import VerificationFlow from './components/VerificationFlow';

// Simulate Firebase Initialization on App Load
const app = initializeFirebase();
const perf = getPerf(app);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Home);
  const [user, setUser] = useState<User>(MOCK_USER);
  const [loanListings, setLoanListings] = useState<LoanListing[]>(MOCK_LOAN_LISTINGS);
  const [userApplications, setUserApplications] = useState<LoanApplication[]>([]);
  
  // Modal States
  const [isApplyModalOpen, setApplyModalOpen] = useState(false);
  const [isPledgeModalOpen, setPledgeModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<LoanListing | null>(null);

  const handleVerificationComplete = (data: VerificationData) => {
    // In a real app, this data would be sent to a backend for verification.
    // Here, we'll just update the user state to mark them as verified.
    setUser(prev => ({
      ...prev,
      ...data,
      isVerified: true,
      verifications: {
        ...prev.verifications,
        aadhaar: { ...prev.verifications.aadhaar, number: data.aadhaarNumber, status: VerificationStatus.VERIFIED },
        pan: { ...prev.verifications.pan, number: data.panNumber, status: VerificationStatus.VERIFIED },
      }
    }));
  };

  const switchRole = (newRole: UserRole) => {
    setUser(prev => ({...prev, role: newRole}));
    setCurrentView(View.Home); // Reset to home on role switch
  }

  const handlePledgeClick = (loan: LoanListing) => {
    setSelectedLoan(loan);
    setPledgeModalOpen(true);
  }

  const handlePledgeSubmit = (amount: number) => {
    const pledgeTrace = perf.trace('pledge_submission'); // Start performance trace
    if (!selectedLoan) return;

    if (user.balance < amount) {
      alert("Insufficient funds to make this pledge.");
      return;
    }

    // Update user balance
    setUser(prev => ({...prev, balance: prev.balance - amount}));

    // Update loan listing
    setLoanListings(prevListings => prevListings.map(loan => {
      if (loan.id === selectedLoan.id) {
        const newFundedAmount = loan.fundedAmount + amount;
        return {
          ...loan,
          fundedAmount: newFundedAmount,
          isFunded: newFundedAmount >= loan.amount,
        };
      }
      return loan;
    }));
    
    alert(`Successfully pledged $${amount.toFixed(2)} to Loan #${selectedLoan.id.slice(0,5)}`);
    setPledgeModalOpen(false);
    setSelectedLoan(null);
    pledgeTrace.stop(); // Stop performance trace
  }
  
  const handleApplicationSubmit = (amount: number, tenure: number) => {
    const applicationTrace = perf.trace('loan_application_submission'); // Start performance trace
    const newApplication: LoanApplication = {
      id: `app-${Date.now()}`,
      amount: amount,
      tenure: tenure,
      status: LoanStatus.PENDING_VERIFICATION,
      submittedAt: new Date().toISOString(),
    };
    setUserApplications(prev => [newApplication, ...prev]);
    setApplyModalOpen(false);

    // Simulate verification and risk assessment process
    setTimeout(() => {
       setUserApplications(prev => prev.map(app => app.id === newApplication.id ? {...app, status: LoanStatus.PENDING_RISK_ASSESSMENT} : app));
    }, 2000);
    setTimeout(() => {
       setUserApplications(prev => prev.map(app => app.id === newApplication.id ? {...app, status: LoanStatus.LISTED} : app));
       // Add the new loan to the marketplace
       const newListing: LoanListing = {
          id: newApplication.id,
          borrowerName: user.name,
          amount: amount,
          tenure: tenure,
          interestRate: 14.5, // Determined by risk engine
          riskGrade: 'C',
          purpose: 'Personal Use',
          fundedAmount: 0,
          isFunded: false,
       }
       setLoanListings(prev => [newListing, ...prev]);
    }, 4000);
    applicationTrace.stop();
  }

  const renderContent = () => {
    if (!user.isVerified) {
      return <VerificationFlow onComplete={handleVerificationComplete} user={user} />;
    }

    switch (currentView) {
      case View.Home:
        return user.role === UserRole.LENDER ? (
          <LenderDashboard 
            user={user} 
            setUser={setUser} 
            switchRole={switchRole}
            loanListings={loanListings}
            onPledgeClick={handlePledgeClick}
          />
        ) : (
          <BorrowerDashboard
            user={user}
            setUser={setUser}
            switchRole={switchRole}
            applications={userApplications}
            onApplyClick={() => setApplyModalOpen(true)}
          />
        );
      case View.Profile:
        return <Profile user={user} setUser={setUser} />;
      case View.Wallet:
        return <PlaceholderView title="Wallet" icon="wallet" />;
      default:
        return user.role === UserRole.LENDER ? 
          <LenderDashboard 
            user={user} 
            setUser={setUser} 
            switchRole={switchRole}
            loanListings={loanListings}
            onPledgeClick={handlePledgeClick}
          /> : 
          <BorrowerDashboard 
            user={user} 
            setUser={setUser} 
            switchRole={switchRole}
            applications={userApplications}
            onApplyClick={() => setApplyModalOpen(true)}
          />;
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col max-w-lg mx-auto relative pb-24">
      <main className="flex-grow overflow-y-auto">
        {renderContent()}
      </main>
      
      {user.isVerified && <BottomNav currentView={currentView} setCurrentView={setCurrentView} userRole={user.role}/>}

      {isApplyModalOpen && (
          <LoanApplicationModal 
            isOpen={isApplyModalOpen}
            onClose={() => setApplyModalOpen(false)}
            onSubmit={handleApplicationSubmit}
          />
      )}
      {isPledgeModalOpen && selectedLoan && (
          <PledgeModal 
            isOpen={isPledgeModalOpen}
            onClose={() => setPledgeModalOpen(false)}
            onSubmit={handlePledgeSubmit}
            loan={selectedLoan}
            lenderBalance={user.balance}
          />
      )}
    </div>
  );
};

export default App;