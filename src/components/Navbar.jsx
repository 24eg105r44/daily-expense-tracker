import React from 'react';
import { 
  Wallet, 
  Plus, 
  LayoutDashboard, 
  PieChart, 
  Receipt, 
  Users, 
  Repeat, 
  Sun, 
  Moon, 
  Download,
  DollarSign
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  currency, 
  setCurrency, 
  theme, 
  setTheme, 
  onOpenAddModal, 
  onExportCSV 
}) {
  const currencies = [
    { code: 'USD', symbol: '$' },
    { code: 'INR', symbol: '₹' },
    { code: 'EUR', symbol: '€' },
    { code: 'GBP', symbol: '£' },
  ];

  return (
    <header className="navbar">
      <div className="brand">
        <div className="brand-icon">
          <Wallet size={24} />
        </div>
        <div>
          <h1 className="brand-title">Daily Tracker</h1>
          <p className="brand-subtitle">Personal Expenditures & Budget Manager</p>
        </div>
      </div>

      <div className="nav-actions">
        {/* Currency Switcher */}
        <select 
          className="select-input" 
          value={currency} 
          onChange={(e) => setCurrency(e.target.value)}
          title="Select Currency"
        >
          {currencies.map(c => (
            <option key={c.code} value={c.symbol}>
              {c.code} ({c.symbol})
            </option>
          ))}
        </select>

        {/* Theme Toggle */}
        <button 
          className="btn btn-secondary btn-icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title="Toggle Light/Dark Theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Export CSV */}
        <button 
          className="btn btn-secondary btn-sm"
          onClick={onExportCSV}
          title="Export Expenses to CSV"
        >
          <Download size={16} /> Export
        </button>

        {/* Quick Add Expense */}
        <button 
          className="btn btn-primary"
          onClick={onOpenAddModal}
        >
          <Plus size={18} /> Add Expense
        </button>
      </div>
    </header>
  );
}
