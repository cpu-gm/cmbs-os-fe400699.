import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X, Loader2, Zap, CheckCircle2, Edit2 } from 'lucide-react';

export default function AICreateDealModal({ onClose, onDealCreated }) {
  const queryClient = useQueryClient();
  
  // Step 1: Deal Intake Form
  const [formData, setFormData] = useState({
    dealName: '',
    assetType: 'multifamily',
    geography: '',
    totalCapital: '',
    debtEquitySplit: '70',
    targetReturns: '',
    holdPeriod: '',
    promoteStructure: '',
    dealDescription: ''
  });
  
  const [step, setStep] = useState('intake'); // intake, structuring, review, activating
  const [proposedStructure, setProposedStructure] = useState(null);
  const [error, setError] = useState('');

  const structuringMutation = useMutation({
    mutationFn: async (data) => {
      const debtAmount = (parseFloat(data.totalCapital) * parseFloat(data.debtEquitySplit)) / 100;
      const equityAmount = parseFloat(data.totalCapital) - debtAmount;
      
      const prompt = `Structure a CRE capital stack for:
- Deal: ${data.dealName} (${data.assetType})
- Location: ${data.geography}
- Total: $${data.totalCapital}M
- Debt: ${data.debtEquitySplit}% ($${debtAmount.toFixed(1)}M)
- Equity: ${100 - data.debtEquitySplit}% ($${equityAmount.toFixed(1)}M)
- Hold: ${data.holdPeriod || 7} years
- Returns: ${data.targetReturns || 'Market rate'}
- Promote: ${data.promoteStructure || '70/30 over 15% IRR'}

Create 3-5 capital classes with realistic market terms. Include Senior Debt, Preferred Equity, Common Equity, and optionally Mezzanine Debt or GP Promote.

Return ONLY valid JSON (no markdown):
{
  "totalCapitalization": ${data.totalCapital},
  "capitalClasses": [
    {"classLabel": "Senior Debt", "classType": "senior_debt", "amount": 100, "couponOrDividend": 7.5, "waterfallPriority": 1, "terms": {"dscr_minimum": 1.25, "ltv_maximum": 65}},
    {"classLabel": "Preferred Equity", "classType": "preferred_equity", "amount": 30, "couponOrDividend": 12, "waterfallPriority": 2, "terms": {}},
    {"classLabel": "Common Equity", "classType": "common_equity", "amount": 20, "couponOrDividend": 0, "waterfallPriority": 3, "terms": {}}
  ],
  "waterfallLogic": "Cash flows distributed in priority order: 1) Senior debt coupon, 2) Preferred equity pref return, 3) Common equity residual",
  "smartContractLogic": "Step 1: Pay senior_debt 7.5% annually\\nStep 2: Pay preferred_equity 12% pref\\nStep 3: Distribute remaining to common_equity",
  "maturityDate": "${new Date(new Date().setFullYear(new Date().getFullYear() + (parseInt(data.holdPeriod) || 7))).toISOString().split('T')[0]}"
}`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: 'object',
          properties: {
            totalCapitalization: { type: 'number' },
            capitalClasses: { 
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  classLabel: { type: 'string' },
                  classType: { type: 'string' },
                  amount: { type: 'number' },
                  couponOrDividend: { type: 'number' },
                  waterfallPriority: { type: 'number' },
                  terms: { type: 'object' }
                }
              }
            },
            waterfallLogic: { type: 'string' },
            smartContractLogic: { type: 'string' },
            maturityDate: { type: 'string' }
          },
          required: ['totalCapitalization', 'capitalClasses', 'waterfallLogic', 'maturityDate']
        }
      });
      return response;
    },
    onSuccess: (data) => {
      setProposedStructure(data);
      setStep('review');
      setError('');
    },
    onError: (err) => {
      console.error('Structure generation error:', err);
      setError(`Failed to generate capital structure: ${err.message || 'Please try again'}`);
      setStep('intake');
    }
  });

  const activationMutation = useMutation({
    mutationFn: async ({ formData, structure }) => {
      const dealId = `CRE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Create Deal entity
      const deal = await base44.entities.Deal.create({
        name: formData.dealName,
        dealId,
        status: 'active',
        type: 'mixed_capital_stack',
        assetType: formData.assetType,
        totalCapitalization: structure.totalCapitalization,
        propertyTypes: [formData.assetType],
        geography: formData.geography.split(',').map(s => s.trim()),
        maturityDate: structure.maturityDate,
        description: formData.dealDescription || `${formData.dealName} - ${formData.assetType} deal`
      });

      // Create CapitalClass entities
      const capitalClassPromises = structure.capitalClasses.map((cc, idx) => 
        base44.entities.CapitalClass.create({
          dealId: deal.id,
          classType: cc.classType,
          classLabel: cc.classLabel,
          amount: cc.amount,
          originalAmount: cc.amount,
          couponOrDividend: cc.couponOrDividend,
          waterfallPriority: cc.waterfallPriority,
          status: 'funded',
          terms: cc.terms || {}
        })
      );
      
      const capitalClasses = await Promise.all(capitalClassPromises);

      // Create default Waterfall
      const waterfall = await base44.entities.Waterfall.create({
        dealId: deal.id,
        name: 'Cash Flow Distribution Waterfall',
        type: 'cash_flow',
        status: 'pending',
        triggerType: 'scheduled',
        triggerValue: 'Monthly on 15th',
        sequence: structure.capitalClasses.map((cc, idx) => ({
          step: idx + 1,
          capitalClassId: capitalClasses[idx].id,
          percentage: 100,
          description: `Pay ${cc.classLabel} - ${cc.couponOrDividend}%`
        }))
      });

      return { deal, capitalClasses, waterfall };
    },
    onSuccess: ({ deal }) => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
      queryClient.invalidateQueries({ queryKey: ['capitalClasses'] });
      queryClient.invalidateQueries({ queryKey: ['waterfalls'] });
      onDealCreated?.(deal);
      onClose();
    },
    onError: (err) => {
      setError('Failed to activate deal. Please try again.');
      setStep('review');
    }
  });

  const handleSubmitIntake = async (e) => {
    e.preventDefault();
    setStep('structuring');
    structuringMutation.mutate(formData);
  };

  const handleActivate = async () => {
    setStep('activating');
    activationMutation.mutate({ formData, structure: proposedStructure });
  };

  const handleEditCapitalClass = (index, field, value) => {
    const updated = { ...proposedStructure };
    updated.capitalClasses[index][field] = parseFloat(value) || value;
    setProposedStructure(updated);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700 sticky top-0 bg-gray-800">
          <div className="flex items-center gap-2">
            <Zap size={24} className="text-blue-400" />
            <h2 className="text-2xl font-bold">AI Deal Creation</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Step 1: Deal Intake Form */}
          {step === 'intake' && (
            <form onSubmit={handleSubmitIntake} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Deal Name *</label>
                  <input
                    type="text"
                    value={formData.dealName}
                    onChange={(e) => setFormData({...formData, dealName: e.target.value})}
                    required
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Dallas Multifamily Portfolio"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Asset Type *</label>
                  <select
                    value={formData.assetType}
                    onChange={(e) => setFormData({...formData, assetType: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="multifamily">Multifamily</option>
                    <option value="office">Office</option>
                    <option value="retail">Retail</option>
                    <option value="industrial">Industrial</option>
                    <option value="hospitality">Hospitality</option>
                    <option value="mixed_use">Mixed Use</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Geography *</label>
                  <input
                    type="text"
                    value={formData.geography}
                    onChange={(e) => setFormData({...formData, geography: e.target.value})}
                    required
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Dallas, Austin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Total Capital Required ($M) *</label>
                  <input
                    type="number"
                    value={formData.totalCapital}
                    onChange={(e) => setFormData({...formData, totalCapital: e.target.value})}
                    required
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="150"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Debt/Equity Split (% Debt) *</label>
                  <input
                    type="number"
                    value={formData.debtEquitySplit}
                    onChange={(e) => setFormData({...formData, debtEquitySplit: e.target.value})}
                    required
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="70"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Target Returns</label>
                  <input
                    type="text"
                    value={formData.targetReturns}
                    onChange={(e) => setFormData({...formData, targetReturns: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="LP: 12% pref, GP: 18% IRR hurdle"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Hold Period (years)</label>
                  <input
                    type="number"
                    value={formData.holdPeriod}
                    onChange={(e) => setFormData({...formData, holdPeriod: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="7"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Sponsor Promote Structure</label>
                  <input
                    type="text"
                    value={formData.promoteStructure}
                    onChange={(e) => setFormData({...formData, promoteStructure: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="70/30 over 18% IRR"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Describe the Deal (Optional - AI Assisted)</label>
                <textarea
                  value={formData.dealDescription}
                  onChange={(e) => setFormData({...formData, dealDescription: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 h-24 resize-none"
                  placeholder="Paste an investment memo, term sheet, or describe the deal in plain English.&#10;&#10;Example: '$150M Class A multifamily acquisition in Dallas. 65% senior loan at SOFR + 275, 10-year term. 12% LP pref with 70/30 promote over 18% IRR…'"
                />
              </div>

              {error && <div className="text-sm text-red-400 bg-red-900/20 border border-red-700 rounded p-3">{error}</div>}
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!formData.dealName || !formData.totalCapital}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
                >
                  Generate Capital Stack with AI
                </button>
              </div>
            </form>
          )}

          {/* Step 2: AI Structuring (Loading) */}
          {step === 'structuring' && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 size={48} className="text-blue-400 animate-spin mb-4" />
              <p className="text-gray-300 font-medium text-lg">AI Structuring Engine Running...</p>
              <p className="text-gray-400 text-sm mt-2">Analyzing deal parameters and generating capital stack</p>
            </div>
          )}

          {/* Step 3: Review & Approve */}
          {step === 'review' && proposedStructure && (
            <div className="space-y-6">
              <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 flex items-start gap-3">
                <div className="text-yellow-400 text-2xl">⚠️</div>
                <div>
                  <h3 className="font-semibold text-yellow-300 mb-1">AI-Generated Structure - Human Review Required</h3>
                  <p className="text-sm text-gray-300">Review and adjust the proposed capital stack below before activation.</p>
                </div>
              </div>

              {/* Capital Stack Table */}
              <div className="bg-gray-700 rounded-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-600 flex items-center justify-between">
                  <h3 className="font-semibold text-white">Proposed Capital Stack</h3>
                  <span className="text-sm text-gray-400">Total: ${proposedStructure.totalCapitalization}M</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-600">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-300 uppercase">Priority</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-300 uppercase">Class</th>
                        <th className="px-4 py-2 text-right text-xs font-semibold text-gray-300 uppercase">Amount ($M)</th>
                        <th className="px-4 py-2 text-right text-xs font-semibold text-gray-300 uppercase">Rate (%)</th>
                        <th className="px-4 py-2 text-center text-xs font-semibold text-gray-300 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-600">
                      {proposedStructure.capitalClasses.map((cc, idx) => (
                        <tr key={idx} className="hover:bg-gray-650">
                          <td className="px-4 py-3 text-white text-sm">{cc.waterfallPriority}</td>
                          <td className="px-4 py-3">
                            <div>
                              <div className="text-white font-medium text-sm">{cc.classLabel}</div>
                              <div className="text-xs text-gray-400">{cc.classType.replace(/_/g, ' ')}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <input
                              type="number"
                              value={cc.amount}
                              onChange={(e) => handleEditCapitalClass(idx, 'amount', e.target.value)}
                              className="w-20 px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500"
                            />
                          </td>
                          <td className="px-4 py-3 text-right">
                            <input
                              type="number"
                              value={cc.couponOrDividend}
                              onChange={(e) => handleEditCapitalClass(idx, 'couponOrDividend', e.target.value)}
                              className="w-16 px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm text-right focus:outline-none focus:border-blue-500"
                              step="0.1"
                            />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button className="text-gray-400 hover:text-white transition-colors">
                              <Edit2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Waterfall Logic */}
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">Waterfall Logic (Plain English)</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{proposedStructure.waterfallLogic}</p>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">Smart Contract Logic (Abstracted)</h4>
                  <pre className="text-xs text-gray-300 font-mono bg-gray-800 p-3 rounded overflow-x-auto whitespace-pre-wrap">
{proposedStructure.smartContractLogic}
                  </pre>
                </div>
              </div>

              {error && <div className="text-sm text-red-400 bg-red-900/20 border border-red-700 rounded p-3">{error}</div>}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-600">
                <button
                  onClick={() => setStep('intake')}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                >
                  Back to Form
                </button>
                <button
                  onClick={handleActivate}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={16} />
                  Activate Deal
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Activating */}
          {step === 'activating' && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 size={48} className="text-green-400 animate-spin mb-4" />
              <p className="text-gray-300 font-medium text-lg">Activating Deal...</p>
              <div className="mt-6 space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-400" />
                  <span>Creating deal entity</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-400" />
                  <span>Generating capital classes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-400" />
                  <span>Building waterfall rules</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-400" />
                  <span>Initializing cap table</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}