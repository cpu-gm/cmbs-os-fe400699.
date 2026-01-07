import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowRight } from 'lucide-react';

export default function Why() {
  const painPoints = [
    {
      title: 'Manual Waterfalls & Capital Calls',
      description: 'Distributing cash flows, calculating promotes, and coordinating capital calls require manual intervention. Error-prone. Expensive. Slow.',
      solution: 'Smart contracts execute waterfalls and capital calls automatically. Zero manual steps. Cryptographically verified.',
      icon: '🔄'
    },
    {
      title: 'T+30 Settlement',
      description: 'CRE capital settlements take 30+ days. Capital sits idle. Float erodes returns. Institutional investors suffer.',
      solution: 'DVP settlement in seconds on stablecoin rails. No intermediaries. No float. Instant economics.',
      icon: '⏱️'
    },
    {
      title: 'Opaque Reporting',
      description: 'LP reports, debt investor statements, and sponsor dashboards lag by days or weeks. Data is manually compiled. Errors are common.',
      solution: 'Real-time settlement data accessible to every stakeholder. Same source of truth for all parties.',
      icon: '👁️'
    },
    {
      title: 'High Operational Risk',
      description: 'Manual processes, fragmented systems, and multiple intermediaries create counterparty risk and audit burden.',
      solution: 'Single immutable ledger. Atomic settlement. Zero counterparty risk. Programmatic compliance.',
      icon: '⚠️'
    },
    {
      title: 'Fragmented Data',
      description: 'Asset managers, fund administrators, LPs, GPs, and regulators all maintain separate records. Reconciliation is constant friction.',
      solution: 'One shared, immutable ledger of all settlement activity. Fund administrators, regulators, and auditors have instant access.',
      icon: '🧩'
    },
    {
      title: 'Illiquid Secondary Markets',
      description: 'CRE secondary trading is expensive, slow, and limited to a few sophisticated players. Institutional participation is low.',
      solution: 'ATS-compatible infrastructure. Instant settlement. Better price discovery. Higher institutional volume.',
      icon: '📊'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Why CRE Capital Markets Need Modern Infrastructure
          </h1>
          <p className="text-xl text-gray-600">
            The CRE market runs on technology from the 1990s. The inefficiencies span debt and equity. The costs are staggering.
          </p>
        </div>
      </section>

      {/* Market Context */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">The Problem</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                The CRE market is massive—over $2T in outstanding assets—but it's still managing settlements the way mortgages were handled in 1990. 
                Cash flows are distributed manually. Investors wait 30+ days for distributions. Equity and debt holders lack coordinated visibility. 
                Servicers and sponsors spend enormous resources on manual reconciliation and waterfall calculations.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">The Opportunity</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Modern infrastructure can eliminate decades of accumulated friction. Payments can settle in seconds. Investor reporting can be real-time. 
                Operational costs can drop by 40-60%. Compliance can be programmatic, not retroactive. 
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points & Solutions */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            The Core Inefficiencies CRE Capital Markets Face
          </h2>

          <div className="space-y-8">
            {painPoints.map((item, idx) => (
              <div key={idx} className="grid md:grid-cols-2 gap-8 pb-8 border-b border-gray-200 last:border-b-0 last:pb-0">
                {/* Left: Pain Point */}
                <div className="md:pr-4">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>

                {/* Right: Solution */}
                <div className="bg-blue-50 rounded-xl p-8 border border-blue-200 flex flex-col justify-center md:pl-4">
                  <p className="text-lg font-semibold text-gray-900 mb-4">CRE OS Solution</p>
                  <p className="text-gray-700 leading-relaxed">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Economics */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            The Economic Case
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                metric: '40-60%',
                label: 'Operational Cost Reduction',
                description: 'Eliminate manual waterfalls, reconciliation, and investor reporting overhead.'
              },
              {
                metric: '30 days',
                label: 'Settlement Time Eliminated',
                description: 'Move from T+30 to instant settlement. Float vanishes. Returns improve.'
              },
              {
                metric: '3-5x',
                label: 'Secondary Market Growth',
                description: 'Lower friction and better transparency attract institutional trading volume.'
              },
              {
                metric: '100%',
                label: 'Compliance Automation',
                description: 'Programmatic KYC/AML and audit trails eliminate manual compliance burden.'
              },
              {
                metric: '24h',
                label: 'Audit Turnaround',
                description: 'Immutable settlement records replace days of manual investigation.'
              },
              {
                metric: '5-10x',
                label: 'Issuance Timeline',
                description: 'Real-time investor connectivity and reporting accelerates capital deployment.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-white rounded-lg border border-gray-200 text-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">{item.metric}</p>
                <p className="text-sm font-semibold text-gray-900 mb-3">{item.label}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Now */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Now?
          </h2>

          <div className="space-y-6">
            {[
              {
                title: 'Stablecoins Are Institutional-Grade',
                description: 'Regulated stablecoins like USDC are now approved for institutional settlement. Real-time DVP is no longer theoretical.'
              },
              {
                title: 'Regulators Understand Blockchain',
                description: 'The SEC and FINRA have clarified rules for digital securities and ATS platforms. Compliance frameworks are clear.'
              },
              {
                title: 'The Cost of Manual Processes is Rising',
                description: 'Labor costs, operational risk, and audit burden are increasing. The ROI for automation is undeniable.'
              },
              {
                title: 'Institutional Investors Demand Better',
                description: 'LPs and institutional asset managers are actively seeking platforms with better reporting, faster settlement, and lower fees.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-gradient-to-r from-blue-50 to-transparent rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Infrastructure Modernization, Not Disruption
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            CRE OS doesn't reinvent structured finance. It modernizes the plumbing. 
            The deals, the capital structures, the payment logic—all the same. The settlement, reporting, and compliance? 
            Those get the technology they deserve.
          </p>
          <Link
            to={createPageUrl('Contact')}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            Request a Demo <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}