import React, { useState, useEffect } from 'react';
import { VerificationData } from '../types';

interface VerificationStep3Props {
    onSubmit: (data: Pick<VerificationData, 'aadhaarNumber' | 'panNumber'>) => void;
    onBack: () => void;
    data: Partial<VerificationData>;
}

const VerificationStep3: React.FC<VerificationStep3Props> = ({ onSubmit, onBack, data }) => {
    const [aadhaarNumber, setAadhaarNumber] = useState(data.aadhaarNumber || '');
    const [panNumber, setPanNumber] = useState(data.panNumber || '');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        // Simple validation for length. Real validation would be more complex.
        const isAadhaarValid = aadhaarNumber.replace(/\s/g, '').length === 12;
        const isPanValid = panNumber.length === 10;
        setIsValid(isAadhaarValid && isPanValid);
    }, [aadhaarNumber, panNumber]);
    
    const formatAadhaar = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        const parts = [];
        for (let i = 0; i < cleaned.length; i += 4) {
            parts.push(cleaned.slice(i, i + 4));
        }
        return parts.join(' ');
    }

    const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatAadhaar(e.target.value);
        if (formatted.replace(/\s/g, '').length <= 12) {
            setAadhaarNumber(formatted);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isValid) {
            onSubmit({ aadhaarNumber, panNumber });
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow">
                <h2 className="text-2xl font-bold text-white mb-2">Identity Verification</h2>
                <p className="text-slate-400 mb-6">The final step. This is required by law and keeps our platform secure for everyone.</p>
                
                <form id="step3-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="aadhaarNumber" className="block text-sm font-medium text-slate-300 mb-1">Aadhaar Number</label>
                        <input
                            id="aadhaarNumber"
                            type="text"
                            value={aadhaarNumber}
                            onChange={handleAadhaarChange}
                            placeholder="xxxx xxxx xxxx"
                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor="panNumber" className="block text-sm font-medium text-slate-300 mb-1">PAN Number</label>
                        <input
                            id="panNumber"
                            type="text"
                            value={panNumber}
                            onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                            placeholder="ABCDE1234F"
                            maxLength={10}
                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                            required
                        />
                    </div>
                </form>
            </div>
            
            <div className="mt-6 flex gap-3">
                 <button
                    onClick={onBack}
                    className="w-1/3 bg-slate-700 text-white font-semibold py-3 px-4 rounded-lg hover:bg-slate-600 transition-colors"
                >
                    Back
                </button>
                <button
                    type="submit"
                    form="step3-form"
                    disabled={!isValid}
                    className="w-2/3 bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-purple-500 transition-colors disabled:bg-slate-700 disabled:cursor-not-allowed"
                >
                    Submit for Verification
                </button>
            </div>
        </div>
    );
};

export default VerificationStep3;
