import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { PAYMENT_METHODS } from '../data/initialData';

export default function ExpenseFormModal({ 
  isOpen, 
  onClose, 
  onSave, 
  expenseToEdit, 
  categories, 
  currency 
}) {
  const [description, setDescription] = useState('');
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'cat-1');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  const [notes, setNotes] = useState('');
  const [receiptAttached, setReceiptAttached] = useState(false);

  useEffect(() => {
    if (expenseToEdit) {
      setDescription(expenseToEdit.description || '');
      setMerchant(expenseToEdit.merchant || '');
      setAmount(expenseToEdit.amount || '');
      setCategoryId(expenseToEdit.categoryId || categories[0]?.id);
      setPaymentMethod(expenseToEdit.paymentMethod || 'upi');
      setDate(expenseToEdit.date ? new Date(expenseToEdit.date).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16));
      setNotes(expenseToEdit.notes || '');
      setReceiptAttached(expenseToEdit.receiptAttached || false);
    } else {
      setDescription('');
      setMerchant('');
      setAmount('');
      setCategoryId(categories[0]?.id || 'cat-1');
      setPaymentMethod('upi');
      setDate(new Date().toISOString().slice(0, 16));
      setNotes('');
      setReceiptAttached(false);
    }
  }, [expenseToEdit, isOpen, categories]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || Number(amount) <= 0) {
      alert('Please provide a valid description and positive expense amount.');
      return;
    }

    const payload = {
      id: expenseToEdit ? expenseToEdit.id : `exp-${Date.now()}`,
      description,
      merchant,
      amount: parseFloat(amount),
      categoryId,
      paymentMethod,
      date: new Date(date).toISOString(),
      notes,
      receiptAttached,
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {expenseToEdit ? 'Edit Daily Expense' : 'Log New Daily Expense'}
          </h3>
          <button className="btn btn-secondary btn-icon btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Amount Field */}
          <div className="form-group">
            <label className="form-label">Expense Amount ({currency})</label>
            <input 
              type="number" 
              step="0.01"
              min="0.01"
              className="form-control"
              style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-primary)' }}
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              autoFocus
            />
          </div>

          {/* Description & Merchant */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Expense Title / Item</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="e.g. Morning Coffee, Lunch, Bus Pass"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Merchant / Vendor</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="e.g. Starbucks, Supermarket, Transit"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
              />
            </div>
          </div>

          {/* Category & Payment Method */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select 
                className="form-control"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Payment Method</label>
              <select 
                className="form-control"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                {PAYMENT_METHODS.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Time */}
          <div className="form-group">
            <label className="form-label">Date & Time</label>
            <input 
              type="datetime-local" 
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Notes */}
          <div className="form-group">
            <label className="form-label">Notes (Optional)</label>
            <input 
              type="text" 
              className="form-control"
              placeholder="e.g. Shared with roomie, bought on discount"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Receipt check */}
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input 
              type="checkbox" 
              id="receiptCheck"
              checked={receiptAttached}
              onChange={(e) => setReceiptAttached(e.target.checked)}
            />
            <label htmlFor="receiptCheck" style={{ fontSize: '0.875rem', cursor: 'pointer' }}>
              Attach Receipt Photo Record
            </label>
          </div>

          {/* Submit Action */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Check size={18} /> {expenseToEdit ? 'Save Changes' : 'Record Expenditure'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
