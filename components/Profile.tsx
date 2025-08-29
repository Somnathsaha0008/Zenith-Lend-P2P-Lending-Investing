import React from 'react';
import Icon from './Icon';
import { VerificationStatus, User } from '../types';
import ProfileHeader from './ProfileHeader';

interface ProfileProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

const VerificationStatusBadge: React.FC<{ status: VerificationStatus }> = ({ status }) => {
  let colorClasses = '';
  let iconName = 'checkCircle';

  switch (status) {
    case VerificationStatus.VERIFIED:
      colorClasses = 'bg-emerald-500/20 text-emerald-400';
      iconName = 'checkCircle';
      break;
    default:
      colorClasses = 'bg-rose-500/20 text-rose-400';
      iconName = 'xCircle';
      break;
  }

  return (
    <div className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full ${colorClasses}`}>
      <Icon name={iconName} className="w-4 h-4" />
      <span>{status}</span>
    </div>
  );
};

const ProfileDetailItem: React.FC<{ label: string, value?: string | number, icon: string }> = ({ label, value, icon }) => (
    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-900">
        <div className="flex items-center gap-4">
            <Icon name={icon} className="w-6 h-6 text-purple-400" />
            <div>
                <p className="text-sm text-slate-400">{label}</p>
                <p className="font-semibold text-white">{value || 'Not Provided'}</p>
            </div>
        </div>
    </div>
);

const ResourceLink: React.FC<{ icon: string; title: string; href: string; }> = ({ icon, title, href }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-lg bg-slate-900 hover:bg-slate-800 transition-colors">
        <div className="flex items-center gap-4">
            <Icon name={icon} className="w-6 h-6 text-purple-400" />
            <p className="font-semibold text-white">{title}</p>
        </div>
        <Icon name="chevronRight" className="w-5 h-5 text-slate-500" />
    </a>
);


const Profile: React.FC<ProfileProps> = ({ user, setUser }) => {

    const formattedSalary = user.monthlySalary 
        ? user.monthlySalary.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })
        : 'Not Provided';

    return (
        <div className="p-6 flex flex-col gap-8">
            <ProfileHeader user={user} setUser={setUser} />

            {/* Verification Details */}
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-white">Verification Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <ProfileDetailItem label="Date of Birth" value={user.dob} icon="calendarDays" />
                    <ProfileDetailItem label="Occupation" value={user.occupation} icon="briefcase" />
                    <ProfileDetailItem label="Monthly Salary" value={formattedSalary} icon="currencyDollar" />
                    <ProfileDetailItem label="Aadhaar Number" value={user.verifications.aadhaar.number} icon="idCard" />
                    <ProfileDetailItem label="PAN Number" value={user.verifications.pan.number} icon="idCard" />
                     <div className="flex items-center justify-between p-4 rounded-lg bg-slate-900 sm:col-span-2">
                        <div className="flex items-center gap-4">
                            <Icon name="signature" className="w-6 h-6 text-purple-400" />
                             <div>
                                <p className="text-sm text-slate-400">eSignature</p>
                                <p className="font-semibold text-white">eSignature Not Completed</p>
                            </div>
                        </div>
                        <button className="bg-purple-600 text-white font-semibold py-1.5 px-4 rounded-lg hover:bg-purple-500 transition-colors text-sm">
                            Complete Now
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Support & Resources */}
            <div className="flex flex-col gap-4">
                 <h2 className="text-xl font-bold text-white">Support & Resources</h2>
                 <div className="flex flex-col gap-2">
                    <ResourceLink icon="bug" title="Provide Feedback" href="mailto:feedback@zenithlend.com?subject=Beta Feedback" />
                    <ResourceLink icon="newspaper" title="Press Kit" href="#" />
                </div>
            </div>
        </div>
    );
};

export default Profile;