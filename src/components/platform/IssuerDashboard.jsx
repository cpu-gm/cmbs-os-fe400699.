import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Plus, Zap } from 'lucide-react';
import AICreateDealModal from './AICreateDealModal';
import DealCard from './DealCard';
import DealStateDashboard from './DealStateDashboard';

export default function IssuerDashboard() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedDealId, setSelectedDealId] = useState(null);

  const { data: deals = [] } = useQuery({
    queryKey: ['deals'],
    queryFn: () => base44.entities.Deal.list(),
    initialData: []
  });

  const activeDeal = deals.find(d => d.status === 'active');
  const totalBalance = deals.reduce((sum, d) => sum + (d.poolBalance || 0), 0);

  // If a deal is selected, show the State Dashboard
  if (selectedDealId) {
    return <DealStateDashboard dealId={selectedDealId} onClose={() => setSelectedDealId(null)} />;
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Capital Stack Origination</h1>
        <p className="text-gray-400">Structure debt, equity, and hybrid capital for CRE deals</p>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-2">Active Deals</div>
          <div className="text-3xl font-bold">{deals.filter(d => d.status === 'active').length}</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-2">Total Capitalization</div>
          <div className="text-3xl font-bold">${totalBalance.toFixed(0)}M</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-2">Capital Classes</div>
          <div className="text-3xl font-bold">{deals.length * 4}</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-2">GP Promote (YTD)</div>
          <div className="text-3xl font-bold">${(totalBalance * 0.015).toFixed(1)}M</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-8 flex gap-4">
        <button
          onClick={() => setShowAIModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium flex items-center gap-2 transition-all"
        >
          <Zap size={20} />
          AI Deal Creation
        </button>
      </div>

      {/* Deals List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Your Deals</h2>
        {deals.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 text-center">
            <p className="text-gray-400 mb-4">No deals yet. Structure your first CRE capital stack.</p>
            <button
              onClick={() => setShowAIModal(true)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Create Deal
            </button>
          </div>
        ) : (
          deals.map(deal => (
            <DealCard 
              key={deal.id} 
              deal={deal} 
              role="issuer" 
              onViewDetails={() => setSelectedDealId(deal.id)}
            />
          ))
        )}
        </div>

        {/* Modal */}
        {showAIModal && (
        <AICreateDealModal onClose={() => setShowAIModal(false)} />
        )}
        </div>
        );
        }