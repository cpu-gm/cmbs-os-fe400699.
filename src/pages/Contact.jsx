import React, { useState } from 'react';
import { createPageUrl } from '../utils';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    firm: '',
    role: '',
    email: '',
    useCase: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
      setFormData({ name: '', firm: '', role: '', email: '', useCase: '' });
    }, 1000);
  };

  const roles = [
    'Sponsor / GP',
    'Asset Manager / Servicer',
    'Debt Investor',
    'Equity Investor / LP',
    'Fund Administrator',
    'Trustee',
    'Issuer / Arranger',
    'Broker / ATS Operator',
    'Regulator / Auditor',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Request a Demo
          </h1>
          <p className="text-xl text-gray-600">
            Tell us about your workflow. We'll schedule a technical walkthrough tailored to your role.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="John Smith"
                />
              </div>

              {/* Firm */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Firm / Organization *
                </label>
                <input
                  type="text"
                  name="firm"
                  value={formData.firm}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Goldman Sachs"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Your Role *
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="">Select your role...</option>
                  {roles.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              {/* Use Case */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  What's your primary use case or pain point? *
                </label>
                <textarea
                  name="useCase"
                  value={formData.useCase}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                  placeholder="Tell us about your current CRE capital markets workflow and what challenges you're facing..."
                />
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Request a Demo'}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                We'll follow up within 24 hours with a tailored demo scheduled to your availability.
              </p>
            </form>
          ) : (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 p-12 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Thanks for reaching out</h2>
              <p className="text-lg text-gray-600 mb-8">
                We've received your request and will be in touch within 24 hours to schedule your tailored demo.
              </p>
              <p className="text-sm text-gray-600">
                In the meantime, explore more about <a href={createPageUrl('Product')} className="text-blue-600 hover:text-blue-700 font-medium">our platform</a> or <a href={createPageUrl('Why')} className="text-blue-600 hover:text-blue-700 font-medium">why CRE needs modern infrastructure</a>.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Info Cards */}
      {!submitted && (
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-12 text-center">
              What to expect from your demo
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Customized Walkthrough',
                  description: 'We\'ll focus on the parts of CRE OS most relevant to your role. 15-30 minute overview of capabilities.'
                },
                {
                  title: 'Live System Access',
                  description: 'You\'ll see real settlement workflows, waterfall execution, and investor reporting in action.'
                },
                {
                  title: 'Technical Q&A',
                  description: 'Ask our infrastructure team anything about architecture, compliance, security, and integration points.'
                },
                {
                  title: 'Integration Roadmap',
                  description: 'If relevant, we\'ll discuss how CRE OS integrates with your existing systems and workflows.'
                },
                {
                  title: 'Next Steps',
                  description: 'We\'ll outline a potential pilot or deployment timeline based on your specific needs.'
                },
                {
                  title: 'No Sales Pressure',
                  description: 'We\'re here to answer your questions, not close a deal. If CRE OS doesn\'t fit, we\'ll tell you.'
                }
              ].map((item, idx) => (
                <div key={idx} className="p-6 bg-white rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'What\'s the cost of CRE OS?',
                a: 'Pricing is customized based on deal volume, users, and specific features required. We\'ll discuss this during your demo.'
              },
              {
                q: 'Is this available today?',
                a: 'We\'re in advanced beta with select institutional partners. If you\'d like to be an early participant, we\'d like to talk.'
              },
              {
                q: 'Do we need to change our existing systems?',
                a: 'No. CRE OS is designed to integrate with asset management platforms, fund administrators, broker systems, and custody providers. We\'ll work with your existing tech stack.'
              },
              {
                q: 'How long does implementation take?',
                a: 'Depends on integration complexity. Simple integration: 2-3 months. Complex: 4-6 months. We can discuss your specific timeline in the demo.'
              },
              {
                q: 'What about regulatory approvals?',
                a: 'CRE OS architecture is designed to work within existing regulatory frameworks. We work with your compliance team to ensure alignment.'
              },
              {
                q: 'Is this blockchain "hype"?',
                a: 'No. We use blockchain only where it solves a real problem (immutable settlement records, atomic DVP). The focus is institutional finance, not speculation.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-600 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}