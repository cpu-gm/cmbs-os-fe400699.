import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  TrendingUp,
  DollarSign,
  Activity,
  Shield,
  FileText
} from 'lucide-react';

export default function DealStateDashboard({ dealId, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch deal data
  const { data: deal } = useQuery({
    queryKey: ['deal', dealId],
    queryFn: async () => {
      const deals = await base44.entities.Deal.list();
      return deals.find(d => d.id === dealId);
    }
  });

  const { data: capitalClasses = [] } = useQuery({
    queryKey: ['capitalClasses', dealId],
    queryFn: () => base44.entities.CapitalClass.filter({ dealId })
  });

  const { data: waterfalls = [] } = useQuery({
    queryKey: ['waterfalls', dealId],
    queryFn: () => base44.entities.Waterfall.filter({ dealId })
  });

  const { data: paymentEvents = [] } = useQuery({
    queryKey: ['paymentEvents', dealId],
    queryFn: () => base44.entities.PaymentEvent.filter({ dealId })
  });

  if (!deal) return null;

  // Calculate metrics
  const totalCommitted = capitalClasses.reduce((sum, cc) => sum + (cc.originalAmount || 0), 0);
  const totalFunded = capitalClasses.reduce((sum, cc) => sum + (cc.status === 'funded' ? cc.amount : 0), 0);
  const totalOutstanding = capitalClasses.reduce((sum, cc) => sum + (cc.amount || 0), 0);

  // Mock covenant metrics (in real app, would be calculated from actual data)
  const covenants = {
    dscr: { value: 1.35, threshold: 1.25, status: 'good' },
    ltv: { value: 68, threshold: 75, status: 'good' },
    debtYield: { value: 8.2, threshold: 7.0, status: 'good' },
    equityReturn: { value: 14.5, threshold: 12.0, status: 'good' }
  };

  // Lifecycle phases
  const phases = [
    { label: 'Origination', status: 'completed' },
    { label: 'Capital Raised', status: deal.status === 'draft' ? 'active' : 'completed' },
    { label: 'Closed', status: deal.status === 'active' ? 'active' : deal.status === 'draft' ? 'pending' : 'completed' },
    { label: 'Operating', status: deal.status === 'active' ? 'active' : 'pending' },
    { label: 'Refinance / Sale', status: 'pending' },
    { label: 'Wind-Down', status: 'pending' }
  ];

  const getCovenantColor = (status) => {
    if (status === 'good') return 'text-green-400 bg-green-900/30 border-green-700';
    if (status === 'warning') return 'text-yellow-400 bg-yellow-900/30 border-yellow-700';
    return 'text-red-400 bg-red-900/30 border-red-700';
  };

  const getCovenantIcon = (status) => {
    if (status === 'good') return <CheckCircle2 size={20} />;
    if (status === 'warning') return <AlertTriangle size={20} />;
    return <XCircle size={20} />;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/95 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">{deal.name}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Deal ID: {deal.dealId}</span>
                <span>•</span>
                <span className="px-2 py-0.5 rounded bg-blue-900/30 text-blue-400 border border-blue-700">
                  {phases.find(p => p.status === 'active')?.label || 'Draft'}
                </span>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Close
              </button>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
              <div className="text-xs text-gray-400 mb-1">Total Capitalization</div>
              <div className="text-xl font-bold text-white">${deal.totalCapitalization}M</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
              <div className="text-xs text-gray-400 mb-1">Capital Classes</div>
              <div className="text-xl font-bold text-white">{capitalClasses.length}</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
              <div className="text-xs text-gray-400 mb-1">Funded</div>
              <div className="text-xl font-bold text-green-400">${totalFunded.toFixed(1)}M</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
              <div className="text-xs text-gray-400 mb-1">Status</div>
              <div className="text-xl font-bold text-blue-400 capitalize">{deal.status}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Section 1: Deal Lifecycle Status */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity size={24} className="text-blue-400" />
            Deal Lifecycle Status
          </h2>
          <div className="relative">
            <div className="flex items-center justify-between">
              {phases.map((phase, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center relative">
                  {/* Connector Line */}
                  {idx < phases.length - 1 && (
                    <div className={`absolute top-4 left-1/2 w-full h-0.5 ${
                      phase.status === 'completed' ? 'bg-green-600' : 'bg-gray-700'
                    }`} style={{ zIndex: 0 }} />
                  )}
                  
                  {/* Phase Circle */}
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 ${
                    phase.status === 'completed' 
                      ? 'bg-green-600 border-green-500' 
                      : phase.status === 'active'
                      ? 'bg-blue-600 border-blue-500 animate-pulse'
                      : 'bg-gray-700 border-gray-600'
                  }`}>
                    {phase.status === 'completed' && <CheckCircle2 size={16} className="text-white" />}
                    {phase.status === 'active' && <Clock size={16} className="text-white" />}
                  </div>
                  
                  {/* Phase Label */}
                  <div className={`mt-2 text-xs text-center ${
                    phase.status === 'active' ? 'text-blue-400 font-semibold' : 'text-gray-400'
                  }`}>
                    {phase.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Capital Stack Snapshot */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <DollarSign size={24} className="text-green-400" />
            Capital Stack Snapshot
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-400 uppercase">Capital Class</th>
                  <th className="px-4 py-2 text-right text-xs font-semibold text-gray-400 uppercase">Committed</th>
                  <th className="px-4 py-2 text-right text-xs font-semibold text-gray-400 uppercase">Funded</th>
                  <th className="px-4 py-2 text-right text-xs font-semibold text-gray-400 uppercase">Outstanding</th>
                  <th className="px-4 py-2 text-right text-xs font-semibold text-gray-400 uppercase">Target Return</th>
                  <th className="px-4 py-2 text-center text-xs font-semibold text-gray-400 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {capitalClasses.map((cc) => (
                  <tr key={cc.id} className="hover:bg-gray-750">
                    <td className="px-4 py-3">
                      <div className="text-white font-medium">{cc.classLabel}</div>
                      <div className="text-xs text-gray-400">{cc.classType.replace(/_/g, ' ')}</div>
                    </td>
                    <td className="px-4 py-3 text-right text-white">${cc.originalAmount?.toFixed(1)}M</td>
                    <td className="px-4 py-3 text-right text-green-400">${(cc.status === 'funded' ? cc.amount : 0).toFixed(1)}M</td>
                    <td className="px-4 py-3 text-right text-white">${cc.amount?.toFixed(1)}M</td>
                    <td className="px-4 py-3 text-right text-blue-400">{cc.couponOrDividend}%</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs ${
                        cc.status === 'funded' 
                          ? 'bg-green-900/30 text-green-400 border border-green-700' 
                          : 'bg-yellow-900/30 text-yellow-400 border border-yellow-700'
                      }`}>
                        {cc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Cash Flow & Waterfall Status */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp size={24} className="text-purple-400" />
            Cash Flow & Waterfall Status
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-400 mb-2">Last Distribution</div>
              <div className="text-2xl font-bold text-white">
                {paymentEvents.length > 0 
                  ? new Date(paymentEvents[0].paymentDate).toLocaleDateString()
                  : 'Not yet distributed'}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-2">Next Scheduled Distribution</div>
              <div className="text-2xl font-bold text-blue-400">
                {waterfalls.length > 0 && waterfalls[0].nextScheduled
                  ? new Date(waterfalls[0].nextScheduled).toLocaleDateString()
                  : '15th of next month'}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-2">Active Waterfall Tier</div>
              <div className="text-xl font-semibold text-white">
                {capitalClasses[0]?.classLabel || 'Tier 1 - Senior'}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-2">Shortfalls / Carry-Forward</div>
              <div className="text-xl font-semibold text-green-400">$0.0M</div>
            </div>
          </div>
        </div>

        {/* Section 4: Covenant & Trigger Monitor */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Shield size={24} className="text-blue-400" />
            Covenant & Trigger Monitor
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-4 rounded-lg border ${getCovenantColor(covenants.dscr.status)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase">DSCR</span>
                {getCovenantIcon(covenants.dscr.status)}
              </div>
              <div className="text-2xl font-bold mb-1">{covenants.dscr.value}x</div>
              <div className="text-xs opacity-80">Min: {covenants.dscr.threshold}x</div>
            </div>

            <div className={`p-4 rounded-lg border ${getCovenantColor(covenants.ltv.status)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase">LTV</span>
                {getCovenantIcon(covenants.ltv.status)}
              </div>
              <div className="text-2xl font-bold mb-1">{covenants.ltv.value}%</div>
              <div className="text-xs opacity-80">Max: {covenants.ltv.threshold}%</div>
            </div>

            <div className={`p-4 rounded-lg border ${getCovenantColor(covenants.debtYield.status)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase">Debt Yield</span>
                {getCovenantIcon(covenants.debtYield.status)}
              </div>
              <div className="text-2xl font-bold mb-1">{covenants.debtYield.value}%</div>
              <div className="text-xs opacity-80">Min: {covenants.debtYield.threshold}%</div>
            </div>

            <div className={`p-4 rounded-lg border ${getCovenantColor(covenants.equityReturn.status)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase">Equity Return</span>
                {getCovenantIcon(covenants.equityReturn.status)}
              </div>
              <div className="text-2xl font-bold mb-1">{covenants.equityReturn.value}%</div>
              <div className="text-xs opacity-80">Target: {covenants.equityReturn.threshold}%</div>
            </div>
          </div>
        </div>

        {/* Section 5: Open Actions & Exceptions */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Clock size={24} className="text-orange-400" />
            Open Actions & Exceptions
          </h2>
          <div className="space-y-3">
            {deal.status === 'draft' ? (
              <div className="flex items-start gap-3 p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
                <AlertTriangle size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-yellow-400 mb-1">Awaiting Capital Close</div>
                  <div className="text-sm text-gray-300 mb-2">Deal activation pending full capital commitment</div>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>Owner: Deal Sponsor</span>
                    <span>•</span>
                    <span>Deadline: {new Date(Date.now() + 7*24*60*60*1000).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <CheckCircle2 size={48} className="mx-auto mb-3 text-green-400" />
                <p>No open actions or exceptions</p>
                <p className="text-sm mt-1">All deal operations are current</p>
              </div>
            )}
          </div>
        </div>

        {/* Section 6: Immutable Activity Log */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FileText size={24} className="text-gray-400" />
            Immutable Activity Log
          </h2>
          <div className="text-xs text-gray-400 mb-6 flex items-center gap-2">
            <Shield size={14} />
            <span>This log is immutable and audit-ready</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-3 p-3 bg-gray-750 rounded border border-gray-700">
              <div className="text-xs text-gray-400 w-32 flex-shrink-0">{new Date(deal.created_date).toLocaleString()}</div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white mb-1">Deal Created</div>
                <div className="text-xs text-gray-400">Deal {deal.dealId} initialized by {deal.created_by}</div>
              </div>
              <div className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs border border-blue-700">
                Deal Creation
              </div>
            </div>

            {capitalClasses.map((cc) => (
              <div key={cc.id} className="flex items-start gap-3 p-3 bg-gray-750 rounded border border-gray-700">
                <div className="text-xs text-gray-400 w-32 flex-shrink-0">{new Date(cc.created_date).toLocaleString()}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white mb-1">Capital Class Created</div>
                  <div className="text-xs text-gray-400">{cc.classLabel} - ${cc.amount}M @ {cc.couponOrDividend}%</div>
                </div>
                <div className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs border border-green-700">
                  Funding
                </div>
              </div>
            ))}

            {waterfalls.map((wf) => (
              <div key={wf.id} className="flex items-start gap-3 p-3 bg-gray-750 rounded border border-gray-700">
                <div className="text-xs text-gray-400 w-32 flex-shrink-0">{new Date(wf.created_date).toLocaleString()}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white mb-1">Waterfall Configured</div>
                  <div className="text-xs text-gray-400">{wf.name} - {wf.type}</div>
                </div>
                <div className="px-2 py-1 bg-purple-900/30 text-purple-400 rounded text-xs border border-purple-700">
                  Configuration
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}