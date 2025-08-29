import React from 'react';
import { User, UserRole } from '../types';
import Icon from './Icon';

interface RoleSwitcherProps {
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
}

const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ currentRole, switchRole }) => {
  const isLender = currentRole === UserRole.LENDER;
  return (
    <div className="flex items-center p-1 bg-slate-800 rounded-full">
      <button 
        onClick={() => switchRole(UserRole.BORROWER)}
        className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${!isLender ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
      >
        Borrower
      </button>
      <button 
        onClick={() => switchRole(UserRole.LENDER)}
        className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${isLender ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
      >
        Lender
      </button>
    </div>
  );
}

interface HeaderProps {
  user: User;
  switchRole: (role: UserRole) => void;
}

const Header: React.FC<HeaderProps> = ({ user, switchRole }) => {
  return (
    <header className="flex justify-between items-start">
      <div className="flex items-center gap-3">
        <img src={user.avatarUrl} alt="User Avatar" className="w-12 h-12 rounded-full border-2 border-purple-500" />
        <div>
           <div className="flex items-center gap-2">
             <h1 className="text-xl font-bold text-white">{user.name}</h1>
             <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Beta
             </span>
           </div>
           <p className="text-slate-400 text-sm capitalize">{user.role} Dashboard</p>
        </div>
      </div>
       <RoleSwitcher currentRole={user.role} switchRole={switchRole} />
    </header>
  );
};

export default Header;