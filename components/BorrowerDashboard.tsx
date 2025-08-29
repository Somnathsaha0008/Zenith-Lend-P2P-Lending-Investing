
import React from 'react';
import Header from './Header';
import BalanceCard from './BalanceCard';
import { User, UserRole, LoanApplication } from '../types';
import LoanStatusTracker from './LoanStatusTracker';
import Icon from './Icon';

interface BorrowerDashboardProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  switchRole: (role: UserRole) => void;
  applications: LoanApplication[];
  onApplyClick: () => void;
}

const BorrowerDashboard: React.FC<BorrowerDashboardProps> = ({ user, setUser, switchRole, applications, onApplyClick }) => {
  return (
    <div className="flex flex-col gap-8 p-6">
      <Header user={user} switchRole={switchRole} />
      <BalanceCard user={user} title="Active Loan Balance" />
      
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-white">My Loan Applications</h2>
        {applications.length > 0 ? (
          <LoanStatusTracker applications={applications} />
        ) : (
          <div className="text-center p-8 bg-slate-900 rounded-lg">
            <Icon name="fileContract" className="w-12 h-12 mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400">You have no active loan applications.</p>
          </div>
        )}
      </div>

       <button 
        onClick={onApplyClick}
        className="w-full bg-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-purple-500 transition-colors flex items-center justify-center gap-2 text-lg"
      >
         <Icon name="plus" className="w-6 h-6" />
         Apply for a New Loan
      </button>

    </div>
  );
};

export default BorrowerDashboard;
