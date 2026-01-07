import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function DealCard({ deal, role, onViewDetails }) {
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(deal.id);
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-600 transition-colors cursor-pointer" onClick={handleViewDetails}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{deal.name}</h3>
          <div className="text-xs text-gray-400 font-mono mt-1">ID: {deal.dealId || deal.id.slice(0, 12)}</div>
        </div>
        <span className={`px-3 py-1 rounded text-xs font-semibold whitespace-nowrap ${
          deal.status === 'active' ? 'bg-green-900 text-green-300' :
          deal.status === 'draft' ? 'bg-yellow-900 text-yellow-300' :
          'bg-gray-700 text-gray-300'
        }`}>
          {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-gray-700">
        <div>
          <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Total Cap</div>
          <div className="text-lg font-bold">${deal.totalCapitalization || deal.poolBalance}M</div>
        </div>
        <div>
          <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Deal Type</div>
          <div className="text-sm text-gray-300">{deal.type?.replace(/_/g, ' ') || 'Mixed'}</div>
        </div>
        <div>
          <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Asset Type</div>
          <div className="text-sm text-gray-300">{deal.assetType?.replace(/_/g, ' ') || deal.propertyTypes?.join(', ') || 'Mixed'}</div>
        </div>
        <div>
          <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Maturity</div>
          <div className="text-sm text-gray-300">{deal.maturityDate ? new Date(deal.maturityDate).getFullYear() : 'TBD'}</div>
        </div>
      </div>

      {role === 'issuer' && (
        <div className="flex gap-3">
          <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium text-sm transition-colors flex items-center justify-center gap-2">
            View Details <ChevronRight size={16} />
          </button>
          <button className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded font-medium text-sm transition-colors">
            Edit Capital Stack
          </button>
        </div>
      )}

      {role === 'servicer' && (
        <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium text-sm transition-colors flex items-center justify-center gap-2">
          Run Distribution <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}