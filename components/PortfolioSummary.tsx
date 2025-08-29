
import React from 'react';
import Icon from './Icon';

const StatCard: React.FC<{ title: string; value: string; icon: string }> = ({ title, value, icon }) => (
    <div className="flex items-center gap-3 bg-slate-900 p-3 rounded-lg flex-1">
        <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-purple-400">
            <Icon name={icon} className="w-5 h-5" />
        </div>
        <div>
            <p className="text-sm text-slate-400">{title}</p>
            <p className="font-bold text-white text-lg">{value}</p>
        </div>
    </div>
);


const PortfolioSummary: React.FC = () => {
    return (
        <div className="flex flex-col gap-4">
             <h2 className="text-xl font-bold text-white">Portfolio Snapshot</h2>
             <div className="flex flex-col sm:flex-row gap-2">
                <StatCard title="Total Invested" value="$15,250" icon="briefcase" />
                <StatCard title="Est. Returns" value="$1,830" icon="chartPie" />
             </div>
        </div>
    );
};

export default PortfolioSummary;
