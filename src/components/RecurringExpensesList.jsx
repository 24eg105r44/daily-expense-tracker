import React from 'react';
import { Repeat, Calendar, CheckCircle2, PlayCircle } from 'lucide-react';

export default function RecurringExpensesList({ 
  recurring, 
  categories, 
  currency, 
  onPostRecurring 
}) {
  const getCatName = (catId) => categories.find(c => c.id === catId)?.name || 'Utility';

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">
          <Repeat size={18} style={{ color: '#ffd93d' }} /> Recurring Bills & Subscription Tracker
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Automate repetitive monthly payments
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {recurring.map(rec => (
          <div 
            key={rec.id}
            style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{rec.title}</h4>
                <span className="amount-text" style={{ color: '#ffd93d' }}>
                  {currency}{rec.amount.toFixed(2)}
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Category: <strong>{getCatName(rec.categoryId)}</strong> • Frequency: {rec.frequency}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={13} /> Due on day {rec.dueDate} of every month
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', pt: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className={`badge ${rec.autoPost ? 'badge-success' : 'badge-warning'}`}>
                {rec.autoPost ? 'Auto-Recorded' : 'Manual Approval'}
              </span>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => onPostRecurring(rec)}
              >
                <PlayCircle size={14} /> Log For Today
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
