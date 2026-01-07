import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ChevronDown } from 'lucide-react';

const PersonaCard = ({ persona, isOpen, onToggle }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors">
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="text-left">
          <h3 className="text-xl font-semibold text-gray-900">{persona.role}</h3>
          <p className="text-sm text-gray-500 mt-1">{persona.subtitle}</p>
        </div>
        <ChevronDown
          size={24}
          className={`text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="bg-gradient-to-br from-gray-50 to-white border-t border-gray-200 p-6 space-y-6">
          {/* Pain Points */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Current Pain Points</h4>
            <ul className="space-y-3">
              {persona.painPoints.map((point, idx) => (
                <li key={idx} className="flex gap-3 text-gray-700 text-sm">
                  <span className="text-red-500 flex-shrink-0">✗</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* How CRE OS Solves It */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">How CRE OS Solves This</h4>
            <ul className="space-y-3">
              {persona.solutions.map((solution, idx) => (
                <li key={idx} className="flex gap-3 text-gray-700 text-sm">
                  <span className="text-blue-600 flex-shrink-0">✓</span>
                  {solution}
                </li>
              ))}
            </ul>
          </div>

          {/* Key Metrics */}
          {persona.metrics && (
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Expected Impact</h4>
              <div className="grid grid-cols-2 gap-4">
                {persona.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-white rounded p-4 border border-gray-200">
                    <p className="text-2xl font-bold text-blue-600">{metric.value}</p>
                    <p className="text-xs text-gray-600 mt-1">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function For() {
  const [openPersona, setOpenPersona] = useState(0);

  const personas = [
    {
      role: 'Issuers & Arrangers',
      subtitle: 'Investment banks, mortgage companies, and originators',
      painPoints: [
        'Post-closing reporting delays block capital deployment',
        'Manual waterfall verification creates operational friction',
        'Secondary market visibility is limited; hard to gauge demand',
        'Investor communication requires custom ad-hoc reports'
      ],
      solutions: [
        'Real-time deal creation and instant investor connectivity',
        'Automated, auditable waterfall execution—no manual verification',
        'Secondary market transparency improves pricing and capital raise velocity',
        'Standardized investor reporting built into the platform'
      ],
      metrics: [
        { value: '5-10x', label: 'Faster issuance-to-investor timeline' },
        { value: '30%', label: 'Operational cost reduction' }
      ]
    },
    {
      role: 'Special & Master Servicers',
      subtitle: 'Servicers managing cash flow distribution and reporting',
      painPoints: [
        'Waterfall calculations are manual, error-prone, and slow',
        'Investor reporting requires compiling data from multiple systems',
        'Reconciliation between servicer and trustee records causes delays',
        'Compliance and audit trails are fragmented'
      ],
      solutions: [
        'Embedded waterfall logic executes automatically with zero manual steps',
        'Single source of truth for all settlement and payment data',
        'Immutable settlement records eliminate reconciliation disputes',
        'Audit trails are automatic and cryptographically signed'
      ],
      metrics: [
        { value: '40+', label: 'Hours saved per close per deal' },
        { value: '100%', label: 'Audit-ready compliance' }
      ]
    },
    {
      role: 'Institutional Investors',
      subtitle: 'LPs, insurance funds, and institutional asset managers',
      painPoints: [
        'T+30 settlement means capital is idle and returns are delayed',
        'Secondary market for CMBS is illiquid and fragmented',
        'Investor reporting is delayed and often contains errors',
        'No real-time visibility into pool performance or collateral'
      ],
      solutions: [
        'Instant DVP settlement on stablecoin rails—no wait time',
        'Institutional secondary market with real-time liquidity and pricing',
        'Real-time performance dashboards with immutable settlement records',
        'Live collateral tracking and loan-level transparency'
      ],
      metrics: [
        { value: '30d', label: 'Settlement time eliminated' },
        { value: '3-5x', label: 'Expected increase in secondary market depth' }
      ]
    },
    {
      role: 'Trustees & Administrators',
      subtitle: 'Third-party trustees and document custodians',
      painPoints: [
        'Settlement verification requires reconciling multiple data sources',
        'Audit requests create urgent turnaround pressures',
        'No real-time visibility into waterfall execution or investor payments',
        'Document custodial duties are manual and time-consuming'
      ],
      solutions: [
        'Immutable settlement records accessible in real-time, no reconciliation needed',
        'Instant audit compliance—all records are cryptographically signed and traceable',
        'Real-time visibility into every waterfall execution and payment',
        'Digital custody of trust documents with automated access controls'
      ],
      metrics: [
        { value: '60-80%', label: 'Audit cost reduction' },
        { value: '24h', label: 'Settlement verification time' }
      ]
    },
    {
      role: 'Regulators & Auditors',
      subtitle: 'SEC, FINRA, state regulators, and compliance teams',
      painPoints: [
        'Regulatory data is provided post-hoc, creating lag and errors',
        'Settlement discrepancies require expensive manual investigation',
        'No real-time visibility into compliance controls or KYC/AML enforcement',
        'Audit trails are fragmented across multiple institutions'
      ],
      solutions: [
        'Real-time regulatory feeds with immutable transaction records',
        'Settlement execution is programmatically compliant—no manual checks needed',
        'Permissioned real-time visibility into all settlement and compliance data',
        'Cryptographically signed audit trails eliminate data disputes'
      ],
      metrics: [
        { value: '100%', label: 'Settlement data integrity' },
        { value: 'Real-time', label: 'Regulatory visibility' }
      ]
    },
    {
      role: 'Brokers & ATS Operators',
      subtitle: 'Secondary market venues and trading platforms',
      painPoints: [
        'Secondary market infrastructure for CRE is fragmented and outdated',
        'Settlement takes 30+ days, limiting institutional participation',
        'KYC/AML enforcement is manual and error-prone',
        'Limited deal flow due to high friction in existing markets'
      ],
      solutions: [
        'ATS-ready infrastructure for seamless institutional trading integration',
        'Instant DVP settlement on stablecoin rails removes settlement friction',
        'Programmatic KYC/AML enforcement embedded in settlement logic',
        'Increased liquidity through faster, cheaper trading and settlement'
      ],
      metrics: [
        { value: '5-10x', label: 'Expected trading volume uplift' },
        { value: '0.5d', label: 'Settlement time vs. 30d legacy' }
      ]
    },
    {
      role: 'Equity Sponsors & GPs',
      subtitle: 'Developers, asset managers, and co-investment partners',
      painPoints: [
        'Managing multiple capital classes (preferred, common, promotes) is fragmented',
        'Promote calculations and GP carry distributions are manual and error-prone',
        'Cap table tracking across co-investors is decentralized and opaque',
        'Limited ability to track waterfall compliance and return milestones in real-time'
      ],
      solutions: [
        'Unified platform for all equity classes, promotes, and co-investment structures',
        'Automated promote calculations with transparent threshold tracking',
        'Single cap table visible to all equity holders with instant updates',
        'Real-time waterfall execution with transparent return reporting'
      ],
      metrics: [
        { value: '100%', label: 'Automated equity distributions' },
        { value: 'Real-time', label: 'Promote & GP carry visibility' }
      ]
    },
    {
      role: 'Institutional Equity Investors',
      subtitle: 'LPs seeking preferred or common equity in CRE deals',
      painPoints: [
        'Equity distributions lag significantly behind collection events',
        'Limited visibility into co-investor cap tables and promote structures',
        'Difficult to understand promotion thresholds and return attribution',
        'No secondary market for equity interests; illiquid investment'
      ],
      solutions: [
        'Instant distribution of equity returns on the same cycle as debt',
        'Transparent cap table showing all co-investors and ownership percentages',
        'Real-time tracking of hurdle achievement and promote calculations',
        'Institutional secondary market for equity interests with instant settlement'
      ],
      metrics: [
        { value: 'Same-day', label: 'Equity distribution vs. T+30' },
        { value: '5-10x', label: 'Expected secondary market liquidity' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Built for Every Participant
          </h1>
          <p className="text-xl text-gray-600">
                From issuers to equity investors, CRE OS solves unique problems for every participant in the CRE capital markets.
              </p>
        </div>
      </section>

      {/* Personas */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {personas.map((persona, idx) => (
              <PersonaCard
                key={idx}
                persona={persona}
                isOpen={openPersona === idx}
                onToggle={() => setOpenPersona(openPersona === idx ? -1 : idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Aligned Incentives Across the Ecosystem
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-3xl mx-auto">
            CRE OS creates a single source of truth for the entire CRE capital stack. Lower costs. Faster settlements. Better data. Reduced operational risk.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Issuers',
                icon: '🏦',
                points: ['Faster capital deployment', 'Lower operational costs', 'Better secondary market pricing']
              },
              {
                title: 'Servicers',
                icon: '⚙️',
                points: ['Automated waterfalls', 'Reduced errors', 'Instant compliance']
              },
              {
                title: 'Investors',
                icon: '💼',
                points: ['Instant settlement', 'Better liquidity', 'Real-time transparency']
              },
              {
                title: 'Trustees',
                icon: '🔒',
                points: ['Immutable records', 'Instant audits', 'Real-time oversight']
              },
              {
                title: 'Regulators',
                icon: '⚖️',
                points: ['Real-time visibility', 'Programmatic compliance', 'No manual audits']
              },
              {
                title: 'Brokers',
                icon: '📊',
                points: ['More trading volume', 'Faster settlement', 'Lower friction']
              },
              {
                title: 'Equity Sponsors',
                icon: '🏗️',
                points: ['Automated promotes', 'Real-time cap tables', 'Instant waterfall clarity']
              },
              {
                title: 'Equity Investors',
                icon: '💎',
                points: ['Same-day distributions', 'Full transparency', 'Secondary market liquidity']
              }
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-white rounded-lg border border-gray-200">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{item.title}</h3>
                <ul className="space-y-2">
                  {item.points.map((point, pidx) => (
                    <li key={pidx} className="text-sm text-gray-600 flex gap-2">
                      <span className="text-blue-600">+</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your role. Your solution.
          </h2>
          <p className="text-gray-600 mb-8">
            Request a demo tailored to your specific function and pain points.
          </p>
          <Link
            to={createPageUrl('Contact')}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Request a Demo
          </Link>
        </div>
      </section>
    </div>
  );
}