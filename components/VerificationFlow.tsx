import React, { useState, useEffect } from 'react';
import { VerificationData, User } from '../types';
import VerificationStep1 from './VerificationStep1';
import VerificationStep2 from './VerificationStep2';
import VerificationStep3 from './VerificationStep3';
import Icon from './Icon';
import { verifyUserDetails } from '../services/verificationService';

interface VerificationFlowProps {
    onComplete: (data: VerificationData) => void;
    user: User;
}

const loadingMessages = [
    "Initiating secure connection...",
    "Submitting details to verification authority...",
    "Cross-referencing government databases...",
    "Performing final security checks...",
    "Finalizing verification..."
];

const VerificationFlow: React.FC<VerificationFlowProps> = ({ onComplete, user }) => {
    const [step, setStep] = useState(1);
    const [loadingState, setLoadingState] = useState({ isLoading: false, message: '' });
    const [formData, setFormData] = useState<Partial<VerificationData>>({
        name: user.name,
        phone: user.phone,
    });

    useEffect(() => {
        if (!loadingState.isLoading) {
            return;
        }

        let messageIndex = 0;
        setLoadingState(s => ({...s, message: loadingMessages[0]}));
        
        const intervalId = setInterval(() => {
            messageIndex++;
            if (messageIndex < loadingMessages.length) {
                setLoadingState(s => ({...s, message: loadingMessages[messageIndex]}));
            }
        }, 2000);

        return () => {
            clearInterval(intervalId);
        };
    }, [loadingState.isLoading]);


    const handleNext = (data: Partial<VerificationData>) => {
        setFormData(prev => ({ ...prev, ...data }));
        setStep(prev => prev + 1);
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    const handleSubmit = async (data: Partial<VerificationData>) => {
        const finalData = { ...formData, ...data } as VerificationData;
        setLoadingState({ isLoading: true, message: 'Initiating...' });

        const result = await verifyUserDetails(finalData);
        
        if (result.success) {
            // Keep loading screen for a bit to feel substantial
            setTimeout(() => {
                onComplete(finalData);
            }, 1500);
        } else {
            setLoadingState({ isLoading: false, message: '' });
            alert(`Verification Failed: ${result.message}`);
        }
    };
    
    const progressPercentage = ((step -1) / 3) * 100;

    if (loadingState.isLoading) {
        return (
             <div className="flex flex-col items-center justify-center h-screen bg-slate-950 text-white p-6 text-center">
                <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-purple-500 rounded-full animate-spin"></div>
                    <div className="w-full h-full flex items-center justify-center">
                        <Icon name="shieldCheck" className="w-12 h-12 text-purple-400" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Verifying Your Details</h1>
                <p className="max-w-xs text-slate-400 transition-opacity duration-500">
                   {loadingState.message}
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-slate-950 text-white">
            <header className="p-4 border-b border-slate-800">
                <h1 className="text-xl font-bold text-center">Complete Your Profile</h1>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3">
                    <div 
                        className="bg-purple-600 h-1.5 rounded-full transition-all duration-500" 
                        style={{ width: `${progressPercentage}%` }}>
                    </div>
                </div>
            </header>

            <main className="flex-grow p-6 overflow-y-auto">
                {step === 1 && <VerificationStep1 onNext={handleNext} data={formData} />}
                {step === 2 && <VerificationStep2 onNext={handleNext} onBack={handleBack} data={formData} />}
                {step === 3 && <VerificationStep3 onSubmit={handleSubmit} onBack={handleBack} data={formData} />}
            </main>
        </div>
    );
};

export default VerificationFlow;