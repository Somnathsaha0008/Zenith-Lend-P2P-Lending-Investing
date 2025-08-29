
import React from 'react';
import Icon from './Icon';

interface PlaceholderViewProps {
  title: string;
  icon: string;
}

const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center text-slate-500">
      <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-6">
          <Icon name={icon} className="w-12 h-12 text-slate-600" />
      </div>
      <h1 className="text-3xl font-bold text-slate-300 mb-2">{title}</h1>
      <p className="max-w-xs">
        This section is under construction. Come back soon to see what's new!
      </p>
    </div>
  );
};

export default PlaceholderView;
