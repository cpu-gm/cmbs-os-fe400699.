import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowRight } from 'lucide-react';

const StepFlow = () => {
  const steps = [
    {
      number: 1,
      title: 'CRE Deal Created',
      description: 'Capital is raised for CRE—debt, equity, promotes, co-investments. The platform creates a digital twin with all deal terms, capital structure, and waterfall logic.'
    },
    {
      number: 2,
      title: 'Tranches Tokenized',
      description: 'Senior, mezzanine, and equity tranches are issued as digital securities on the settlement layer. Payment logic is embedded in smart contracts.'
    },
    {
      number: 3,
      title: 'Cash Flows Distributed',
      description: 'As borrowers pay principal and interest, waterfalls execute automatically. Investors receive their distributions instantly, with zero manual intervention.'
    },
    {
      number: 4,
      title: 'Trading on Secondary Market',
      description: 'Institutional investors trade tranche interests on ATS-compatible venues with real-time settlement and KYC/AML enforcement.'
    },
    {
      number: 5,
      title: 'Settlement on Stablecoin Rails',
      description: 'DVP settlement occurs in seconds using regulated stablecoins. Float is eliminated. Ownership transfers atomically with cash.'
    },
    {
      number: 6,
      title: 'Transparency for All',
      description: 'Regulators, trustees, and auditors access immutable settlement records in real-time. Compliance is automated, not retroactive.'
    }
  ];

  return (
    <div className="space-y-6">
      {steps.map((step) => (
        <div key={step.number} className="flex gap-6">
          {/* Left side: number and line */}
          <div className="flex flex-col items-center gap-4 pt-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
              {step.number}
            </div>
            {step.number < steps.length && (
              <div className="w-0.5 h-20 bg-gradient-to-b from-blue-600 to-blue-200" />
            )}
          </div>

          {/* Right side: content */}
          <div className="pb-6 flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
            <p className="text-gray-600 leading-relaxed">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            From Origination to Settlement
          </h1>
          <p className="text-xl text-gray-600">
            A step-by-step look at how CRE OS modernizes the entire CRE capital markets lifecycle.
          </p>
        </div>
      </section>

      {/* Main Flow */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <StepFlow />
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            How This Modernizes CRE Capital Markets
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Speed',
                description: 'Settlements that took 30 days now complete in seconds. No manual reconciliation. No float risk.'
              },
              {
                title: 'Cost Efficiency',
                description: 'Eliminate middlemen and operational overhead. Compressed fees. Real-time economics for servicers and issuers.'
              },
              {
                title: 'Transparency',
                description: 'Every stakeholder sees the same, immutable settlement record. Regulators, trustees, and investors all have aligned data.'
              },
              {
                title: 'Risk Reduction',
                description: 'Atomic settlement removes counterparty risk. Smart contracts eliminate operational error. Compliance is programmatic.'
              },
              {
                title: 'Liquidity',
                description: 'Lower settlement friction means more institutional investors can participate. Secondary market depth improves.'
              },
              {
                title: 'Auditability',
                description: 'Cryptographic proof of every transaction. Audit trails are immutable. No dispute resolution delays.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Participant Diagram */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Designed for Every Participant
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                role: 'Sponsors & GPs',
                benefit: 'Faster capital raise with lower operational friction. Real-time cap tables and promote tracking.'
              },
              {
                role: 'Asset Managers',
                benefit: 'Automated waterfall execution and LP reporting. Reduced operational risk and compliance burden.'
              },
              {
                role: 'Debt Investors',
                benefit: 'Instant settlement. Real-time performance data. Increased secondary market liquidity.'
              },
              {
                role: 'Equity Investors / LPs',
                benefit: 'Real-time distribution visibility. Automated capital calls. Transparent promote calculations.'
              },
              {
                role: 'Fund Administrators',
                benefit: 'Immutable settlement records. Real-time transparency. Reduced audit and oversight friction.'
              },
              {
                role: 'Brokers & ATS Operators',
                benefit: 'Compliant infrastructure for secondary trading. Instant DVP settlement across all capital classes.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.role}</h3>
                <p className="text-gray-600">{item.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-blue-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            See the platform in action
          </h2>
          <p className="text-gray-600 mb-8">
            Request a technical demo tailored to your role.
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