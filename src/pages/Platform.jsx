import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { LogOut, Menu, X } from 'lucide-react';
import IssuerDashboard from '../components/platform/IssuerDashboard.jsx';
import ServicerDashboard from '../components/platform/ServicerDashboard.jsx';
import InvestorDashboard from '../components/platform/InvestorDashboard.jsx';
import TrusteeDashboard from '../components/platform/TrusteeDashboard.jsx';
import RegulatorDashboard from '../components/platform/RegulatorDashboard.jsx';

const roles = [
  { id: 'issuer', label: 'Sponsor / GP', icon: '🏢' },
  { id: 'servicer', label: 'Asset Manager', icon: '⚙️' },
  { id: 'investor', label: 'LP / Investor', icon: '📊' },
  { id: 'trustee', label: 'Trustee / Administrator', icon: '🔐' },
  { id: 'regulator', label: 'Regulator (Simulated)', icon: '🛡️' }
];

export default function Platform() {
  const [role, setRole] = useState(localStorage.getItem('cre-cm-role') || 'issuer');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cre-cm-role', role);
  }, [role]);

  const handleLogout = () => {
    localStorage.removeItem('cre-cm-role');
    setRole('issuer');
  };

  const roleLabel = roles.find(r => r.id === role)?.label || 'Platform';

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg" />
             <div>
               <div className="font-bold text-sm">CRE OS</div>
               <div className="text-xs text-gray-400">Platform Demo</div>
             </div>
           </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="text-sm">
              <span className="text-gray-400">Role:</span>
              <span className="ml-2 font-medium">{roleLabel}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>

          {/* Mobile Role Selector */}
          <div className="md:hidden">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm"
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.icon} {r.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <div className="pt-16 flex">
        {/* Sidebar - Role Selector (Desktop Only) */}
        <div className="hidden md:block w-64 bg-gray-800 border-r border-gray-700 p-6 space-y-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
            Switch Role
          </div>
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                role === r.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{r.icon}</span>
              <span className="text-sm font-medium">{r.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <main className="flex-1">
          {role === 'issuer' && <IssuerDashboard />}
          {role === 'servicer' && <ServicerDashboard />}
          {role === 'investor' && <InvestorDashboard />}
          {role === 'trustee' && <TrusteeDashboard />}
          {role === 'regulator' && <RegulatorDashboard />}
        </main>
      </div>
    </div>
  );
}