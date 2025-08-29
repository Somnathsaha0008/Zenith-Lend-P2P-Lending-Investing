
import React from 'react';
import Icon from './Icon';
import { View, UserRole } from '../types';

interface BottomNavProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  userRole: UserRole;
}

const NavItem: React.FC<{
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-1 transition-colors duration-200 flex-1 pt-2 pb-1"
      aria-label={label}
    >
      <div className={`relative w-16 h-8 flex items-center justify-center rounded-full transition-all ${isActive ? 'bg-purple-500/20 text-purple-400' : 'text-slate-400 hover:text-white'}`}>
        <Icon name={icon} className="w-6 h-6" />
      </div>
      <span className={`text-xs font-medium transition-colors ${isActive ? 'text-purple-400' : 'text-slate-400'}`}>{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setCurrentView, userRole }) => {
  const commonItems = [
    { icon: 'home', label: 'Dashboard', view: View.Home },
  ];
  
  const roleSpecificItems = userRole === UserRole.LENDER ? [
    { icon: 'briefcase', label: 'Marketplace', view: View.Marketplace },
    { icon: 'wallet', label: 'Wallet', view: View.Wallet },
  ] : [
    { icon: 'fileContract', label: 'My Loans', view: View.MyLoans },
  ];

  const navItems = [
      ...commonItems, 
      ...roleSpecificItems,
      { icon: 'profile', label: 'Profile', view: View.Profile }
  ];

  const handleNavigation = (view: View) => {
    // For simplicity, Marketplace and MyLoans will just resolve to the Home view for now
    if (view === View.Marketplace || view === View.MyLoans) {
        setCurrentView(View.Home);
    } else {
        setCurrentView(view);
    }
  }


  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-slate-950/80 backdrop-blur-sm border-t border-slate-800 flex justify-around">
      {navItems.map(item => (
        <NavItem
          key={item.view}
          icon={item.icon}
          label={item.label}
          isActive={currentView === item.view}
          onClick={() => handleNavigation(item.view)}
        />
      ))}
    </nav>
  );
};

export default BottomNav;
