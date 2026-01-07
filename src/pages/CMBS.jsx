import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { FileText, Database, Lock, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import CMBSDashboard from '../components/cmbs/CMBSDashboard';

export default function CMBS() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <div className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700 mb-6">
              CMBS Infrastructure
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6 text-center">
            Rebuilding CMBS as<br />Digital Infrastructure
          </h1>
          <p className="text-xl text-gray-600 mb-4 text-center max-w-3xl mx-auto">
            From deal origination to servicing, settlement, and compliance — all on a single programmable platform.
          </p>
          <p className="text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
            CMBS was built on PDFs, spreadsheets, and manual reconciliation.<br />
            This platform turns every CMBS deal into a living digital twin with automated waterfalls, instant auditability, and regulator-ready transparency.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#dashboard"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              View CMBS Dashboard
              <ArrowRight size={20} />
            </a>
            <a
              href="#lifecycle"
              className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-900 rounded-lg font-medium hover:border-gray-400 transition-colors inline-flex items-center justify-center"
            >
              See End-to-End Architecture
            </a>
          </div>
        </div>
      </section>

      {/* Section 1: What the Platform Provides */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Deal Origination & Structuring</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>AI-assisted deal creation</li>
                <li>Capital stack modeling</li>
                <li>Waterfall logic generation</li>
                <li>Structured data from day one</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Database className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Digital Twin & Deal Intelligence</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Real-time deal dashboards</li>
                <li>Capital stack visibility</li>
                <li>Tranche-level economics</li>
                <li>Immutable event history</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Settlement & Ownership Rails</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Tokenized tranche representation</li>
                <li>Instant settlement (simulated)</li>
                <li>Fractional ownership support</li>
                <li>Built for institutional custody</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lock className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Compliance & Audit Infrastructure</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Document ⇄ data traceability</li>
                <li>Regulator-ready views</li>
                <li>Time-stamped audit trails</li>
                <li>Read-only oversight access</li>
              </ul>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-12 italic">
            CMBS, without black boxes.
          </p>
        </div>
      </section>

      {/* Section 2: CMBS Dashboard */}
      <section id="dashboard" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">CMBS Deal Dashboard</h2>
            <p className="text-xl text-gray-600">A living digital twin of every securitization</p>
          </div>

          <CMBSDashboard />
        </div>
      </section>

      {/* Section 3: End-to-End Lifecycle */}
      <section id="lifecycle" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            End-to-End CMBS Lifecycle
          </h2>

          <div className="relative">
            {/* Flow Diagram */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {[
                { label: 'Origination', desc: 'Deal intake & structuring' },
                { label: 'Structuring', desc: 'Capital stack design' },
                { label: 'Issuance', desc: 'Token minting & distribution' },
                { label: 'Settlement', desc: 'Atomic DVP execution' },
                { label: 'Servicing', desc: 'Waterfall automation' },
                { label: 'Compliance', desc: 'Audit & oversight' }
              ].map((stage, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">{idx + 1}</div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">{stage.label}</div>
                    <div className="text-xs text-gray-600">{stage.desc}</div>
                  </div>
                  {idx < 5 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                      <ArrowRight className="text-blue-300" size={20} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <ul className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-blue-600 flex-shrink-0" size={16} />
                  Structured data continuity
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-blue-600 flex-shrink-0" size={16} />
                  No re-keying
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-blue-600 flex-shrink-0" size={16} />
                  No reconciliation gaps
                </li>
              </ul>
            </div>
          </div>

          <p className="text-center text-gray-600 text-sm mt-8 italic">
            "One source of truth across the CMBS lifecycle."
          </p>
        </div>
      </section>

      {/* Section 4: Built for Regulators */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Built for Regulators & Institutions
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              { title: 'Read-only regulator dashboards', desc: 'Full visibility without operational access' },
              { title: 'Full audit trails', desc: 'Every event, timestamped and immutable' },
              { title: 'Event-level transparency', desc: 'From origination to final distribution' },
              { title: 'No opaque models', desc: 'Waterfall logic visible and verifiable' },
              { title: 'No black-box waterfalls', desc: 'All calculations explainable and auditable' },
              { title: 'Institutional custody ready', desc: 'Built for regulated settlement infrastructure' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg p-12 text-center">
            <p className="text-2xl font-light italic mb-2">"Transparency is not a feature.</p>
            <p className="text-2xl font-semibold">It's the foundation."</p>
          </div>
        </div>
      </section>

      {/* Section 5: Why This Matters */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why This Matters
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              'Fewer errors',
              'Faster issuance',
              'Lower operational risk',
              'Reduced legal ambiguity',
              'Real-time oversight',
              'Programmatic compliance'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                <span className="text-gray-900 font-medium">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-xl text-gray-600 italic">
            "CMBS doesn't need reinvention. It needs infrastructure."
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            CMBS, rebuilt as infrastructure
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              to={createPageUrl('Contact')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Request Demo
            </Link>
            <Link
              to={createPageUrl('Platform')}
              className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              View Sample Deal
            </Link>
          </div>

          <p className="text-sm text-gray-500">
            Currently in simulation. Built for institutional deployment.
          </p>
        </div>
      </section>
    </div>
  );
}