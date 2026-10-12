import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import DashboardOverview from './components/DashboardOverview';
import AnalyticsCharts from './components/AnalyticsCharts';
import TransactionList from './components/TransactionList';
import ExpenseFormModal from './components/ExpenseFormModal';
import SharedSplitModal from './components/SharedSplitModal';
import RecurringExpensesList from './components/RecurringExpensesList';

import { 
  DEFAULT_CATEGORIES, 
  INITIAL_EXPENSES, 
  INITIAL_RECURRING, 
  SAMPLE_SHARED_SPLITS 
} from './data/initialData';

import { LayoutDashboard, PieChart, Receipt, Users, Repeat, RotateCcw } from 'lucide-react';

export default function App() {
  // State Initialization with localStorage persistence
  const [theme, setTheme] = useState(() => localStorage.getItem('et_theme') || 'dark');
  const [currency, setCurrency] = useState(() => localStorage.getItem('et_currency') || '$');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('et_categories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('et_expenses');
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });

  const [recurring, setRecurring] = useState(() => {
    const saved = localStorage.getItem('et_recurring');
    return saved ? JSON.parse(saved) : INITIAL_RECURRING;
  });

  const [splits, setSplits] = useState(() => {
    const saved = localStorage.getItem('et_splits');
    return saved ? JSON.parse(saved) : SAMPLE_SHARED_SPLITS;
  });

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('et_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('et_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('et_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('et_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('et_recurring', JSON.stringify(recurring));
  }, [recurring]);

  useEffect(() => {
    localStorage.setItem('et_splits', JSON.stringify(splits));
  }, [splits]);

  // Actions
  const handleSaveExpense = (expenseData) => {
    if (expenseToEdit) {
      setExpenses(expenses.map(e => e.id === expenseData.id ? expenseData : e));
    } else {
      setExpenses([expenseData, ...expenses]);
      // Trigger subtle celebration
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
    }
  };

  const handleDeleteExpense = (id) => {
    if (window.confirm('Are you sure you want to delete this expenditure entry?')) {
      setExpenses(expenses.filter(e => e.id !== id));
    }
  };

  const handleQuickAdd = (preset) => {
    const newExpense = {
      id: `exp-${Date.now()}`,
      description: preset.label,
      merchant: preset.label,
      amount: preset.amount,
      categoryId: preset.categoryId,
      paymentMethod: 'upi',
      date: new Date().toISOString(),
      notes: 'Quick logged expenditure',
      receiptAttached: false,
    };
    setExpenses([newExpense, ...expenses]);
    confetti({ particleCount: 25, spread: 50, origin: { y: 0.8 } });
  };

  const handlePostRecurring = (rec) => {
    const newExpense = {
      id: `exp-${Date.now()}`,
      description: rec.title,
      merchant: rec.title,
      amount: rec.amount,
      categoryId: rec.categoryId,
      paymentMethod: 'bank',
      date: new Date().toISOString(),
      notes: `Recurring ${rec.frequency} payment logged`,
      receiptAttached: false,
    };
    setExpenses([newExpense, ...expenses]);
    alert(`Logged ${rec.title} (${currency}${rec.amount.toFixed(2)}) as today's expense!`);
  };

  const handleResetData = () => {
    if (window.confirm('Reset expense data to default normal person sample expenditures?')) {
      setExpenses(INITIAL_EXPENSES);
      setCategories(DEFAULT_CATEGORIES);
      setRecurring(INITIAL_RECURRING);
      setSplits(SAMPLE_SHARED_SPLITS);
      localStorage.clear();
    }
  };

  const handleExportCSV = () => {
    const headers = ['Date', 'Description', 'Merchant', 'Amount', 'Category', 'Payment Method', 'Notes'];
    const rows = expenses.map(e => {
      const catName = categories.find(c => c.id === e.categoryId)?.name || '';
      return [
        `"${new Date(e.date).toLocaleString()}"`,
        `"${e.description.replace(/"/g, '""')}"`,
        `"${(e.merchant || '').replace(/"/g, '""')}"`,
        e.amount,
        `"${catName}"`,
        `"${e.paymentMethod}"`,
        `"${(e.notes || '').replace(/"/g, '""')}"`
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Daily_Expenditures_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={currency}
        setCurrency={setCurrency}
        theme={theme}
        setTheme={setTheme}
        onOpenAddModal={() => {
          setExpenseToEdit(null);
          setIsFormOpen(true);
        }}
        onExportCSV={handleExportCSV}
      />

      {/* Primary Tab Navigation Bar */}
      <div className="tabs-nav">
        <button 
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard size={16} /> Overview & Budgets
        </button>
        <button 
          className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <PieChart size={16} /> Visual Analytics
        </button>
        <button 
          className={`tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          <Receipt size={16} /> Expense Log ({expenses.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'splits' ? 'active' : ''}`}
          onClick={() => setActiveTab('splits')}
        >
          <Users size={16} /> Shared Group Split
        </button>
        <button 
          className={`tab-btn ${activeTab === 'recurring' ? 'active' : ''}`}
          onClick={() => setActiveTab('recurring')}
        >
          <Repeat size={16} /> Recurring Bills
        </button>
      </div>

      {/* Main Tab Views */}
      <main>
        {activeTab === 'dashboard' && (
          <DashboardOverview 
            expenses={expenses}
            categories={categories}
            currency={currency}
            onQuickAdd={handleQuickAdd}
            onOpenAddModal={() => {
              setExpenseToEdit(null);
              setIsFormOpen(true);
            }}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsCharts 
            expenses={expenses}
            categories={categories}
            currency={currency}
          />
        )}

        {activeTab === 'transactions' && (
          <TransactionList 
            expenses={expenses}
            categories={categories}
            currency={currency}
            onEditExpense={(exp) => {
              setExpenseToEdit(exp);
              setIsFormOpen(true);
            }}
            onDeleteExpense={handleDeleteExpense}
            onOpenAddModal={() => {
              setExpenseToEdit(null);
              setIsFormOpen(true);
            }}
          />
        )}

        {activeTab === 'splits' && (
          <SharedSplitModal 
            splits={splits}
            setSplits={setSplits}
            currency={currency}
          />
        )}

        {activeTab === 'recurring' && (
          <RecurringExpensesList 
            recurring={recurring}
            categories={categories}
            currency={currency}
            onPostRecurring={handlePostRecurring}
          />
        )}
      </main>

      {/* Footer & Reset option */}
      <footer style={{
        marginTop: '3rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        <div>
          ExpenseTracker v1.0 • Personal & Shared Expense Management Platform
        </div>
        <button 
          className="btn btn-secondary btn-sm"
          onClick={handleResetData}
          title="Reset to Sample Expenditures Data"
        >
          <RotateCcw size={14} /> Reset Sample Data
        </button>
      </footer>

      {/* Form Modal */}
      <ExpenseFormModal 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveExpense}
        expenseToEdit={expenseToEdit}
        categories={categories}
        currency={currency}
      />
    </div>
  );
}
