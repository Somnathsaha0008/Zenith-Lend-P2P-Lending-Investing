
import React from 'react';
import Header from './Header';
import BalanceCard from './BalanceCard';
import { User, UserRole, LoanListing } from '../types';
import LoanListings from './LoanListings';
import PortfolioSummary from './PortfolioSummary';

interface LenderDashboardProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  switchRole: (role: UserRole) => void;
  loanListings: LoanListing[];
  onPledgeClick: (loan: LoanListing) => void;
}

const LenderDashboard: React.FC<LenderDashboardProps> = ({ user, setUser, switchRole, loanListings, onPledgeClick }) => {
  return (
    <div className="flex flex-col gap-8 p-6">
      <Header user={user} switchRole={switchRole} />
      <BalanceCard user={user} title="Investment Wallet" primaryActionText="Add Funds" onPrimaryAction={() => alert("Add Funds clicked!")}/>
      <PortfolioSummary />
      <LoanListings listings={loanListings} onPledgeClick={onPledgeClick} />
    </div>
  );
};

export default LenderDashboard;
