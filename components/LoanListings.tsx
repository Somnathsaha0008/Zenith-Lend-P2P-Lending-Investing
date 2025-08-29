
import React from 'react';
import { LoanListing } from '../types';
import Icon from './Icon';

interface LoanListingsProps {
    listings: LoanListing[];
    onPledgeClick: (loan: LoanListing) => void;
}

const RiskGradeBadge: React.FC<{ grade: string }> = ({ grade }) => {
    const gradeColors: { [key: string]: string } = {
        'A': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        'B': 'bg-green-500/20 text-green-400 border-green-500/30',
        'C': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        'D': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
        'E': 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return (
        <span className={`px-2 py-0.5 text-xs font-bold rounded-full border ${gradeColors[grade] || ''}`}>
            Risk {grade}
        </span>
    );
};

const LoanListItem: React.FC<{ loan: LoanListing, onPledgeClick: (loan: LoanListing) => void; }> = ({ loan, onPledgeClick }) => {
    const fundedPercent = Math.min((loan.fundedAmount / loan.amount) * 100, 100);
    const formattedAmount = loan.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });

    return (
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 flex flex-col gap-3">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-white text-lg">{formattedAmount}</p>
                    <p className="text-sm text-slate-400">{loan.purpose}</p>
                </div>
                <RiskGradeBadge grade={loan.riskGrade} />
            </div>
            
            <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${fundedPercent}%` }}></div>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-400">
                <span>{fundedPercent.toFixed(0)}% Funded</span>
                <span>{loan.tenure} Months</span>
                <span>{loan.interestRate.toFixed(1)}% APR</span>
            </div>
            
             <button 
                onClick={() => onPledgeClick(loan)}
                disabled={loan.isFunded}
                className="w-full mt-2 bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-500 transition-colors disabled:bg-slate-700 disabled:cursor-not-allowed"
             >
                {loan.isFunded ? 'Fully Funded' : 'Pledge Funds'}
             </button>
        </div>
    );
};

const LoanListings: React.FC<LoanListingsProps> = ({ listings, onPledgeClick }) => {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white">Marketplace</h2>
            <div className="flex flex-col gap-3">
                {listings.map(loan => (
                    <LoanListItem key={loan.id} loan={loan} onPledgeClick={onPledgeClick} />
                ))}
            </div>
        </div>
    );
};

export default LoanListings;
