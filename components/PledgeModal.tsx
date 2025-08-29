
import React, { useState } from 'react';
import Icon from './Icon';
import { LoanListing } from '../types';

interface PledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
  loan: LoanListing;
  lenderBalance: number;
}

const PledgeModal: React.FC<PledgeModalProps> = ({ isOpen, onClose, onSubmit, loan, lenderBalance }) => {
  const [amount, setAmount] = useState('');
  const amountNeeded = loan.amount - loan.fundedAmount;
  const maxPledge = Math.min(lenderBalance, amountNeeded);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount) && numericAmount > 0 && numericAmount <= maxPledge) {
      onSubmit(numericAmount);
    }
  };
  
  const numericAmount = parseFloat(amount);
  const isFormValid = !isNaN(numericAmount) && numericAmount > 0 && numericAmount <= maxPledge;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="relative w-full max-w-sm p-6 bg-slate-900 rounded-2xl shadow-lg border border-slate-800 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white" aria-label="Close modal">
          <Icon name="xMark" className="w-6 h-6" />
        </button>
        
        <h2 className="text-xl font-bold text-white">Pledge to Loan</h2>
        <div className="text-sm bg-slate-800 p-3 rounded-lg">
            <p>You are pledging to a <span className="font-bold text-white">{loan.tenure}-month</span> loan with a <span className="font-bold text-white">{loan.interestRate}% APR</span>.</p>
            <p className="mt-1">Amount still needed: <span className="font-bold text-purple-400">{amountNeeded.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span></p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="amount-input" className="block text-sm font-medium text-slate-400 mb-1">
              Pledge Amount
            </label>
             <div className="relative">
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-medium text-slate-500">$</span>
               <input
                id="amount-input"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                max={maxPledge}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg pl-8 pr-3 py-2 text-lg font-semibold focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                autoFocus
              />
            </div>
             <p className="text-xs text-slate-400 mt-1">Your wallet balance: {lenderBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
             {!isNaN(numericAmount) && numericAmount > maxPledge && <p className="text-xs text-red-400 mt-1">Amount exceeds your balance or amount needed.</p>}
          </div>
          
          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full bg-purple-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-purple-500 transition-colors disabled:bg-slate-700 disabled:cursor-not-allowed"
          >
            Confirm Pledge
          </button>
        </form>
      </div>
    </div>
  );
};

export default PledgeModal;
