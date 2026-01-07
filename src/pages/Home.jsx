import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowRight } from 'lucide-react';

const LifecycleDiagram = () => {
  const steps = [
    { label: 'Deal Origination', icon: '🧱', caption: 'Deal intake, underwriting, and capital stack design across debt and equity' },
    { label: 'Capital Stack', icon: '📑', caption: 'Senior debt, mezzanine, preferred equity, common equity, and JV structures' },
    { label: 'Operations', icon: '⚙️', caption: 'Servicing, asset management, covenant monitoring, and reporting' },
    { label: 'Distributions', icon: '💧', caption: 'Automated waterfalls, promotes, capital calls, and cash-flow logic' },
    { label: 'Liquidity', icon: '🔄', caption: 'Permissioned secondary transfers, price discovery, and compliant settlement' },
  ];

  return (
    <div className="w-full overflow-x-auto py-8">
      <div className="flex items-center justify-center gap-4 min-w-full px-4">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center">
            <div className="flex flex-col items-center group relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center text-2xl border border-blue-200">
                {step.icon}
              </div>
              <p className="text-xs font-medium text-gray-700 mt-2 text-center w-20">{step.label}</p>
              <div className="absolute top-full mt-6 left-1/2 -translate-x-1/2 w-40 bg-gray-900 text-white text-xs rounded-lg p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {step.caption}
              </div>
            </div>
            {idx < steps.length - 1 && (
              <div className="hidden sm:flex items-center gap-2 mx-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-blue-300"></div>
                <ArrowRight size={16} className="text-blue-600" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            The Operating System for
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              CRE Capital Markets
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Unified infrastructure for debt, equity, and everything in between. Deal creation through exit. All stakeholders. One system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to={createPageUrl('Contact')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Request a Demo
            </Link>
            <Link
              to={createPageUrl('HowItWorks')}
              className="px-8 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              View Full Workflow
            </Link>
          </div>

          {/* Lifecycle Diagram */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <LifecycleDiagram />
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why CRE Capital Markets Need Modern Rails
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Unified Capital Stack',
                description: 'Debt, equity, promotes, and hybrids all on one system. One source of truth for sponsors, GPs, LPs, and regulators.'
              },
              {
                title: 'Real-Time Deal Operations',
                description: 'Live cap tables, instant distributions, covenant monitoring, and capital calls—all coordinated in real-time.'
              },
              {
                title: 'Atomic Settlement',
                description: 'Instant DVP on stablecoin rails. No T+3 delays. No float gaps. No reconciliation errors.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Full-Stack CRE Infrastructure
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Deal Origination & Structuring',
                description: 'AI-powered capital stack design. From first LOI through full legal documentation. Debt + equity coordination.'
              },
              {
                title: 'Live Deal Operations',
                description: 'Real-time cap tables, covenant tracking, performance monitoring, and automated waterfall execution across all classes.'
              },
              {
                title: 'Capital Coordination',
                description: 'Instant capital calls, co-investment coordination, LP management, and promote calculations all on-chain.'
              },
              {
                title: 'Settlement & Treasury',
                description: 'Atomic DVP on stablecoin rails. Instant secondary market settlements. Float management. Fee accounting.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-xl bg-white border border-gray-200 hover:shadow-sm transition-all">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to become infrastructure-first in CRE?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            See how sponsors, GPs, LPs, and servicers coordinate on one operating system. From LOI to exit.
          </p>
          <Link
            to={createPageUrl('Contact')}
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-block"
          >
            Request a Demo
          </Link>
        </div>
      </section>
    </div>
  );
}