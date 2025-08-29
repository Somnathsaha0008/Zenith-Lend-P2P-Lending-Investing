import React, { useState, useEffect } from 'react';
import { User } from '../types';
import Icon from './Icon';

interface ProfileHeaderProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, setUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({ name: user.name, email: user.email, phone: user.phone });

    useEffect(() => {
        // Reset local state if the user prop changes from outside (e.g. initial load)
        setEditedUser({ name: user.name, email: user.email, phone: user.phone });
    }, [user.name, user.email, user.phone]);

    const handleSave = () => {
        setUser(prevUser => ({
            ...prevUser,
            name: editedUser.name,
            email: editedUser.email,
            phone: editedUser.phone,
        }));
        setIsEditing(false);
    };

    const handleCancel = () => {
        // Revert changes and exit edit mode
        setEditedUser({ name: user.name, email: user.email, phone: user.phone });
        setIsEditing(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({ ...prev, [name]: value }));
    }
    
    return (
        <div className="w-full relative">
             {!isEditing && (
                 <div className="absolute top-0 right-0">
                    <button 
                        onClick={() => setIsEditing(true)} 
                        className="p-2 bg-slate-800 text-slate-300 rounded-full hover:bg-slate-700 hover:text-white transition-colors" 
                        aria-label="Edit Profile"
                    >
                        <Icon name="pencil" className="w-5 h-5" />
                    </button>
                 </div>
             )}
            <div className="flex flex-col items-center gap-4">
                <img src={user.avatarUrl} alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-lg" />
                
                {isEditing ? (
                    <div className="w-full max-w-xs flex flex-col items-center gap-3">
                        <input
                            type="text"
                            name="name"
                            value={editedUser.name}
                            onChange={handleInputChange}
                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-2xl font-bold text-center focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                            aria-label="Edit Name"
                        />
                         <input
                            type="email"
                            name="email"
                            value={editedUser.email}
                            onChange={handleInputChange}
                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm text-center focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                            aria-label="Edit Email"
                        />
                         <input
                            type="tel"
                            name="phone"
                            value={editedUser.phone}
                            onChange={handleInputChange}
                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm text-center focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                            aria-label="Edit Phone"
                        />
                        <div className="flex gap-2 mt-2">
                            <button onClick={handleSave} className="flex items-center gap-1.5 bg-emerald-600 text-white font-semibold py-1.5 px-4 rounded-lg hover:bg-emerald-500 transition-colors text-sm" aria-label="Save Changes">
                                <Icon name="check" className="w-4 h-4" />
                                Save
                            </button>
                             <button onClick={handleCancel} className="flex items-center gap-1.5 bg-slate-700 text-white font-semibold py-1.5 px-4 rounded-lg hover:bg-slate-600 transition-colors text-sm" aria-label="Cancel Changes">
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                        <div className="flex flex-col items-center justify-center gap-2 mt-2 text-slate-400">
                             <div className="flex items-center gap-1.5">
                                <Icon name="mail" className="w-4 h-4" />
                                <p>{user.email}</p>
                             </div>
                             <div className="flex items-center gap-1.5">
                                <Icon name="phone" className="w-4 h-4" />
                                <p>{user.phone}</p>
                             </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileHeader;
