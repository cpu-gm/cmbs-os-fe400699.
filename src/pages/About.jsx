import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            About CRE Capital Markets OS
          </h1>
          <p className="text-xl text-gray-600">
            Rebuilding commercial real estate capital markets infrastructure for the digital era.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8 text-center">
            We believe commercial real estate capital markets deserve the same technological rigor as modern equities, derivatives, and payment systems.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed text-center">
            CRE capital markets span trillions in debt, equity, and hybrid structures—but they run on fragmented infrastructure built decades ago. 
            Manual capital calls. Disconnected debt and equity systems. Opaque cap tables. These aren't features—they're legacy costs.
          </p>
        </div>
      </section>

      {/* What We're Building */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What We're Building</h2>
          
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Unified Infrastructure</h3>
                <p className="text-gray-600 leading-relaxed">
                  CRE Capital Markets OS is not a fintech platform. It's infrastructure—boring, institutional-grade, designed for GPs, LPs, administrators, and regulators to feel comfortable.
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <p className="text-gray-700">
                  No retail participation. No "moon" language. No speculation. Just better technology for how CRE capital markets actually work—across the full stack.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-white rounded-lg p-8 border border-gray-200 md:order-2">
                <p className="text-gray-700">
                  We've spent years understanding how CRE capital markets actually work—from deal origination to distributions, across debt and equity. We've talked to sponsors, GPs, LPs, asset managers, and fund administrators.
                </p>
              </div>
              <div className="md:order-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Built on Domain Expertise</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every line of code is informed by real CRE finance knowledge. We're not retrofitting blockchain to real estate. 
                  We're building CRE capital markets infrastructure that happens to use blockchain where it's valuable.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Compliance-First Design</h3>
                <p className="text-gray-600 leading-relaxed">
                  Regulatory compliance isn't a feature we add later. It's baked in from day one. 
                  KYC, AML, audit trails, permissioned access—these are fundamental to how the system works.
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <p className="text-gray-700">
                  We work with lawyers, compliance teams, and fund administrators to ensure CRE Capital Markets OS fits within existing legal frameworks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Approach</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Start with the Problem',
                description: 'Every feature solves a real inefficiency in CRE capital markets. No theoretical improvements. No feature creep.'
              },
              {
                title: 'Institutional by Default',
                description: 'Designed for GPs, LPs, fund administrators, and regulators. If it doesn\'t feel professional, it doesn\'t ship.'
              },
              {
                title: 'Modular Infrastructure',
                description: 'CRE Capital Markets OS is built as a platform, not a monolith. Different institutions have different needs. We accommodate that.'
              },
              {
                title: 'Transparency Over Hype',
                description: 'We talk about what we can do, what we can\'t do, and what we\'re building next. No vaporware.'
              },
              {
                title: 'Regulatory Alignment',
                description: 'We work with regulators, not around them. Every feature is designed to be compatible with existing rules.'
              },
              {
                title: 'Long-Term Partnership',
                description: 'Our success depends on yours. We\'re building for institutional longevity, not quarterly gains.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Opportunity */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Opportunity Ahead</h2>

          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Scale</h3>
              <p className="text-gray-600">
                Trillions in CRE capital across debt, equity, and hybrid structures. If unified infrastructure saves even 10 bps in operational costs, that's billions in value annually.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Institutional Demand</h3>
              <p className="text-gray-600">
                Sponsors want faster closes. Asset managers want automation. LPs want transparent cap tables. Administrators want real-time visibility. 
                There's alignment across the ecosystem.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Technology Readiness</h3>
              <p className="text-gray-600">
                Regulated stablecoins exist. Blockchain networks are reliable. Regulators have clarified the rules. 
                The technology needed to modernize CRE capital markets is here. It's just not deployed holistically yet.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">First-Mover Advantage</h3>
              <p className="text-gray-600">
                The institution that unifies CRE capital markets infrastructure first will set the standard for the entire industry. 
                That's a significant competitive moat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Philosophy */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How We Think</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Systems Over Solutions</h3>
              <p className="text-gray-600">
                We think in systems. How do capital flows work across debt and equity? 
                How do compliance controls get enforced? How do administrators verify waterfall accuracy? 
                We design the entire system, not individual features.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Institutional First</h3>
              <p className="text-gray-600">
                Every design decision is made with institutional users in mind. 
                If it makes sense for a GP, LP, or fund administrator, we build it. If it's speculative or retail-focused, we don't.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Boring is Beautiful</h3>
              <p className="text-gray-600">
                The best infrastructure feels boring. It just works. Regulations are followed. Data is accurate. 
                Settlements are final. There's no drama. That's the goal.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Long-Term Thinking</h3>
              <p className="text-gray-600">
                We're building for 20 years, not 2. That means regulatory compliance, security, and reliability are non-negotiable. 
                Short-term hype is irrelevant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Let's talk about modernizing CRE capital markets.
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Whether you're a sponsor, GP, LP, asset manager, or administrator, we'd like to understand your workflow and pain points.
          </p>
          <Link
            to={createPageUrl('Contact')}
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
          >
            Start a Conversation <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}