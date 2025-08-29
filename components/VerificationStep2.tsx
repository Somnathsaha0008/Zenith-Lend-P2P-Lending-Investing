import React, { useState, useEffect } from 'react';
import { VerificationData } from '../types';
import Icon from './Icon';

interface VerificationStep2Props {
    onNext: (data: Pick<VerificationData, 'monthlySalary' | 'payslipUrl'>) => void;
    onBack: () => void;
    data: Partial<VerificationData>;
}

const VerificationStep2: React.FC<VerificationStep2Props> = ({ onNext, onBack, data }) => {
    const [monthlySalary, setMonthlySalary] = useState(data.monthlySalary || '');
    const [payslipUrl, setPayslipUrl] = useState(data.payslipUrl || '');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const salary = Number(monthlySalary);
        setIsValid(!isNaN(salary) && salary > 0 && payslipUrl !== '');
    }, [monthlySalary, payslipUrl]);
    
    const handlePayslipUpload = () => {
        // Simulate file upload
        setTimeout(() => {
            setPayslipUrl('payslip_document_mock.pdf');
        }, 500);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isValid) {
            onNext({ monthlySalary: Number(monthlySalary), payslipUrl });
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow">
                <h2 className="text-2xl font-bold text-white mb-2">Financial Details</h2>
                <p className="text-slate-400 mb-6">This information helps us determine your borrowing capacity and offer the best rates.</p>
                
                <form id="step2-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="monthlySalary" className="block text-sm font-medium text-slate-300 mb-1">Gross Monthly Salary</label>
                         <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-medium text-slate-500">$</span>
                            <input
                                id="monthlySalary"
                                type="number"
                                value={monthlySalary}
                                onChange={(e) => setMonthlySalary(e.target.value)}
                                placeholder="5000"
                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg pl-8 pr-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Upload Latest Payslip</label>
                        {payslipUrl ? (
                            <div className="flex items-center justify-between p-3 bg-emerald-500/20 text-emerald-300 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Icon name="checkCircle" className="w-5 h-5" />
                                    <span className="font-semibold">{payslipUrl}</span>
                                </div>
                                <button type="button" onClick={() => setPayslipUrl('')} className="text-sm font-bold hover:underline">Replace</button>
                            </div>
                        ) : (
                             <button type="button" onClick={handlePayslipUpload} className="w-full flex items-center justify-center gap-2 bg-slate-800 border-2 border-dashed border-slate-700 text-slate-300 rounded-lg px-3 py-4 hover:bg-slate-700 hover:border-purple-500 transition-colors">
                                <Icon name="upload" className="w-5 h-5"/> Click to Upload
                            </button>
                        )}
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
                    form="step2-form"
                    disabled={!isValid}
                    className="w-2/3 bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-purple-500 transition-colors disabled:bg-slate-700 disabled:cursor-not-allowed"
                >
                    Next Step
                </button>
            </div>
        </div>
    );
};

export default VerificationStep2;
