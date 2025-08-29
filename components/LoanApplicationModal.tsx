
import React, { useState } from 'react';
import Icon from './Icon';

interface LoanApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number, tenure: number) => void;
}

const LoanApplicationModal: React.FC<LoanApplicationModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [tenure, setTenure] = useState('12');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    const numericTenure = parseInt(tenure, 10);
    if (!isNaN(numericAmount) && numericAmount > 0 && !isNaN(numericTenure)) {
      onSubmit(numericAmount, numericTenure);
    }
  };
  
  const isFormValid = parseFloat(amount) > 0;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="relative w-full max-w-sm p-6 bg-slate-900 rounded-2xl shadow-lg border border-slate-800 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white" aria-label="Close modal">
          <Icon name="xMark" className="w-6 h-6" />
        </button>
        
        <h2 className="text-xl font-bold text-white">Apply for a Loan</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="amount-input" className="block text-sm font-medium text-slate-400 mb-1">
              Loan Amount
            </label>
             <div className="relative">
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-medium text-slate-500">$</span>
               <input
                id="amount-input"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="5,000"
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg pl-8 pr-3 py-2 text-lg font-semibold focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                autoFocus
              />
            </div>
          </div>

          <div>
            <label htmlFor="tenure-select" className="block text-sm font-medium text-slate-400 mb-1">
              Loan Tenure (Months)
            </label>
            <select
              id="tenure-select"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            >
              <option value="6">6 Months</option>
              <option value="12">12 Months</option>
              <option value="24">24 Months</option>
              <option value="36">36 Months</option>
            </select>
          </div>
          
          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full bg-purple-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-purple-500 transition-colors disabled:bg-slate-700 disabled:cursor-not-allowed mt-2"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanApplicationModal;
