import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ChevronDown } from 'lucide-react';

export default function CapitalStackVisualizer({ dealId }) {
  const { data: capitalClasses = [] } = useQuery({
    queryKey: ['capitalClasses', dealId],
    queryFn: () => base44.entities.CapitalClass.filter({ dealId }),
    initialData: []
  });

  const { data: equityHoldings = [] } = useQuery({
    queryKey: ['equityHoldings', dealId],
    queryFn: () => base44.entities.EquityHolding.filter({ dealId }),
    initialData: []
  });

  const typeColors = {
    senior_debt: 'from-green-600 to-green-700',
    mezzanine_debt: 'from-blue-600 to-blue-700',
    preferred_equity: 'from-purple-600 to-purple-700',
    common_equity: 'from-orange-600 to-orange-700',
    promote: 'from-red-600 to-red-700'
  };

  const typeLabels = {
    senior_debt: 'Senior Debt',
    mezzanine_debt: 'Mezz Debt',
    preferred_equity: 'Preferred Equity',
    common_equity: 'Common Equity',
    promote: 'Promote/Carry'
  };

  const totalCapital = capitalClasses.reduce((sum, c) => sum + (c.amount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Waterfall Bar Chart */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Capital Stack</h3>
        <div className="space-y-3">
          {capitalClasses.sort((a, b) => a.waterfallPriority - b.waterfallPriority).map((cap) => {
            const percentage = totalCapital > 0 ? (cap.amount / totalCapital) * 100 : 0;
            return (
              <div key={cap.id}>
                <div className="flex justify-between mb-1">
                  <div>
                    <span className="font-medium text-gray-900">{cap.classLabel}</span>
                    <span className="text-xs text-gray-500 ml-2">({typeLabels[cap.classType]})</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900">${cap.amount}M</span>
                    <span className="text-xs text-gray-500 ml-2">{percentage.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${typeColors[cap.classType]}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                {cap.couponOrDividend && (
                  <div className="text-xs text-gray-600 mt-1">
                    {cap.classType.includes('debt') ? 'Coupon' : 'Dividend'}: {cap.couponOrDividend}%
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between font-bold">
            <span>Total Capitalization</span>
            <span>${totalCapital}M</span>
          </div>
        </div>
      </div>

      {/* Equity Holdings */}
      {equityHoldings.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Equity Holders</h3>
          <div className="space-y-2 bg-gray-50 rounded-lg p-4">
            {equityHoldings.map((holding) => (
              <div key={holding.id} className="flex justify-between items-center pb-2 border-b border-gray-200 last:border-b-0">
                <div>
                  <div className="font-medium text-gray-900">{holding.holderEmail}</div>
                  <div className="text-xs text-gray-500 capitalize">{holding.holderType}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{holding.percentage}%</div>
                  {holding.promotePercentage && (
                    <div className="text-xs text-red-600">Promote: {holding.promotePercentage}%</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Waterfall Priority */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Distribution Waterfall</h3>
        <div className="space-y-2">
          {capitalClasses
            .sort((a, b) => a.waterfallPriority - b.waterfallPriority)
            .map((cap, idx) => (
              <div key={cap.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{cap.classLabel}</div>
                  <div className="text-xs text-gray-500">{typeLabels[cap.classType]}</div>
                </div>
                {cap.couponOrDividend && (
                  <div className="text-sm font-semibold text-gray-900">
                    {cap.couponOrDividend}%
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}