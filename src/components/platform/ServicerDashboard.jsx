import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { AlertCircle } from 'lucide-react';
import DealCard from './DealCard';

export default function ServicerDashboard() {
  const { data: deals = [] } = useQuery({
    queryKey: ['deals'],
    queryFn: () => base44.entities.Deal.list(),
    initialData: []
  });

  const activeDeal = deals.find(d => d.status === 'active');
  const delinquencies = activeDeal ? (Math.random() * 5).toFixed(2) : 0;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Asset & Capital Management</h1>
        <p className="text-gray-400">Monitor deal performance, execute waterfalls, coordinate distributions</p>
      </div>

      {/* Alerts */}
      {delinquencies > 2 && (
        <div className="mb-8 bg-red-900/20 border border-red-700 rounded-lg p-4 flex gap-3">
          <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
          <div>
            <div className="font-semibold text-red-400">Covenant Breach Alert</div>
            <p className="text-sm text-gray-300">DSCR below threshold: {(1.25 - delinquencies/100).toFixed(2)}x</p>
          </div>
        </div>
      )}

      {/* KPIs */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-2">Properties Managed</div>
          <div className="text-3xl font-bold">{activeDeal ? activeDeal.loanCount : 0}</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-2">AUM</div>
          <div className="text-3xl font-bold">${activeDeal?.poolBalance?.toFixed(0) || 0}M</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-2">Capital Called</div>
          <div className="text-3xl font-bold text-blue-400">85%</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-2">Next Distribution</div>
          <div className="text-lg font-bold text-green-400">Jan 15</div>
        </div>
      </div>

      {/* Active Deal */}
      {activeDeal && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Deal Operations</h2>
          <DealCard deal={activeDeal} role="servicer" />
        </div>
      )}

      {deals.length === 0 && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 text-center">
          <p className="text-gray-400">No deals under management. Waiting for deals to be created.</p>
        </div>
      )}
    </div>
  );
}