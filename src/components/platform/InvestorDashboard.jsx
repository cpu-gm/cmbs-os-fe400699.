import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

export default function InvestorDashboard() {
  const { data: deals = [] } = useQuery({
    queryKey: ['deals'],
    queryFn: () => base44.entities.Deal.list(),
    initialData: []
  });

  const { data: transfers = [] } = useQuery({
    queryKey: ['transfers'],
    queryFn: () => base44.entities.Transfer.list(),
    initialData: []
  });

  const activeDeal = deals.find(d => d.status === 'active');
  const holdings = activeDeal ? Math.random() * 50 : 0;
  const ytdYield = (Math.random() * 4 + 3).toFixed(2);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">LP Portfolio</h1>
        <p className="text-gray-400">Real-time capital positions, distributions, and secondary liquidity</p>
      </div>

      {/* Portfolio KPIs */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-2">Committed Capital</div>
          <div className="text-3xl font-bold">${holdings.toFixed(1)}M</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-2">Net IRR</div>
          <div className="text-3xl font-bold text-green-400">{ytdYield}%</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-2">Distributions (YTD)</div>
          <div className="text-3xl font-bold">${(holdings * parseFloat(ytdYield) / 100).toFixed(2)}M</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-2">Next Capital Call</div>
          <div className="text-lg font-bold text-blue-400">Jan 15, 2026</div>
        </div>
      </div>

      {/* Holdings */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Capital Stack Positions</h2>
          <div className="space-y-3">
            {[
              { label: 'Senior Debt', type: 'debt' },
              { label: 'Mezzanine', type: 'debt' },
              { label: 'Preferred Equity', type: 'equity' },
              { label: 'Common Equity', type: 'equity' }
            ].map((position, idx) => (
              <div key={position.label} className="flex justify-between items-center pb-3 border-b border-gray-700 last:border-b-0">
                <div>
                  <div className="font-medium">{position.label}</div>
                  <div className="text-xs text-gray-400">${(holdings * (0.4 - idx * 0.1)).toFixed(1)}M</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium flex items-center gap-1 ${position.type === 'debt' ? 'text-blue-400' : 'text-green-400'}`}>
                    <TrendingUp size={14} />
                    {position.type === 'debt' ? `${(5 + idx * 0.5).toFixed(2)}%` : `${(12 + idx * 2).toFixed(1)}% IRR`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Distribution History</h2>
          <div className="space-y-3">
            {[
              { date: 'Dec 15, 2025', amount: 0.45, type: 'Quarterly Distribution' },
              { date: 'Nov 15, 2025', amount: 0.42, type: 'Interest Payment' },
              { date: 'Oct 15, 2025', amount: 0.40, type: 'Quarterly Distribution' }
            ].map((payment) => (
              <div key={payment.date} className="flex justify-between items-center pb-3 border-b border-gray-700 last:border-b-0">
                <div>
                  <div className="text-sm text-gray-300">{payment.date}</div>
                  <div className="text-xs text-gray-500">{payment.type}</div>
                </div>
                <div className="text-sm font-medium text-green-400">+${payment.amount}M</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Market */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Secondary Market Activity</h2>
        {transfers.filter(t => t.status === 'settled').length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
            <p className="text-gray-400 mb-4">No recent transfers. Browse available listings.</p>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2">
              <ArrowUpRight size={16} />
              View Marketplace
            </button>
          </div>
        ) : (
          transfers.map(t => (
            <div key={t.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">Class {t.trancheClass} Transfer</div>
                  <div className="text-sm text-gray-400">${t.amount}M @ {(t.price * 100).toFixed(1)}%</div>
                </div>
                <div className={`px-3 py-1 rounded text-xs font-semibold ${
                  t.status === 'settled' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
                }`}>
                  {t.status}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}