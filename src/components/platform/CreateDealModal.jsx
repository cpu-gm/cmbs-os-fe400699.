import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X, Loader2 } from 'lucide-react';

export default function CreateDealModal({ onClose }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    poolBalance: '',
    loanCount: '',
    propertyTypes: ['office'],
    geography: ['NY'],
    maturityDate: ''
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Deal.create({
      ...data,
      dealId: `CMBS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      status: 'draft',
      poolBalance: parseFloat(data.poolBalance),
      loanCount: parseInt(data.loanCount)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
      onClose();
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-lg max-w-2xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Create New CMBS Deal</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Deal Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Deal Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g., CMBS 2026-1"
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Pool Balance & Loan Count */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Pool Balance ($M) *</label>
              <input
                type="number"
                value={formData.poolBalance}
                onChange={(e) => setFormData({...formData, poolBalance: e.target.value})}
                placeholder="e.g., 500"
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Number of Loans *</label>
              <input
                type="number"
                value={formData.loanCount}
                onChange={(e) => setFormData({...formData, loanCount: e.target.value})}
                placeholder="e.g., 45"
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Maturity Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Expected Maturity *</label>
            <input
              type="date"
              value={formData.maturityDate}
              onChange={(e) => setFormData({...formData, maturityDate: e.target.value})}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Property Types */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">Property Types</label>
            <div className="space-y-2">
              {['Office', 'Retail', 'Industrial', 'Multifamily', 'Hotel'].map(type => (
                <label key={type} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.propertyTypes.includes(type.toLowerCase())}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          propertyTypes: [...formData.propertyTypes, type.toLowerCase()]
                        });
                      } else {
                        setFormData({
                          ...formData,
                          propertyTypes: formData.propertyTypes.filter(t => t !== type.toLowerCase())
                        });
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-300 text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600 disabled:opacity-50 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {createMutation.isPending && <Loader2 size={16} className="animate-spin" />}
              {createMutation.isPending ? 'Creating...' : 'Create Deal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}