import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Trash2, 
  Edit2, 
  FileText, 
  ArrowUpDown, 
  Tag, 
  CreditCard,
  Plus
} from 'lucide-react';
import { PAYMENT_METHODS } from '../data/initialData';

export default function TransactionList({ 
  expenses, 
  categories, 
  currency, 
  onEditExpense, 
  onDeleteExpense,
  onOpenAddModal 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedPayment, setSelectedPayment] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' (newest first) or 'asc'

  // Map category helper
  const getCatObj = (catId) => categories.find(c => c.id === catId) || { name: 'Other', color: '#868e96', bg: 'rgba(134,142,150,0.15)' };

  // Map payment method helper
  const getPayName = (payId) => {
    const p = PAYMENT_METHODS.find(m => m.id === payId);
    return p ? p.name : payId;
  };

  // Filter & Search Logic
  const filteredExpenses = expenses.filter(exp => {
    const matchesSearch = 
      exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (exp.merchant && exp.merchant.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (exp.notes && exp.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCat = selectedCategory === 'ALL' || exp.categoryId === selectedCategory;
    const matchesPay = selectedPayment === 'ALL' || exp.paymentMethod === selectedPayment;

    return matchesSearch && matchesCat && matchesPay;
  }).sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">
          <FileText size={18} style={{ color: 'var(--accent-primary)' }} /> Daily Expenditure Transactions Log
        </span>
        <button className="btn btn-primary btn-sm" onClick={onOpenAddModal}>
          <Plus size={16} /> Log Expense
        </button>
      </div>

      {/* Filter Row */}
      <div className="filter-row">
        {/* Search Bar */}
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text"
            className="search-input"
            style={{ paddingLeft: '2.4rem' }}
            placeholder="Search merchant, coffee, lunch, bills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <select 
          className="select-input" 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="ALL">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        {/* Payment Filter */}
        <select 
          className="select-input" 
          value={selectedPayment} 
          onChange={(e) => setSelectedPayment(e.target.value)}
        >
          <option value="ALL">All Payment Methods</option>
          {PAYMENT_METHODS.map(m => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>

        {/* Sort Button */}
        <button 
          className="btn btn-secondary btn-sm"
          onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
          title="Toggle Sort Order"
        >
          <ArrowUpDown size={14} /> {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
        </button>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Description / Merchant</th>
              <th>Category</th>
              <th>Payment Mode</th>
              <th>Amount</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map(exp => {
                const cat = getCatObj(exp.categoryId);
                const dateObj = new Date(exp.date);
                const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                return (
                  <tr key={exp.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{formattedDate}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{formattedTime}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{exp.description}</div>
                      {exp.merchant && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📍 {exp.merchant}</div>
                      )}
                      {exp.notes && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                          "{exp.notes}"
                        </div>
                      )}
                    </td>
                    <td>
                      <span 
                        className="category-tag"
                        style={{ backgroundColor: cat.bg, color: cat.color }}
                      >
                        <Tag size={12} /> {cat.name}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <CreditCard size={13} /> {getPayName(exp.paymentMethod)}
                      </span>
                    </td>
                    <td>
                      <span className="amount-text" style={{ color: '#f8fafc' }}>
                        {currency}{Number(exp.amount).toFixed(2)}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                        <button 
                          className="btn btn-secondary btn-icon btn-sm"
                          onClick={() => onEditExpense(exp)}
                          title="Edit Transaction"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          className="btn btn-secondary btn-icon btn-sm"
                          style={{ color: '#ef4444' }}
                          onClick={() => onDeleteExpense(exp.id)}
                          title="Delete Transaction"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="empty-state">
                  No expenditure records match your search or filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
