
import React from 'react';
import { User } from '../types';
import Icon from './Icon';

interface BalanceCardProps {
  user: User;
  title: string;
  primaryActionText?: string;
  onPrimaryAction?: () => void;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ user, title, primaryActionText, onPrimaryAction }) => {
  const formattedBalance = user.balance.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="balance-card relative overflow-hidden bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl p-6 shadow-lg shadow-purple-500/20 flex flex-col gap-4 transition-transform duration-300 hover:scale-105">
      <div>
        <p className="text-sm text-purple-200">{title}</p>
        <p className="text-4xl font-extrabold text-white tracking-tight">{formattedBalance}</p>
      </div>
      {onPrimaryAction && primaryActionText && (
        <div className="flex items-center gap-4">
          <button 
            onClick={onPrimaryAction}
            className="flex-1 bg-white text-purple-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
             <Icon name="plus" className="w-5 h-5" />
             {primaryActionText}
          </button>
        </div>
      )}
    </div>
  );
};

export default BalanceCard;
