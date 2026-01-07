import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CapitalStackVisualizer from './CapitalStackVisualizer';
import { TrendingUp, Lock, DollarSign, Users } from 'lucide-react';

export default function DealDashboard({ dealId }) {
  const { data: deal = {} } = useQuery({
    queryKey: ['deal', dealId],
    queryFn: () => base44.entities.Deal.read(dealId),
    initialData: {}
  });

  const { data: capitalClasses = [] } = useQuery({
    queryKey: ['capitalClasses', dealId],
    queryFn: () => base44.entities.CapitalClass.filter({ dealId }),
    initialData: []
  });

  const { data: waterfalls = [] } = useQuery({
    queryKey: ['waterfalls', dealId],
    queryFn: () => base44.entities.Waterfall.filter({ dealId }),
    initialData: []
  });

  const { data: transfers = [] } = useQuery({
    queryKey: ['transfers', dealId],
    queryFn: () => base44.entities.Transfer.filter({ dealId }),
    initialData: []
  });

  const totalCap = deal.totalCapitalization || 0;
  const statusColor = {
    draft: 'bg-yellow-100 text-yellow-800',
    active: 'bg-green-100 text-green-800',
    matured: 'bg-gray-100 text-gray-800',
    defaulted: 'bg-red-100 text-red-800'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{deal.name}</h1>
            <p className="text-sm text-gray-500 font-mono mt-1">ID: {deal.dealId}</p>
          </div>
          <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${statusColor[deal.status] || 'bg-gray-100'}`}>
            {deal.status?.toUpperCase()}
          </span>
        </div>
        {deal.description && (
          <p className="text-gray-600 mb-4">{deal.description}</p>
        )}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Total Capitalization</div>
            <div className="text-2xl font-bold text-gray-900">${totalCap}M</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Asset Type</div>
            <div className="text-lg font-bold text-gray-900 capitalize">{deal.assetType || 'Mixed'}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Maturity Date</div>
            <div className="text-lg font-bold text-gray-900">{deal.maturityDate ? new Date(deal.maturityDate).toLocaleDateString() : 'N/A'}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Capital Classes</div>
            <div className="text-2xl font-bold text-gray-900">{capitalClasses.length}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="capital" className="bg-white rounded-lg border border-gray-200">
        <TabsList className="grid w-full grid-cols-4 border-b border-gray-200 bg-gray-50">
          <TabsTrigger value="capital" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
            Capital Stack
          </TabsTrigger>
          <TabsTrigger value="waterfalls" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
            Waterfalls
          </TabsTrigger>
          <TabsTrigger value="secondary" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
            Secondary Market
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
            Documents
          </TabsTrigger>
        </TabsList>

        {/* Capital Stack Tab */}
        <TabsContent value="capital" className="p-6">
          <CapitalStackVisualizer dealId={dealId} />
        </TabsContent>

        {/* Waterfalls Tab */}
        <TabsContent value="waterfalls" className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Distribution Waterfalls</h3>
            {waterfalls.length === 0 ? (
              <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-500">
                No waterfalls defined yet
              </div>
            ) : (
              waterfalls.map(wf => (
                <div key={wf.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{wf.name}</h4>
                      <p className="text-sm text-gray-600 capitalize">{wf.type}</p>
                    </div>
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${
                      wf.status === 'executed' ? 'bg-green-100 text-green-800' :
                      wf.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {wf.status}
                    </span>
                  </div>
                  {wf.lastExecuted && (
                    <p className="text-sm text-gray-600">Last executed: {new Date(wf.lastExecuted).toLocaleDateString()}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </TabsContent>

        {/* Secondary Market Tab */}
        <TabsContent value="secondary" className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Transfer Activity</h3>
            {transfers.length === 0 ? (
              <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-500">
                No transfers recorded
              </div>
            ) : (
              transfers.map(t => (
                <div key={t.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">Class {t.trancheClass}</h4>
                      <p className="text-sm text-gray-600">${t.amount}M @ {(t.price * 100).toFixed(2)}%</p>
                    </div>
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${
                      t.status === 'settled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Deal Documents</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex gap-4">
                <Lock className="text-blue-600 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-blue-900">Auto-Generated Prospectus</h4>
                  <p className="text-sm text-blue-800 mt-1">
                    AI-generated prospectus summary with capital structure, waterfall mechanics, and investor protections.
                  </p>
                  <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <div className="flex gap-4">
                <DollarSign className="text-purple-600 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-purple-900">Capital Stack Summary</h4>
                  <p className="text-sm text-purple-800 mt-1">
                    Detailed breakdown of all tranches, equity classes, promotes, and governing waterfall logic.
                  </p>
                  <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                    Download
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
              <div className="flex gap-4">
                <Users className="text-indigo-600 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-indigo-900">Investor Cap Table</h4>
                  <p className="text-sm text-indigo-800 mt-1">
                    Complete LP registry, equity holdings, promote structures, and distribution waterfall assignments.
                  </p>
                  <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}