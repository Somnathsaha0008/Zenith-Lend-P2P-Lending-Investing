
import React from 'react';
import { LoanApplication, LoanStatus } from '../types';
import Icon from './Icon';

interface LoanStatusTrackerProps {
    applications: LoanApplication[];
}

const steps = [
    LoanStatus.PENDING_VERIFICATION,
    LoanStatus.PENDING_RISK_ASSESSMENT,
    LoanStatus.LISTED,
    LoanStatus.FUNDED,
    LoanStatus.DISBURSED
];

const ApplicationTrackerItem: React.FC<{ application: LoanApplication }> = ({ application }) => {
    const currentStepIndex = steps.indexOf(application.status);
    const formattedAmount = application.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    const submittedDate = new Date(application.submittedAt).toLocaleDateString();

    return (
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <p className="font-bold text-white">{formattedAmount} Loan</p>
                    <p className="text-sm text-slate-400">Submitted on {submittedDate}</p>
                </div>
                {application.status === LoanStatus.REJECTED && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full bg-rose-500/20 text-rose-400">
                        <Icon name="xCircle" className="w-4 h-4" />
                        <span>Rejected</span>
                    </div>
                )}
            </div>
            
            <div className="flex items-center justify-between">
                {steps.slice(0, 4).map((step, index) => {
                    const isCompleted = index < currentStepIndex;
                    const isActive = index === currentStepIndex;

                    return (
                        <React.Fragment key={step}>
                            <div className="flex flex-col items-center gap-1 text-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                                    isCompleted ? 'bg-purple-500 border-purple-500' :
                                    isActive ? 'border-purple-500 animate-pulse' : 'border-slate-600'
                                }`}>
                                    {isCompleted ? <Icon name="check" className="w-5 h-5 text-white" /> : <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-purple-500' : 'bg-slate-600'}`}></div>}
                                </div>
                                <p className={`text-xs ${isActive || isCompleted ? 'text-slate-200' : 'text-slate-500'}`}>{step.split(' ')[0]}</p>
                            </div>
                            {index < steps.slice(0, 4).length - 1 && (
                                <div className={`flex-1 h-0.5 mx-2 ${isCompleted ? 'bg-purple-500' : 'bg-slate-700'}`}></div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
             <p className="text-center text-sm text-amber-400 mt-4 font-semibold">{application.status}</p>
        </div>
    );
};


const LoanStatusTracker: React.FC<LoanStatusTrackerProps> = ({ applications }) => {
    return (
        <div className="flex flex-col gap-3">
           {applications.map(app => (
               <ApplicationTrackerItem key={app.id} application={app} />
           ))}
        </div>
    );
};

export default LoanStatusTracker;
