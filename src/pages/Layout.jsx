
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Menu, X } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Product', page: 'Product' },
    { label: 'CMBS', page: 'CMBS' },
    { label: 'How It Works', page: 'HowItWorks' },
    { label: 'For', page: 'For' },
    { label: 'Why', page: 'Why' },
    { label: 'Compliance', page: 'Compliance' },
    { label: 'About', page: 'About' },
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to={createPageUrl('Home')} className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg" />
            <span>CRE OS</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={`text-sm font-medium transition-colors ${
                  currentPageName === item.page
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={createPageUrl('Contact')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Request Demo
            </Link>
            <Link
              to={createPageUrl('Platform')}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Platform Demo
            </Link>
            </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
              {mobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white">
                  <div className="px-6 py-4 space-y-3">
                    {navItems.map((item) => (
                      <Link
                        key={item.page}
                        to={createPageUrl(item.page)}
                        className="block text-sm font-medium text-gray-600 hover:text-gray-900"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      to={createPageUrl('Contact')}
                      className="block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium text-center hover:bg-blue-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Request Demo
                    </Link>
                    <Link
                      to={createPageUrl('Platform')}
                      className="block px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium text-center hover:bg-gray-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Platform Demo
                    </Link>
                  </div>
                </div>
              )}
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 font-bold mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg" />
                <span>CRE OS</span>
              </div>
              <p className="text-sm text-gray-400">
                Infrastructure for CRE capital markets.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to={createPageUrl('Product')} className="hover:text-white transition-colors">Platform</Link></li>
                <li><Link to={createPageUrl('CMBS')} className="hover:text-white transition-colors">CMBS</Link></li>
                <li><Link to={createPageUrl('HowItWorks')} className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link to={createPageUrl('Compliance')} className="hover:text-white transition-colors">Compliance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to={createPageUrl('About')} className="hover:text-white transition-colors">About</Link></li>
                <li><Link to={createPageUrl('Contact')} className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-sm text-gray-400">
              &copy; 2024 CRE OS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
