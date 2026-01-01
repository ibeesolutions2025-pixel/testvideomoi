
import React from 'react';
import { AdVariation } from '../types';

interface Props {
  ad: AdVariation;
}

const AdResultCard: React.FC<Props> = ({ ad }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl hover:border-indigo-100 transition-all duration-300">
      <div className="relative aspect-square bg-slate-100 overflow-hidden">
        {ad.loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-center">
              <p className="text-sm font-semibold text-indigo-600 animate-pulse">Designing Concept...</p>
              <p className="text-xs text-slate-400 mt-1">Applying studio lighting & materials</p>
            </div>
          </div>
        ) : ad.error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-red-50">
            <svg className="w-10 h-10 text-red-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium text-red-600">{ad.error}</p>
          </div>
        ) : (
          <>
            <img 
              src={ad.imageUrl} 
              alt={ad.concept} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-3 right-3 flex space-x-2">
               <button className="p-2 bg-white/90 backdrop-blur rounded-full shadow hover:bg-white transition-colors">
                  <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
               </button>
            </div>
          </>
        )}
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {ad.concept}
          </span>
        </div>
        <h4 className="text-lg font-bold text-slate-800 mb-2">{ad.style}</h4>
        <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">
          {ad.description}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button className="text-xs font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-wider transition-colors">
            Copy Prompt
          </button>
          <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-wider transition-colors">
            Share Result
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdResultCard;
