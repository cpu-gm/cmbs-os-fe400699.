import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { 
  Shield, 
  CheckCircle2, 
  AlertTriangle, 
  Download,
  Clock,
  FileText,
  Lock,
  Search
} from 'lucide-react';

export default function RegulatorDashboard() {
  const [showBlockedTransaction, setShowBlockedTransaction] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Fetch data
  const { data: deals = [] } = useQuery({
    queryKey: ['deals'],
    queryFn: () => base44.entities.Deal.list(),
    initialData: []
  });

  const { data: capitalClasses = [] } = useQuery({
    queryKey: ['capitalClasses'],
    queryFn: () => base44.entities.CapitalClass.list(),
    initialData: []
  });

  const { data: transfers = [] } = useQuery({
    queryKey: ['transfers'],
    queryFn: () => base44.entities.Transfer.list(),
    initialData: []
  });

  const { data: paymentEvents = [] } = useQuery({
    queryKey: ['paymentEvents'],
    queryFn: () => base44.entities.PaymentEvent.list(),
    initialData: []
  });

  // Generate activity feed
  const activityFeed = [
    ...transfers.map(t => ({
      timestamp: t.created_date,
      dealId: t.dealId,
      asset: deals.find(d => d.id === t.dealId)?.name || 'Unknown',
      capitalClass: t.trancheClass,
      action: 'Transfer',
      amount: t.amount,
      settlementRail: t.stablecoinUsed === 'USDC' ? 'Digital Cash (USDC)' : 'Digital Cash (USDT)',
      complianceStatus: t.status === 'settled' ? 'passed' : 'pending'
    })),
    ...paymentEvents.map(p => ({
      timestamp: p.created_date,
      dealId: p.dealId,
      asset: deals.find(d => d.id === p.dealId)?.name || 'Unknown',
      capitalClass: 'All Classes',
      action: 'Distribution',
      amount: p.principalCollected + p.interestCollected,
      settlementRail: 'Wire / Custodian',
      complianceStatus: p.status === 'settled' ? 'passed' : 'pending'
    }))
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 20);

  const handleExport = (type) => {
    console.log(`Exporting ${type}...`);
    alert(`Export ${type} - In production, this would generate a downloadable file.`);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Shield className="text-blue-400" size={32} />
          Regulator Oversight Console (Simulated)
        </h1>
        <p className="text-gray-400">
          Real-time visibility into CRE capital market activity, settlements, and compliance enforcement.
        </p>
        <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700 rounded-lg text-sm text-yellow-400">
          <strong>Note:</strong> This is a simulated view for demonstration purposes. Actual regulatory access would be granted through secure, permissioned channels.
        </div>
      </div>

      {/* Section 1: Live Activity Feed */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FileText size={24} className="text-blue-400" />
          Immutable Settlement Ledger
        </h2>
        <div className="text-xs text-gray-400 mb-6 flex items-center gap-2">
          <Lock size={14} />
          <span>All entries are cryptographically signed and immutable</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-400 uppercase">Timestamp</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-400 uppercase">Deal ID</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-400 uppercase">Asset / SPV</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-400 uppercase">Capital Class</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-400 uppercase">Action</th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-gray-400 uppercase">Amount</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-400 uppercase">Settlement Rail</th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-400 uppercase">Compliance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {activityFeed.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-3 py-8 text-center text-gray-400">
                    No settlement activity recorded yet
                  </td>
                </tr>
              ) : (
                activityFeed.map((activity, idx) => (
                  <tr key={idx} className="hover:bg-gray-750">
                    <td className="px-3 py-3 text-gray-300 whitespace-nowrap">
                      {new Date(activity.timestamp).toLocaleString()}
                    </td>
                    <td className="px-3 py-3 text-gray-300 font-mono text-xs">
                      {activity.dealId?.slice(0, 12) || 'N/A'}
                    </td>
                    <td className="px-3 py-3 text-white">{activity.asset}</td>
                    <td className="px-3 py-3 text-gray-300">{activity.capitalClass}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        activity.action === 'Distribution' 
                          ? 'bg-purple-900/30 text-purple-400 border border-purple-700'
                          : 'bg-blue-900/30 text-blue-400 border border-blue-700'
                      }`}>
                        {activity.action}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right text-white">${activity.amount.toFixed(2)}M</td>
                    <td className="px-3 py-3 text-gray-300 text-xs">{activity.settlementRail}</td>
                    <td className="px-3 py-3 text-center">
                      {activity.complianceStatus === 'passed' ? (
                        <CheckCircle2 size={18} className="text-green-400 mx-auto" />
                      ) : (
                        <Clock size={18} className="text-yellow-400 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Compliance Enforcement Panel */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Shield size={24} className="text-green-400" />
          Programmatic Compliance Status
        </h2>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-start gap-3 p-4 bg-green-900/20 border border-green-700 rounded-lg">
            <CheckCircle2 size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-green-400 mb-1">KYC / AML</div>
              <div className="text-sm text-gray-300">Enforced pre-settlement</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-green-900/20 border border-green-700 rounded-lg">
            <CheckCircle2 size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-green-400 mb-1">Sanctions Screening</div>
              <div className="text-sm text-gray-300">OFAC / FinCEN checked</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-green-900/20 border border-green-700 rounded-lg">
            <CheckCircle2 size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-green-400 mb-1">Jurisdiction Rules</div>
              <div className="text-sm text-gray-300">Enforced at contract level</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-green-900/20 border border-green-700 rounded-lg">
            <CheckCircle2 size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-green-400 mb-1">Transfer Restrictions</div>
              <div className="text-sm text-gray-300">Embedded in smart contracts</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showBlockedTransaction}
              onChange={(e) => setShowBlockedTransaction(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-300">Show attempted non-compliant transfer (simulated)</span>
          </label>

          {showBlockedTransaction && (
            <div className="mt-4 p-4 bg-red-900/20 border border-red-700 rounded-lg">
              <div className="flex items-start gap-3 mb-3">
                <AlertTriangle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-red-400 mb-1">Transaction Blocked</div>
                  <div className="text-sm text-gray-300 mb-2">
                    Attempted transfer from investor to non-KYC'd entity
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-400 space-y-1">
                <div><strong>Reason:</strong> Recipient failed KYC verification</div>
                <div><strong>Amount:</strong> $2.5M (Class A Senior Debt)</div>
                <div><strong>Timestamp:</strong> {new Date().toLocaleString()}</div>
                <div><strong>Action Taken:</strong> Transfer rejected at contract level before settlement</div>
                <div><strong>Audit Log:</strong> Event #47829 - Immutable record created</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section 3: Deal Reconstruction Tool */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Search size={24} className="text-purple-400" />
          Historical State Reconstruction
        </h2>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Select Deal</label>
            <select
              value={selectedDeal}
              onChange={(e) => setSelectedDeal(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white"
            >
              <option value="">-- Select a deal --</option>
              {deals.map(deal => (
                <option key={deal.id} value={deal.id}>{deal.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Select Date / Time</label>
            <input
              type="datetime-local"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white"
            />
          </div>
        </div>

        {selectedDeal && selectedDate ? (
          <div className="space-y-4">
            <div className="text-xs text-gray-400 mb-4 flex items-center gap-2">
              <Lock size={14} />
              <span>This state is reconstructed directly from immutable settlement records</span>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h3 className="font-semibold text-white mb-3">Cap Table Snapshot</h3>
              <div className="text-sm text-gray-300 space-y-2">
                {capitalClasses.filter(cc => cc.dealId === selectedDeal).map(cc => (
                  <div key={cc.id} className="flex justify-between">
                    <span>{cc.classLabel}</span>
                    <span className="font-mono">${cc.amount.toFixed(1)}M</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h3 className="font-semibold text-white mb-3">Active Covenants</h3>
              <div className="text-sm text-gray-300 space-y-1">
                <div>✓ DSCR ≥ 1.25x</div>
                <div>✓ LTV ≤ 75%</div>
                <div>✓ Debt Yield ≥ 7.0%</div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h3 className="font-semibold text-white mb-3">Pending Actions</h3>
              <div className="text-sm text-gray-400">No pending actions at selected timestamp</div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            Select a deal and date/time to reconstruct historical state
          </div>
        )}
      </div>

      {/* Section 4: Audit Export */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Download size={24} className="text-blue-400" />
          Audit Export
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          No custom data requests required. All records are natively available.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => handleExport('Settlement History')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Settlement History
          </button>
          <button
            onClick={() => handleExport('Compliance Log')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Compliance Log
          </button>
          <button
            onClick={() => handleExport('Waterfall Execution Proof')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Waterfall Proof
          </button>
        </div>
      </div>

      {/* Section 5: Access & Scope Disclosure */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Lock size={24} className="text-gray-400" />
          Access & Scope Disclosure
        </h2>
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 space-y-3 text-sm text-gray-300">
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
            <span>Regulators have <strong>read-only visibility</strong></span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
            <span>No ability to <strong>initiate transactions</strong></span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
            <span>No ability to <strong>modify records</strong></span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
            <span>No privileged access beyond <strong>transparency</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}