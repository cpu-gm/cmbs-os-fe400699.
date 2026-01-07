import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function Product() {
  const modules = [
    {
      title: 'Origination & Structuring',
      icon: '📊',
      description: 'AI-powered capital stack design from LOI through documentation.',
      features: [
        'Full capital stack modeling (debt + equity + promotes)',
        'AI-assisted deal documentation and legal templates',
        'Waterfall scenario analysis across all tranches',
        'Covenant and trigger orchestration'
      ]
    },
    {
      title: 'Live Deal Operations',
      icon: '⚙️',
      description: 'Real-time coordination of all deal participants.',
      features: [
        'Live cap tables and covenant monitoring',
        'Automated waterfall execution (debt + equity)',
        'Capital calls and co-investment coordination',
        'Promote calculations and GP carry tracking'
      ]
    },
    {
      title: 'Capital Markets Coordination',
      icon: '📈',
      description: 'Secondary market execution for debt and equity interests.',
      features: [
        'Compliant secondary trading for all capital classes',
        'Real-time cap table updates on transfers',
        'Permissioned marketplace for institutional buyers',
        'KYC/AML enforcement at settlement'
      ]
    },
    {
      title: 'Settlement & Treasury',
      icon: '💳',
      description: 'Atomic DVP on stablecoin rails. Instant coordination.',
      features: [
        'Stablecoin settlement for all cash flows',
        'Atomic DVP with cap table updates',
        'Float monetization and fee accounting',
        'Multi-currency and cross-border support'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            CRE Capital Markets Operating System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Unified infrastructure for debt, equity, and everything in between. One system of record for all CRE capital structures.
          </p>
        </div>
      </section>

      {/* Modules Overview */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            {modules.map((module, idx) => (
              <div key={idx} className="grid md:grid-cols-2 gap-12 items-start pb-12 border-b border-gray-200 last:border-b-0">
                <div>
                  <div className="text-4xl mb-4">{module.icon}</div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{module.title}</h2>
                  <p className="text-lg text-gray-600 mb-8">{module.description}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-6">
                    Core Capabilities
                  </h3>
                  <ul className="space-y-4">
                    {module.features.map((feature, fidx) => (
                      <li key={fidx} className="flex gap-3">
                        <CheckCircle2 size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Points */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Built for Enterprise Integration
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Servicer Systems',
                description: 'API-first integration with LoanServ, Integrex, and custom servicer platforms.'
              },
              {
                title: 'Institutional Brokers',
                description: 'Direct settlement connectivity with primary ATS platforms and trading venues.'
              },
              {
                title: 'Regulatory Reporting',
                description: 'Real-time feeds to SEC, FINRA, and regulatory data repositories.'
              },
              {
                title: 'Trustee Networks',
                description: 'Immutable settlement records accessible to third-party trustees and auditors.'
              },
              {
                title: 'Investor Portals',
                description: 'Secure data access for institutional LPs with granular permission controls.'
              },
              {
                title: 'Custody Providers',
                description: 'Seamless coordination with qualified custodians and settlement agents.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-lg border border-gray-200 bg-white hover:border-blue-300 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data & Compliance */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Data Integrity & Compliance by Design
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Immutable Settlement Records</h3>
              <p className="text-gray-600 mb-6">
                Every cash flow, every transfer, every settlement event is recorded on a permissioned blockchain ledger. No erasure, no conflict resolution disputes, no audit friction.
              </p>
              <ul className="space-y-3">
                {['Cryptographic proof of settlement', 'Audit-ready transaction logs', 'Regulator access without API friction'].map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-700">
                    <span className="text-blue-600">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Compliance-First Architecture</h3>
              <p className="text-gray-600 mb-6">
                KYC/AML baked in. Transfer restrictions enforced at the contract level. Regulatory data accessible without custom feeds or manual compliance reviews.
              </p>
              <ul className="space-y-3">
                {['KYC/AML before settlement', 'Permissioned access layers', 'Real-time regulatory feeds'].map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-700">
                    <span className="text-blue-600">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-blue-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to explore the platform?
          </h2>
          <p className="text-gray-600 mb-8">
            Schedule a technical walkthrough with our infrastructure team.
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