import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { CheckCircle2, Lock, Shield, Eye, ArrowRight } from 'lucide-react';

export default function Compliance() {
  const features = [
    {
      icon: Lock,
      title: 'Regulated Rails',
      description: 'Built on compliant stablecoin infrastructure and permissioned blockchain networks.',
      details: [
        'USDC and other regulated stablecoins',
        'Permissioned network with institutional node operators',
        'No public blockchain, no retail exposure',
        'Full custody and settlement compliance'
      ]
    },
    {
      icon: Shield,
      title: 'KYC / AML Compliance',
      description: 'Programmatic identity verification and sanctions screening at settlement time.',
      details: [
        'Identity verification before any transfer',
        'Automated sanctions list checking (OFAC, etc.)',
        'Jurisdiction-aware transfer restrictions',
        'Audit trail for every compliance check'
      ]
    },
    {
      icon: Eye,
      title: 'Regulatory Transparency',
      description: 'Real-time visibility for regulators without custom data feeds or delays.',
      details: [
        'Real-time settlement data to SEC and FINRA',
        'ATS-compatible architecture for secondary markets',
        'Immutable audit logs accessible to examiners',
        'No data conflicts or reconciliation disputes'
      ]
    },
    {
      icon: CheckCircle2,
      title: 'Auditability & Trust',
      description: 'Cryptographically signed settlement records eliminate audit friction.',
      details: [
        'Immutable transaction records on distributed ledger',
        'Cryptographic proof of settlement accuracy',
        'Instant audit report generation',
        'Third-party trustee and auditor access'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Compliance by Design
          </h1>
          <p className="text-xl text-gray-600">
            Built for lawyers and regulators. Programmatic controls. Immutable records. Zero ambiguity.
          </p>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="p-8 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                  <div className="flex items-start gap-4 mb-6">
                    <Icon size={32} className="text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {feature.details.map((detail, didx) => (
                      <li key={didx} className="flex gap-3 text-sm">
                        <span className="text-blue-600 flex-shrink-0">✓</span>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Regulatory Alignment */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Aligned with Regulatory Frameworks
          </h2>

          <div className="space-y-8">
            {[
              {
                framework: 'SEC Regulation M & ATS Rules',
                detail: 'ATS-compatible settlement infrastructure for secondary CMBS trading. Real-time reporting of trades and positions.',
              },
              {
                framework: 'FINRA Rules 4512 & 4513',
                detail: 'KYC and beneficial ownership verification integrated into every settlement. Audit trail for compliance examiners.',
              },
              {
                framework: 'FinCEN & OFAC Compliance',
                detail: 'Automated sanctions list screening before every transfer. Jurisdictional restrictions enforced at contract level.',
              },
              {
                framework: 'SEC Custody Rule 17a-3',
                detail: 'Immutable settlement records serve as proof of custody and transfer. Third-party auditor access built in.',
              },
              {
                framework: 'Federal Reserve Wire Act Compliance',
                detail: 'Settlement executed through regulated stablecoin rails with full custody compliance and settlement finality.',
              },
              {
                framework: 'REIT & Investment Company Compliance',
                detail: 'Real-time settlement and earnings data for REIT tax reporting and fund accounting.',
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-white rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">{item.framework}</h3>
                <p className="text-gray-600 text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Permissioning */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Permissioned Access & Data Security
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Role-Based Access Control</h3>
              <p className="text-gray-600 mb-6">
                Different participants have different visibility into settlement data. Issuers see the full deal. 
                Investors see only their tranche performance. Regulators see everything.
              </p>
              <ul className="space-y-3">
                {[
                  'Deal structurers: Full pool & tranche visibility',
                  'Investors: Performance data for their holdings only',
                  'Servicers: Cash flow and servicing action history',
                  'Trustees: Immutable settlement records',
                  'Regulators: Comprehensive settlement transparency'
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-700">
                    <span className="text-blue-600">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Data Integrity & Cryptography</h3>
              <p className="text-gray-600 mb-6">
                Every settlement is cryptographically signed. Data cannot be altered retroactively. 
                Audit trails are immutable by design.
              </p>
              <ul className="space-y-3">
                {[
                  'SHA-256 cryptographic hashing for data integrity',
                  'Digital signatures for every settlement action',
                  'Distributed consensus for settlement finality',
                  'Time-stamped audit logs with no retroactive changes',
                  'Multi-party key management for critical operations'
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-700">
                    <span className="text-blue-600">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Third-Party Validation */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Built for Third-Party Validation
          </h2>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            CMBS OS is designed from day one for trustee oversight, regulatory examination, and independent audit. 
            No black boxes. No proprietary systems. Every settlement is verifiable by external parties.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                role: 'Auditors',
                description: 'Access immutable settlement records. Generate compliance reports. Verify waterfall accuracy in seconds, not weeks.'
              },
              {
                role: 'Regulators',
                description: 'Real-time visibility into settlement activity, KYC/AML enforcement, and audit trails. No custom data feeds needed.'
              },
              {
                role: 'Trustees',
                description: 'Witness settlement execution. Verify cash flows. Access immutable records. Reduce operational burden by 60%+.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-white rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.role}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Institutional-Grade Security
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Infrastructure Security',
                points: [
                  'SOC 2 Type II certified infrastructure',
                  'Multi-region geographic redundancy',
                  'End-to-end encryption for data in transit',
                  '24/7 security monitoring and incident response',
                  'Annual penetration testing and security audits'
                ]
              },
              {
                title: 'Access & Identity',
                points: [
                  'Hardware security keys for all admin access',
                  'Zero-trust network architecture',
                  'Mutual TLS for all system-to-system communication',
                  'Audit logs for every administrative action',
                  'Session management and timeout controls'
                ]
              }
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">{item.title}</h3>
                <ul className="space-y-4">
                  {item.points.map((point, pidx) => (
                    <li key={pidx} className="flex gap-3">
                      <CheckCircle2 size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulator View Section */}
      <section className="py-20 px-6 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Built for Regulatory Oversight
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            CRE OS provides regulators, trustees, and auditors with read-only visibility into all settlement activity, compliance enforcement, and immutable audit trails—without requiring custom data requests.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-Time Access</h3>
              <p className="text-gray-600 mb-4">
                Regulators can view settlement activity, compliance checks, and covenant status in real-time without operational delays or manual reporting.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Immutable settlement ledger</li>
                <li>✓ Live compliance enforcement panel</li>
                <li>✓ Historical state reconstruction</li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-lg border border-green-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Read-Only by Design</h3>
              <p className="text-gray-600 mb-4">
                Oversight access is strictly read-only. No ability to initiate transactions, modify records, or alter settlement outcomes.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Transparency without control</li>
                <li>✓ Cryptographic proof of all activity</li>
                <li>✓ Audit-ready exports (PDF/CSV)</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-900 text-white rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Try the Simulated Regulator View</h3>
            <p className="text-gray-400 mb-6">
              See exactly what regulators, trustees, and auditors would see when accessing the platform.
            </p>
            <Link
              to={createPageUrl('Platform')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              View Platform Demo
              <ArrowRight size={20} />
            </Link>
            <p className="text-xs text-gray-500 mt-4">
              Select "Regulator (Simulated)" from the role switcher in the demo.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Talk to our compliance team
          </h2>
          <p className="text-gray-600 mb-8">
            Understand the regulatory architecture and controls built into CMBS OS.
          </p>
          <Link
            to={createPageUrl('Contact')}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Schedule a Compliance Review
          </Link>
        </div>
      </section>
    </div>
  );
}