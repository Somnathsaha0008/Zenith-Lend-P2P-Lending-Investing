import React, { useState, useEffect } from 'react';
import { VerificationData } from '../types';

interface VerificationStep1Props {
    onNext: (data: Pick<VerificationData, 'name' | 'phone' | 'dob' | 'occupation' | 'address'>) => void;
    data: Partial<VerificationData>;
}

const VerificationStep1: React.FC<VerificationStep1Props> = ({ onNext, data }) => {
    const [name, setName] = useState(data.name || '');
    const [phone, setPhone] = useState(data.phone || '');
    const [dob, setDob] = useState(data.dob || '');
    const [occupation, setOccupation] = useState(data.occupation || '');
    const [address, setAddress] = useState(data.address || '');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        // Basic validation: ensure no fields are empty
        setIsValid(name.trim() !== '' && phone.trim() !== '' && dob.trim() !== '' && occupation.trim() !== '' && address.trim() !== '');
    }, [name, phone, dob, occupation, address]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isValid) {
            onNext({ name, phone, dob, occupation, address });
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow">
                <h2 className="text-2xl font-bold text-white mb-2">Personal Details</h2>
                <p className="text-slate-400 mb-6">Let's start with the basics. Please confirm your details below.</p>
                
                <form id="step1-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Alex Mercer"
                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1">Phone Number</label>
                        <input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1 (555) 123-4567"
                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="dob" className="block text-sm font-medium text-slate-300 mb-1">Date of Birth</label>
                        <input
                            id="dob"
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="occupation" className="block text-sm font-medium text-slate-300 mb-1">Occupation</label>
                        <input
                            id="occupation"
                            type="text"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            placeholder="e.g., Software Engineer"
                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor="address" className="block text-sm font-medium text-slate-300 mb-1">Full Address</label>
                        <textarea
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="123 Main St, Anytown, USA 12345"
                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                            rows={3}
                            required
                        />
                    </div>
                </form>
            </div>
            
            <div className="mt-6">
                <button
                    type="submit"
                    form="step1-form"
                    disabled={!isValid}
                    className="w-full bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-purple-500 transition-colors disabled:bg-slate-700 disabled:cursor-not-allowed"
                >
                    Next Step
                </button>
            </div>
        </div>
    );
};

export default VerificationStep1;