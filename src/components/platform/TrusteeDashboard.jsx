import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Lock, Eye } from 'lucide-react';

export default function TrusteeDashboard() {
  const { data: deals = [] } = useQuery({
    queryKey: ['deals'],
    queryFn: () => base44.entities.Deal.list(),
    initialData: []
  });

  const { data: paymentEvents = [] } = useQuery({
    queryKey: ['payments'],
    queryFn: () => base44.entities.PaymentEvent.list(),
    initialData: []
  });

  const { data: transfers = [] } = useQuery({
    queryKey: ['transfers'],
    queryFn: () => base44.entities.Transfer.list(),
    initialData: []
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Lock size={32} className="text-green-400" />
          Fund Administration & Oversight
        </h1>
        <p className="text-gray-400">Real-time visibility into all deals, capital flows, and compliance events</p>
      </div>

      {/* Message */}
      <div className="mb-8 bg-blue-900/20 border border-blue-700 rounded-lg p-4 flex gap-3">
        <Eye className="text-blue-400 flex-shrink-0" size={20} />
        <div>
          <div className="font-semibold text-blue-300">Full Transparency by Design</div>
          <p className="text-sm text-gray-300">Immutable settlement records. Real-time audit trails. No data conflicts.</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-2">Deals Under Oversight</div>
          <div className="text-3xl font-bold">{deals.length}</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-2">Payment Events Recorded</div>
          <div className="text-3xl font-bold">{paymentEvents.length}</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-2">Transfers Monitored</div>
          <div className="text-3xl font-bold">{transfers.length}</div>
        </div>
      </div>

      {/* Deals */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Deal Registry</h2>
        <div className="space-y-3">
          {deals.map(deal => (
            <div key={deal.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{deal.name}</div>
                  <div className="text-xs text-gray-400 font-mono mt-1">ID: {deal.dealId}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    Pool Balance: ${deal.poolBalance}M | Loans: {deal.loanCount}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded text-xs font-semibold ${
                  deal.status === 'active' ? 'bg-green-900 text-green-300' :
                  deal.status === 'draft' ? 'bg-yellow-900 text-yellow-300' :
                  'bg-gray-700 text-gray-300'
                }`}>
                  {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Audit Log */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Settlement & Waterfall Log</h2>
        <div className="space-y-2">
          {paymentEvents.length === 0 ? (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center text-gray-400">
              No settlement events yet
            </div>
          ) : (
            paymentEvents.map(event => (
              <div key={event.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">Payment Event - {new Date(event.paymentDate).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Principal: ${event.principalCollected}M | Interest: ${event.interestCollected}M
                    </div>
                    {event.delinquencies > 0 && (
                      <div className="text-xs text-red-400 mt-1">Delinquencies: ${event.delinquencies}M</div>
                    )}
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                    event.waterfallExecuted ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-300'
                  }`}>
                    {event.status}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Compliance Notes */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Compliance & Audit Infrastructure</h2>
        <div className="space-y-3 text-sm text-gray-300">
          <div className="flex items-start gap-3">
            <div className="text-green-400 mt-1">✓</div>
            <div>Immutable ledger of all capital flows, distributions, and transfers</div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-green-400 mt-1">✓</div>
            <div>Cryptographic proof of waterfall execution and promote calculations</div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-green-400 mt-1">✓</div>
            <div>Real-time cap table updates with full audit trail</div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-green-400 mt-1">✓</div>
            <div>KYC/AML enforcement on all LP/investor transfers</div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-green-400 mt-1">✓</div>
            <div>Single source of truth across debt and equity positions</div>
          </div>
        </div>
      </div>
    </div>
  );
}