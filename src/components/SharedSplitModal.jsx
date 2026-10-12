import React, { useState } from 'react';
import { Users, Plus, CheckCircle, DollarSign, UserCheck } from 'lucide-react';

export default function SharedSplitModal({ splits, setSplits, currency }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [paidBy, setPaidBy] = useState('Alex (You)');
  const [membersStr, setMembersStr] = useState('Alex (You), Rahul, David, Sarah');

  const handleCreateSplit = (e) => {
    e.preventDefault();
    if (!title || !totalAmount || Number(totalAmount) <= 0) return;

    const memberList = membersStr.split(',').map(m => m.trim()).filter(Boolean);
    const perPersonShare = parseFloat(totalAmount) / (memberList.length || 1);

    const newSplit = {
      id: `split-${Date.now()}`,
      title,
      totalAmount: parseFloat(totalAmount),
      paidBy,
      date: new Date().toISOString(),
      members: memberList.map(name => ({
        name,
        share: perPersonShare,
        paid: name === paidBy ? parseFloat(totalAmount) : 0,
        status: name === paidBy ? 'Payer' : `Owes ${currency}${perPersonShare.toFixed(2)}`,
      }))
    };

    setSplits([newSplit, ...splits]);
    setTitle('');
    setTotalAmount('');
    setShowAddForm(false);
  };

  const handleSettle = (splitId, memberName) => {
    setSplits(splits.map(s => {
      if (s.id !== splitId) return s;
      return {
        ...s,
        members: s.members.map(m => {
          if (m.name !== memberName) return m;
          return { ...m, status: 'Settled & Paid ✓' };
        })
      };
    }));
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">
          <Users size={18} style={{ color: '#9b59b6' }} /> Shared Expenses & Group Bill Splitter
        </span>
        <button className="btn btn-primary btn-sm" onClick={() => setShowAddForm(!showAddForm)}>
          <Plus size={16} /> {showAddForm ? 'Cancel' : 'New Group Bill'}
        </button>
      </div>

      {/* New Group Bill Form */}
      {showAddForm && (
        <form onSubmit={handleCreateSplit} style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>Log Shared Group Bill</h4>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Bill Event Title</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="e.g. Friday Dinner, Roommate Grocery, Weekend Trip"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Total Amount ({currency})</label>
              <input 
                type="number" 
                step="0.01"
                className="form-control"
                placeholder="0.00"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Who Paid The Bill?</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="e.g. Alex (You)"
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Group Members (Comma Separated)</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="Alex (You), Rahul, David, Sarah"
                value={membersStr}
                onChange={(e) => setMembersStr(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-sm">
            Calculate Split & Record
          </button>
        </form>
      )}

      {/* Group Splits List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {splits.map(split => (
          <div key={split.id} style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{split.title}</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Paid by <strong>{split.paidBy}</strong> on {new Date(split.date).toLocaleDateString()}
                </span>
              </div>
              <span className="amount-text" style={{ color: '#10b981', fontSize: '1.2rem' }}>
                {currency}{split.totalAmount.toFixed(2)}
              </span>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', uppercase: true, fontWeight: 600 }}>
                Individual Member Splits ({currency}{(split.totalAmount / split.members.length).toFixed(2)} each)
              </span>

              <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {split.members.map((m, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                    <span>{m.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className={`badge ${m.status.includes('Paid') || m.status === 'Payer' ? 'badge-success' : 'badge-warning'}`}>
                        {m.status}
                      </span>
                      {!m.status.includes('Paid') && m.status !== 'Payer' && (
                        <button 
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '0.15rem 0.4rem', fontSize: '0.7rem' }}
                          onClick={() => handleSettle(split.id, m.name)}
                        >
                          Settle
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
