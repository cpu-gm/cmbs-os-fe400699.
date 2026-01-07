import React, { useState } from 'react';
import { FileText, ExternalLink, X, Code, BookOpen } from 'lucide-react';

export default function CMBSDashboard() {
  const [selectedTranche, setSelectedTranche] = useState(null);

  const dealData = {
    name: 'Sunrise Multifamily CMBS 2026-1',
    status: 'Simulated',
    assetType: 'Multifamily',
    geography: 'Dallas, Austin, San Antonio',
    totalCapital: 250,
    ltv: 65,
    holdPeriod: 10,
    issuer: 'Goldman Sachs',
    servicer: 'Wells Fargo Bank'
  };

  const tranches = [
    {
      id: 'class-a',
      label: 'Class A - Senior',
      type: 'Senior Debt',
      amount: 162.5,
      percentage: 65,
      coupon: 7.2,
      priority: 1,
      tokenSupply: '162,500,000',
      color: 'from-green-500 to-green-600',
      sourceClause: 'Section 4.1(a) - Senior Class A Notes shall receive all principal and interest payments in priority to all other classes, with a fixed coupon of SOFR + 250bps, subject to DSCR covenant of 1.25x.',
      interpretation: 'Class A notes are the most senior tranche. They receive payments first from available cash flows. The interest rate is SOFR (the benchmark rate) plus 2.50%. The deal must maintain a debt service coverage ratio of at least 1.25x.',
      smartLogic: `if (cashflow_available > 0) {
  pay_class_a_interest = principal_a * (SOFR + 2.50%) / 12
  pay_class_a_principal = scheduled_principal_a
  
  if (DSCR < 1.25) {
    trigger_reserve_funding()
  }
  
  distribute(class_a, pay_class_a_interest + pay_class_a_principal)
  remaining_cash -= payment
}`
    },
    {
      id: 'class-b',
      label: 'Class B - Mezzanine',
      type: 'Mezzanine Debt',
      amount: 50,
      percentage: 20,
      coupon: 9.5,
      priority: 2,
      tokenSupply: '50,000,000',
      color: 'from-blue-500 to-blue-600',
      sourceClause: 'Section 4.1(b) - Class B Mezzanine Notes shall receive payments subordinate to Class A, with a coupon of 9.5% annually, and shall absorb losses after subordinate equity classes.',
      interpretation: 'Class B notes are subordinate to Class A. They only receive payments after Class A is fully paid. They have a higher fixed interest rate (9.5%) to compensate for higher risk. If the property underperforms, Class B takes losses before Class A.',
      smartLogic: `if (cashflow_available > class_a_payment) {
  remaining_cash = cashflow_available - class_a_payment
  pay_class_b_interest = principal_b * 9.5% / 12
  
  if (remaining_cash >= pay_class_b_interest) {
    distribute(class_b, pay_class_b_interest)
    remaining_cash -= pay_class_b_interest
  } else {
    distribute(class_b, remaining_cash)
    remaining_cash = 0
  }
}`
    },
    {
      id: 'class-c',
      label: 'Class C - Subordinate',
      type: 'Preferred Equity',
      amount: 25,
      percentage: 10,
      coupon: 12.0,
      priority: 3,
      tokenSupply: '25,000,000',
      color: 'from-purple-500 to-purple-600',
      sourceClause: 'Section 4.2 - Preferred Equity (Class C) shall receive a 12% preferred return annually, subordinate to all debt classes, with catch-up provisions if distributions are deferred.',
      interpretation: 'Class C is preferred equity, not debt. It has a target return of 12% per year, but only gets paid after all debt (Class A and B) is paid. If there is not enough cash in a given period, Class C distributions can be deferred and caught up later.',
      smartLogic: `if (cashflow_available > class_a_payment + class_b_payment) {
  remaining_cash = cashflow_available - class_a_payment - class_b_payment
  preferred_return_c = principal_c * 12% / 12
  accrued_pref_c += preferred_return_c
  
  if (remaining_cash >= accrued_pref_c) {
    distribute(class_c, accrued_pref_c)
    accrued_pref_c = 0
  } else {
    distribute(class_c, remaining_cash)
    accrued_pref_c -= remaining_cash
    remaining_cash = 0
  }
}`
    },
    {
      id: 'equity',
      label: 'Common Equity',
      type: 'Common Equity',
      amount: 12.5,
      percentage: 5,
      coupon: 0,
      priority: 4,
      tokenSupply: '12,500,000',
      color: 'from-amber-500 to-amber-600',
      sourceClause: 'Section 5.1 - Common Equity shall receive all residual cash flows after satisfaction of senior obligations, and shall absorb first losses in the event of default or underperformance.',
      interpretation: 'Common equity is the most junior position. It only receives cash after all debt and preferred equity are paid. It has no guaranteed return—it gets whatever is left over. But it also absorbs losses first if the property underperforms.',
      smartLogic: `if (cashflow_available > all_senior_payments) {
  remaining_cash = cashflow_available - all_senior_payments
  
  // Common equity gets 100% of residual until GP promote hurdle
  if (equity_irr < 15%) {
    distribute(common_equity, remaining_cash * 0.95)  // 95% to LPs
    distribute(gp_promote, remaining_cash * 0.05)     // 5% to GP
  } else {
    // After 15% IRR hurdle, 70/30 split
    distribute(common_equity, remaining_cash * 0.70)
    distribute(gp_promote, remaining_cash * 0.30)
  }
}`
    }
  ];

  const dealState = {
    cashCollected: 3.2,
    cashDistributed: 2.8,
    reserveBalance: 5.0,
    nextDistribution: '2026-02-15',
    lastEvent: '2026-01-05 14:32 UTC'
  };

  const events = [
    { date: '2026-01-05', event: 'Deal Minted', details: 'On-chain representation created' },
    { date: '2026-01-03', event: 'Capital Stack Finalized', details: '4 tranches structured' },
    { date: '2025-12-28', event: 'Deal Originated', details: 'AI-assisted structuring completed' }
  ];

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 border-b border-gray-700">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold mb-1">{dealData.name}</h3>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-blue-500/20 border border-blue-400 rounded-full text-xs font-medium text-blue-200">
                {dealData.status}
              </span>
              <span className="text-sm text-gray-400">Digital Twin Active</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <FileText size={16} />
              View Documents
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
              Issue Tokens
            </button>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors">
              Compliance View
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-6 p-6">
        {/* Left Panel - Deal Overview */}
        <div className="md:col-span-3 space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Deal Overview</h4>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-gray-500 text-xs">Asset Type</div>
                <div className="font-medium text-gray-900">{dealData.assetType}</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs">Geography</div>
                <div className="font-medium text-gray-900">{dealData.geography}</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs">Total Capital</div>
                <div className="font-medium text-gray-900">${dealData.totalCapital}M</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs">LTV</div>
                <div className="font-medium text-gray-900">{dealData.ltv}%</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs">Hold Period</div>
                <div className="font-medium text-gray-900">{dealData.holdPeriod} years</div>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <div className="text-gray-500 text-xs">Issuer</div>
                <div className="font-medium text-gray-900 text-xs">{dealData.issuer}</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs">Servicer</div>
                <div className="font-medium text-gray-900 text-xs">{dealData.servicer}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Capital Stack Visualization */}
        <div className="md:col-span-6">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Capital Stack Visualization
          </h4>
          <div className="space-y-2">
            {tranches.map((tranche) => (
              <button
                key={tranche.id}
                onClick={() => setSelectedTranche(tranche)}
                className="w-full group relative"
              >
                <div
                  className={`bg-gradient-to-r ${tranche.color} rounded-lg p-4 transition-all hover:shadow-lg hover:scale-[1.02]`}
                  style={{ height: `${80 + tranche.percentage * 2}px` }}
                >
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <div className="font-semibold text-sm mb-0.5">{tranche.label}</div>
                      <div className="text-xs opacity-90">{tranche.type}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">${tranche.amount}M</div>
                      <div className="text-xs opacity-90">{tranche.percentage}% • {tranche.coupon}%</div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="text-white" size={16} />
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-4 text-center text-sm font-semibold text-gray-700">
            Total Capitalization: ${dealData.totalCapital}M
          </div>
          <p className="mt-2 text-xs text-gray-500 text-center italic">
            Click any tranche to see document ⇄ data traceability
          </p>
        </div>

        {/* Right Panel - Live Deal State */}
        <div className="md:col-span-3 space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Live Deal State</h4>
            <div className="space-y-3 text-sm">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="text-gray-600 text-xs mb-1">Cash Collected (MTD)</div>
                <div className="font-bold text-green-700 text-lg">${dealState.cashCollected}M</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="text-gray-600 text-xs mb-1">Cash Distributed (MTD)</div>
                <div className="font-bold text-blue-700 text-lg">${dealState.cashDistributed}M</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <div className="text-gray-600 text-xs mb-1">Reserve Balance</div>
                <div className="font-bold text-gray-700 text-lg">${dealState.reserveBalance}M</div>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <div className="text-gray-500 text-xs">Next Distribution</div>
                <div className="font-medium text-gray-900">{dealState.nextDistribution}</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs">Last Event</div>
                <div className="font-medium text-gray-900 text-xs">{dealState.lastEvent}</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Event Timeline</h4>
            <div className="space-y-2">
              {events.map((event, idx) => (
                <div key={idx} className="border-l-2 border-blue-300 pl-3 pb-2">
                  <div className="text-xs text-gray-500">{event.date}</div>
                  <div className="text-sm font-medium text-gray-900">{event.event}</div>
                  <div className="text-xs text-gray-600">{event.details}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tranche Detail Drawer */}
      {selectedTranche && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-end z-50">
          <div className="bg-white w-full max-w-2xl h-full overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 border-b border-gray-700 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1">{selectedTranche.label}</h3>
                <p className="text-sm text-gray-300">Document ⇄ Data Traceability</p>
              </div>
              <button
                onClick={() => setSelectedTranche(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Source Clause */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="text-blue-600" size={20} />
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                    Source Clause (PSA / Offering Memo)
                  </h4>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700 italic leading-relaxed">
                    "{selectedTranche.sourceClause}"
                  </p>
                </div>
              </div>

              {/* AI Interpretation */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="text-green-600" size={20} />
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                    AI-Parsed Interpretation (Plain English)
                  </h4>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedTranche.interpretation}
                  </p>
                </div>
              </div>

              {/* Smart Logic */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Code className="text-purple-600" size={20} />
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                    Smart Logic Representation (Pseudo-Code)
                  </h4>
                </div>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-xs text-green-400 font-mono overflow-x-auto whitespace-pre-wrap">
                    {selectedTranche.smartLogic}
                  </pre>
                </div>
              </div>

              {/* Tranche Details */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                  Tranche Details
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500">Notional Amount</div>
                    <div className="font-semibold text-gray-900">${selectedTranche.amount}M</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Coupon / Yield</div>
                    <div className="font-semibold text-gray-900">{selectedTranche.coupon}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Waterfall Priority</div>
                    <div className="font-semibold text-gray-900">{selectedTranche.priority}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Token Supply (Simulated)</div>
                    <div className="font-semibold text-gray-900">{selectedTranche.tokenSupply}</div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-xs text-yellow-800">
                  <strong>Regulator Note:</strong> This mapping is auditable, time-stamped, and immutable. Any changes to deal terms require version control and full transparency.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}